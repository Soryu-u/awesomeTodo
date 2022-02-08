const router = require("express").Router({ mergeParams: true });
const controller = require("../controllers/AnotherController");

router.get("/dashboard", controller.dashboard);
router.get("/collection/today", controller.collection);

module.exports = router;
