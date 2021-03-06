const express = require("express");
const bodyParser = require("body-parser");
const mongoPractice = require("./app/mongo/mongo");
const mongoosePractice = require("./app/mongo/mongoose");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});

app.post("/products", mongoosePractice.createProduct);
app.get("/products", mongoosePractice.getProducts);

app.listen(3002);
