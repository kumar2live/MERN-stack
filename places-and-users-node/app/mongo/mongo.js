const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://MongoMk:IW4mXZqldnD5X9Ge@clustermk-2vmua.gcp.mongodb.net/products_test?retryWrites=true&w=majority';

const createProduct = async (req, res, next) => {
  const newProduct = {
    name: req.body.name,
    price: req.body.price,
  }
  const mongoClient = new MongoClient(url);

  try {
    await mongoClient.connect();
    const db = mongoClient.db();
    const result = db.collection('products').insertOne(newProduct);
  } catch (error) {
    console.log('error -- ', error);
    return res.json({
      message: 'Could not store the data.'
    })
  }
  mongoClient.close();
  res.json(newProduct);
};

const getProducts = async (req, res, next) => {
  const mongoClient = new MongoClient(url);
  let products;

  try {
    await mongoClient.connect();
    const db = mongoClient.db();
    products = await db.collection('products').find().toArray();
  } catch (error) {
    console.log('error -- ', error);
    return res.json({ message: 'Could not fetch data.' });
  }
  mongoClient.close();
  res.json(products);
};

exports.createProduct = createProduct;
exports.getProducts = getProducts;