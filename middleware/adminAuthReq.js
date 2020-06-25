module.exports = function(req,res,next) {
    if(!req.session.currentUser && req.session.currentUser.admin)
    {
        return res.redirect("/admin/login");
    }

    next();
}