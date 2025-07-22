const express = require("express");
const Product = require("../models/Product");
const router = express.Router();

router.get("/cart", (req, res) => {
  res.render("cart", { cart: req.session.cart || [] });
});

router.post("/add-to-cart/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  const cart = req.session.cart || [];
  cart.push({ ...product._doc, quantity: 1 });
  req.session.cart = cart;
  req.flash("success_msg", "Item added to cart");
  res.redirect("/cart");
});

module.exports = router;
