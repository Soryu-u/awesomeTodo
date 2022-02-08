const router = require("express").Router({ mergeParams: true });
const controller = require("../controllers/ListController");

router.get("", controller.getAll);

router.get("/:listId", controller.getList);

router.post("", controller.createList);

router.delete("/:listId", controller.deleteList);

router.patch("/:listId", controller.updateList);

router.put("/:listId", controller.putList);

module.exports = router;
