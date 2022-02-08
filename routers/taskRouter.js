const router = require("express").Router({ mergeParams: true });
const controller = require("../controllers/TaskController");

router.get("/tasks/:id", controller.getTask);

router.get("/lists/:listId/tasks/:id", controller.getTasksId);

router.get("/tasks", controller.getTasks);

router.get("/lists/:listId/tasks", controller.getListTasks);

router.post("/lists/:listId/tasks", controller.createTask);

router.delete("/lists/:listId/tasks/:id", controller.deleteTask);

router.patch("/lists/:listId/tasks/:id", controller.updateTask);

router.put("/lists/:listId/tasks/:id", controller.putTask);

module.exports = router;
