const taskModel = require("../models/taskModel");

class TaskController {
  async getTask(req, res) {
    const { listId, id } = req.params;
    const task = await taskModel.getTask(id, listId);

    res.json(task);
  }

  async getListTasks(req, res) {
    // const { all } = req.query;
    const all = req.query;
    const { listId } = req.params;
    const task = await taskModel.getListTasks(listId, all);

    res.json(task);
  }

  async getTasksId(req, res) {
    const listId = req.params.listId;
    const id = req.params.id;
    const task = await taskModel.getTasksId(id, listId);

    res.json(task);
  }

  async getTasks(req, res) {
    const task = await taskModel.getTasks();

    res.json(task);
  }

  async createTask(req, res) {
    const listId = req.params.listId;
    const data = req.body;
    const newTask = await taskModel.createTask(data, listId);

    res.json(newTask);
  }

  async deleteTask(req, res) {
    const id = req.params.id;
    const listId = req.params.listId;
    const task = await taskModel.deleteTask(id, listId);

    res.json(task);
  }

  async updateTask(req, res) {
    const id = req.params.id;
    const listId = req.params.listId;
    const data = req.body;
    const task = await taskModel.updateTask(id, listId, data);

    res.json(task);
  }

  async putTask(req, res) {
    const id = req.params.id;
    const listId = req.params.listId;
    const data = req.body;
    const task = await taskModel.putTask(id, listId, data);

    res.json(task);
  }
}

module.exports = new TaskController();
