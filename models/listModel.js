const db = require("../db");

class listModel {
  async getAllLists() {
    const lists = await db.query("SELECT * FROM lists");

    return lists.rows;
  }

  async getList(list_id) {
    const list = await db.query("SELECT * FROM lists where list_id = $1", [
      list_id,
    ]);
    if (list.rows[0]) {
      const task = await db.query("SELECT * FROM tasks where list_id = $1", [
        list_id,
      ]);
      if (task.rows[0]) {
        return task.rows;
      } else {
        return "List is empty";
      }
    } else {
      return "List not found";
    }
  }

  async createList(name) {
    const newList = await db.query(
      "INSERT INTO lists (name) values ($1) RETURNING *;",
      [name]
    );

    return newList.rows[0];
  }

  async updateList(list_id, name) {
    const list = await db.query(
      "UPDATE lists set name = $1 where list_id = $2 RETURNING *",
      [name, list_id]
    );
    if (list.rows[0]) {
      return list.rows[0];
    } else {
      return "List not found";
    }
  }

  async putList(list_id, name) {
    const list = await db.query("select * from lists where list_id = $1", [
      list_id,
    ]);
    if (list.rows[0]) {
      await db.query("DELETE FROM tasks where list_id = $1", [list_id]);
      await db.query("DELETE FROM lists where list_id = $1;", [list_id]);
      const list = await db.query(
        "INSERT INTO lists (name) values ($1) RETURNING *;",
        [name]
      );

      return list.rows[0];
    } else {
      return "List not found";
    }
  }

  async deleteList(list_id) {
    const list = await db.query("select * from lists where list_id = $1", [
      list_id,
    ]);
    if (list.rows[0]) {
      await db.query("DELETE FROM tasks where list_id = $1", [list_id]);
      await db.query("DELETE FROM lists where list_id = $1", [list_id]);
      return `List ${list_id} has been deleted!`;
    } else {
      return "list not found";
    }
  }
}

module.exports = new listModel();
