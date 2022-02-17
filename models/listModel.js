const db = require("../db");

class listModel {
  async getAllLists() {
    const lists = await db.select("*").from("lists");

    return lists;
  }

  async getList(list_id) {
    const list = await db("lists").where("list_id", list_id).select("*");
    if (list[0]) {
      const task = await db("tasks").where("list_id", list_id).select("*");
      if (task[0]) {
        return task;
      }
    }
  }

  async createList(titleName) {
    const newList = await db("lists")
      .insert({ name: titleName })
      .returning("*");

    return newList;
  }

  async updateList(listId, titleName) {
    const list = await db("lists")
      .update({
        name: titleName,
      })
      .where("list_id", listId)
      .returning("*");
    if (list[0]) {
      return list;
    }
  }

  async putList(list_id, titleName) {
    const list = await db("lists").where("list_id", list_id).select("*");
    if (list[0]) {
      await db("tasks").where("list_id", list_id).del();
      await db("lists").where("list_id", list_id).del();
      const list = await db("lists").insert({ name: titleName }).returning("*");

      return list[0];
    }
  }

  async deleteList(list_id) {
    const list = await db("lists").where("list_id", list_id).select("*");
    if (list[0]) {
      await db("tasks").where("list_id", list_id).del();
      await db("lists").where("list_id", list_id).del();
    }
  }
}

module.exports = new listModel();
