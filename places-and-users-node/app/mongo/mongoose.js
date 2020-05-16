const mongoose = require("mongoose");

const Product = require("./models/product");
const url =
  "mongodb+srv://MongoMk:IW4mXZqldnD5X9Ge@clustermk-2vmua.gcp.mongodb.net/products_test?retryWrites=true&w=majority";

mongoose
  .connect(url)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(() => {
    console.log("Connection to DB failed");
  });

const createProduct = async (req, res, next) => {
  const createdProduct = new Product({
    name: req.body.name,
    price: req.body.price,
  });
  const result = await createdProduct.save();
  console.log(typeof createdProduct.id);
  res.json(result);
};

const getProducts = async (req, res, next) => {
  const products = await Product.find().exec();

  res.json(products);
};

exports.createProduct = createProduct;
exports.getProducts = getProducts;
