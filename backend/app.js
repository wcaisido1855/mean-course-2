const express = require('express');
const bodyParser = require("body-parser");

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
    );
  next();
});

app.post("/api/posts", (req, res, next) => {
  console.log();
});

app.use("/api/posts", (req, res, next) => {
  const posts = [
    {
      id: "kfhbskldfnhlk",
      title: "First Server-side post",
      content: "This is coming from the server!"
  },
  {
    id: "gfdhkreh",
    title: "Second Server-side post",
    content: "This is coming from the server!!"
}
  ];
  res.status(200).json({
    message: 'Posts fetched Successfully!',
    posts: posts
  });
});

module.exports = app;

