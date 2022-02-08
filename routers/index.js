const express = require("express");
const listRouter = require("./listRouter");
const taskRouter = require("./taskRouter");
const anotherRouter = require("./anotherRouter");
const router = express.Router();

router.use("/lists", listRouter);
router.use("/", taskRouter);
router.use("/", anotherRouter);

module.exports = router;
