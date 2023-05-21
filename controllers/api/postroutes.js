const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');
const Filter = require('bad-words')
filter = new Filter()

//http://localhost:3001/api/posts/
router.get('/', (req, res) => {
  console.log("post route")
  Post.findAll({
    attributes: [
      'id',
      'title',
      'post_content',
      'user_id',
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'user_id','post_id'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
//http://localhost:3001/api/posts/1
router.get('/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'post_content',
      'title'
      
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
//http://localhost:3001/api/posts/
router.post('/', withAuth, (req, res) => {
  
  Post.create({
    title: filter.clean(req.body.title),
    post_content: filter.clean(req.body.post_content),
    user_id: req.session.user_id
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});



module.exports = router;