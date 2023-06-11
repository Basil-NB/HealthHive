const withAuth = (req, res, next) => {
    if (!req.session.user_id) {
        res.redirect('/welcome');
    } else {
        next();
    }
};

module.exports = withAuth;