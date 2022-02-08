const db = require("../db");

class taskModel {
  async getTask(id) {
    const task = await db.query("select * from tasks where id = $1 ", [id]);
    if (task.rows[0]) {
      return task.rows[0];
    } else {
      return "Task not found";
    }
  }

  async getTasksId(id, listId) {
    const task = await db.query(
      "select * from tasks where id = $1 and list_id = $2",
      [id, listId]
    );
    if (task.rows[0]) {
      return task.rows[0];
    } else {
      return "Task not found";
    }
  }

  async getListTasks(listId, all) {
    if (all) {
      const allListTasks = await db.query(
        "select * from tasks where list_id = $1",
        [listId]
      );
      if (allListTasks.rows[0]) {
        return allListTasks.rows;
      } else {
        return "Tasks not found.";
      }
    } else {
      const falseTask = await db.query(
        "select * from tasks where list_id = $1 and done = false",
        [listId]
      );
      if (falseTask.rows[0]) {
        return falseTask.rows;
      } else {
        return "Tasks not found.";
      }
    }
  }

  async getTasks() {
    const task = await db.query("select * from tasks ");
    return task.rows;
  }

  async createTask(data, lisId) {
    const task = await db.query(
      "INSERT INTO tasks (title, done, due_data, list_id) values ($1 , $2, $3, $4) RETURNING *;",
      [
        data.title ? data.title : "Без названия",
        data.done ? data.done : false,
        data.due_data ? data.due_data : new Date(),
        lisId,
      ]
    );

    return task.rows[0];
  }

  async deleteTask(id, listId) {
    const task = await db.query(
      "select * from tasks where id = $1 and list_id = $2",
      [id, listId]
    );
    if (task.rows[0]) {
      const task = await db.query(
        "DELETE FROM tasks where id = $1 and list_id = $2",
        [id, listId]
      );
      return `Task ${id} has been deleted!`;
    } else {
      return "Task not found";
    }
  }

  async updateTask(id, listId, data) {
    const oldTask = await db.query(
      "SELECT * FROM tasks where id = $1 and list_id = $2",
      [id, listId]
    );
    const task = oldTask.rows[0];
    if (task) {
      const newTask = await db.query(
        "UPDATE tasks set title = $2, done = $3, due_data = $4 where id = $1 and list_id = $5 RETURNING *",
        [
          id,
          data.title ? data.title : task.title,
          data.done !== undefined ? data.done : task.done,
          data.due_data !== undefined ? data.due_data : task.due_data,
          listId,
        ]
      );
      return newTask.rows[0];
    } else {
      return "Task not found";
    }
  }

  async putTask(id, listId, data) {
    const oldTask = await db.query(
      "SELECT * FROM tasks where id = $1 and list_id = $2",
      [id, listId]
    );
    const task = oldTask.rows[0];
    if (task) {
      await db.query("DELETE FROM tasks where id = $1 and list_id = $2;", [
        id,
        listId,
      ]);
      const newTask = await db.query(
        "INSERT INTO tasks (title, done, due_data, list_id) values ($1, $2, $3, $4) RETURNING *;",
        [
          data.title ? data.title : "Без названия",
          data.done !== undefined ? data.done : false,
          data.due_data !== undefined ? data.due_data : new Date(),
          listId,
        ]
      );
      return newTask.rows[0];
    } else {
      return "Task not found";
    }
  }
}

module.exports = new taskModel();
