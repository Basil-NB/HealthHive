const withAuth = (req, res, next) => {
    if (!req.session.user_id) {
        // //removing auth for testing
        // res.redirect('/login');
        next();
    } else {
        next();
    }
};

module.exports = withAuth;