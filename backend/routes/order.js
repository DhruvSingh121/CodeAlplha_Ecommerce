const express = require("express");
const Order = require("../models/Order");
const { ensureAuth } = require("../middleware/ensureAuth");
const router = express.Router();

router.post("/order", ensureAuth, async (req, res) => {
  const cart = req.session.cart || [];
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  await new Order({ userId: req.user._id, items: cart, total }).save();
  req.session.cart = [];
  req.flash("success_msg", "Order placed successfully!");
  res.redirect("/");
});

module.exports = router;
