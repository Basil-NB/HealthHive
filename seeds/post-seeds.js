const { Post } = require('../models');

const postdata = [
  {
    title: 'IU collaborates with Podiatry Associates of Indiana to bring diabetic foot clinical trials to patients',
    post_content: 'https://medicine.iu.edu/blogs/regenerative-medicine/iu-collaborates-with-community-based-podiatry-associates-of-indiana-to-bring-diabetic-foot-clinical-trials-to-patients',
    user_id: 1
  },

  {
    title: 'Intravenous Contrast in Computed Tomography Imaging for Acute Abdominal Pain',
    post_content: 'https://jamanetwork.com/journals/jamasurgery/fullarticle/2804491',
    user_id: 1
  },

];

const seedPosts = () => Post.bulkCreate(postdata);

module.exports = seedPosts;
