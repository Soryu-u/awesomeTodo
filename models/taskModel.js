const db = require("../db");

class taskModel {
  async getTasks() {
    const tasks = await db.select("*").from("tasks");
    return tasks;
  }

  async getTask(id) {
    const task = await db("tasks").where("id", id).select("*");
    if (task[0]) {
      return task;
    } else {
      return "Task not found";
    }
  }

  async getTasksId(taskId, listId) {
    const task = await db("tasks")
      .where({ list_id: listId, id: taskId })
      .select("*");
    if (task[0]) {
      return task;
    } else {
      return "Task not found";
    }
  }

  async getListTasks(listId, all) {
    const status = all.all;
    if (status == "true") {
      const allListTasks = await db("tasks")
        .where("list_id", listId)
        .select("*");
      if (allListTasks[0]) {
        return allListTasks;
      } else {
        return "Tasks not found.";
      }
    } else {
      const falseTask = await db("tasks")
        .where({ list_id: listId, done: false })
        .select("*");
      if (falseTask[0]) {
        return falseTask;
      } else {
        return "Tasks not found.";
      }
    }
  }

  async createTask(data, listId) {
    const task = db("tasks")
      .insert({
        title: data.title ? data.title : "Без названия",
        done: data.done !== undefined ? data.done : false,
        due_data: data.due_data !== undefined ? data.due_data : new Date(),
        list_id: listId,
      })
      .returning("*");

    return task;
  }

  async deleteTask(taskId, listId) {
    const task = await db("tasks")
      .where({ list_id: listId, id: taskId })
      .select("*");
    if (task[0]) {
      await db("tasks").where({ list_id: listId, id: taskId }).del();
      return `Task ${id} has been deleted!`;
    } else {
      return "Task not found";
    }
  }

  async updateTask(taskId, listId, data) {
    const oldTask = await db("tasks")
      .where({ list_id: listId, id: taskId })
      .select("*");

    if (oldTask[0]) {
      const newTask = db("tasks")
        .update({
          title: data.title ? data.title : "Без названия",
          done: data.done !== undefined ? data.done : false,
          due_data: data.due_data !== undefined ? data.due_data : new Date(),
          list_id: listId,
        })
        .where("id", taskId)
        .returning("*");

      return newTask;
    } else {
      return "Task not found";
    }
  }

  async putTask(taskId, listId, data) {
    const oldTask = await db("tasks")
      .where({ list_id: listId, id: taskId })
      .select("*");
    if (oldTask[0]) {
      await db("tasks").where({ list_id: listId, id: taskId }).del();
      const newTask = db("tasks")
        .insert({
          title: data.title ? data.title : "Без названия",
          done: data.done !== undefined ? data.done : false,
          due_data: data.due_data !== undefined ? data.due_data : new Date(),
          list_id: listId,
        })
        .returning("*");
      return newTask;
    } else {
      return "Task not found";
    }
  }
}

module.exports = new taskModel();
