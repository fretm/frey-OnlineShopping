
exports.protect = (req, res, next) => {
    if (!req.session.isAuthenticated) {
    return res.redirect('/userlogin');
    }
    next();
    };
    