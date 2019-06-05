const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const postsRoutes = require("./routes/posts");
const Post = require("./models/post");

const app = express();

// Mongo UN: Will_Brogrammer
// Mongo PW: Password1
// Mongo Connection String: mongodb+srv://Will_Brogrammer:<password>@mean-cluster-swfhi.mongodb.net/test?retryWrites=true&w=majority

mongoose.connect("mongodb+srv://Will_Brogrammer:Password1@mean-cluster-swfhi.mongodb.net/node-angular?retryWrites=true&w=majority", { useNewUrlParser: true })
.then(() => {
  console.log("Connected to database!");
})
.catch(() => {
  console.log("Connection failed!");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
res.setHeader("Access-Control-Allow-Origin", "*");
res.setHeader(
  "Access-Control-Allow-Headers",
  "Origin, X-Requested-With, Content-Type, Accept"
);
res.setHeader(
  "Access-Control-Allow-Methods",
  "GET, POST, PATCH, PUT, DELETE, OPTIONS"
);
next();
});

app.use("/api/posts", postsRoutes);

module.exports = app;
