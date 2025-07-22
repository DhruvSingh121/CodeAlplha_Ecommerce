const mongoose = require("mongoose");
const Product = require("./backend/models/Product");
require("dotenv").config({ path: "./backend/.env" });

mongoose.connect(process.env.MONGO_URI).then(async () => {
  await Product.deleteMany();

  await Product.insertMany([
    {
      name: "Smartphone",
      description: "A powerful Android phone with OLED display.",
      price: 24999,
      image:
        "https://img.freepik.com/free-vector/realistic-display-smartphone-with-different-apps_52683-30241.jpg?semt=ais_hybrid&w=740",
    },
    {
      name: "Wireless Headphones",
      description: "Noise cancelling headphones with rich sound.",
      price: 5999,
      image:
        "https://m.media-amazon.com/images/I/61XuLr92V3L._UF1000,1000_QL80_.jpg",
    },
    {
      name: "Smart Watch",
      description: "Fitness tracking smartwatch with long battery.",
      price: 6999,
      image:
        "https://www.leafstudios.in/cdn/shop/files/1_1099cd20-7237-4bdf-a180-b7126de5ef3d_grande.png?v=1722230645",
    },
  ]);

  console.log("Sample products added!");
  process.exit();
});
