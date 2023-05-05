const { Comment } = require('../models');

const commentdata = [
  {
    comment_text: 'you have to check this out',
    user_id: 1,
    post_id: 1
  },
 
];

const seedComments = () => Comment.bulkCreate(commentdata);

module.exports = seedComments;
