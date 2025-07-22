const express = require("express");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const User = require("../models/User");
const router = express.Router();

router.get("/register", (req, res) => res.render("register"));
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const existing = await User.findOne({ email });
  if (existing) {
    req.flash("error_msg", "Email already registered");
    return res.redirect("/register");
  }
  const hashed = await bcrypt.hash(password, 10);
  await new User({ name, email, password: hashed }).save();
  req.flash("success_msg", "Registered successfully");
  res.redirect("/login");
});

router.get("/login", (req, res) => res.render("login"));
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })(req, res, next);
});

router.get("/logout", (req, res) => {
  req.logout(() => {
    req.flash("success_msg", "Logged out");
    res.redirect("/login");
  });
});

module.exports = router;
