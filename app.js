const express = require("express");
const app = express();
const router = require("./routers");

function logRequest(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
}

app.use(express.json());
app.use(logRequest);
app.use(router);

module.exports = app;
