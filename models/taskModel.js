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
    }
  }

  async getTasksId(taskId, listId) {
    const task = await db("tasks")
      .where({ list_id: listId, id: taskId })
      .select("*");
    if (task[0]) {
      return task;
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
      }
    } else {
      const falseTask = await db("tasks")
        .where({ list_id: listId, done: false })
        .select("*");
      if (falseTask[0]) {
        return falseTask;
      }
    }
  }

  async createTask(data, listId) {
    const task = db("tasks")
      .insert({
        title: data.title,
        done: false,
        due_date: data.due_date,
        description: data.description,
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
    }
  }

  async updateTask(taskId, listId, data) {
    const oldTask = await db("tasks").where({ id: taskId }).select("*");

    if (oldTask[0]) {
      const newTask = db("tasks")
        .update({
          title: data.title,
          done: data.done,
          due_date: data.due_date !== undefined ? data.due_date : new Date(),
          description: data.description,
          list_id: listId,
        })
        .where("id", taskId)
        .returning("*");

      return newTask;
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
          due_date: data.due_date !== undefined ? data.due_date : new Date(),
          list_id: listId,
        })
        .returning("*");
      return newTask;
    }
  }
}

module.exports = new taskModel();
