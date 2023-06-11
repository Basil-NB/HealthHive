const router = require('express').Router();
const { User, Post, Comment } = require('../models');


router.get('/', (req, res) => {
    if (!req.session.loggedIn) {
        return res.redirect('/welcome')
    }
    Post.findAll({
        attributes: ['id', 'title', 'post_content', 'user_id'],
        include: [{
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
            const posts = dbPostData.map(post => post.get({
                plain: true
            }));

            res.render('blog', {
                posts,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/post/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'title', 'post_content', 'user_id'],
        include: [{
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
                res.status(404).json({
                    message: 'No post found with this id'
                });
                return;
            }

            const post = dbPostData.get({
                plain: true
            });

            res.render('single-post', {
                post,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

router.get('/welcome', (req, res) => {
    res.render('welcome')
})

router.get('*', (req, res) => {
    res.status(404).send("Can't go there!");
})


module.exports = router;