module.exports = {
  ensureAuth: (req, res, next) => {
    if (req.isAuthenticated()) return next();
    req.flash("error_msg", "Please log in to view that page");
    res.redirect("/login");
  },
};
