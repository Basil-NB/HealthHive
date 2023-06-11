const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes.js');
const blogRoutes = require('./blogRoutes.js');

router.use('/api', apiRoutes);
router.use('/blog', blogRoutes);
router.use('/', homeRoutes);


router.use((req, res) => {
    res.status(404).end();
});


module.exports = router;