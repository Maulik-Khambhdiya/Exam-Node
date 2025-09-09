const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Enter Product Name"],
  },

  price: {
    type: String,
    required: [true, "Enter Price"],
  },

  images: {
    type: Array,
  },
});

module.exports = mongoose.model("products", productSchema);
