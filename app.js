const express = require("express");
var cors = require('cors');
const app = express();
const router = require("./routers");

function logRequest(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
}

app.use(cors())
app.use(express.json());
app.use(logRequest);
app.use(router);

module.exports = app;
