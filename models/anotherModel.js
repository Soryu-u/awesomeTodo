const db = require("../db");

class anotherModel {
  async dashboard() {
    const today = new Date();
    const counted = await db
      .select(db.raw("count(id)::integer"))
      .from("tasks")
      .where({ done: false, due_date: today });

    const result = counted[0].count;

    const task = await db
      .select("lists.name", "lists.list_id", db.raw("count(done)::integer"))
      .from("tasks")
      .rightJoin("lists", "lists.list_id", "tasks.list_id")
      .groupBy("lists.name", "lists.list_id", "done")
      .where("done", false)
      .orWhere("done", null);

    const dashboardRes = { count: result, tasks: task };

    return dashboardRes;
  }

  async collection() {
    const today = new Date();
    const task = await db
      .select(
        "tasks.title",
        "tasks.done",
        "tasks.id",
        "tasks.due_date",
        "lists.name"
      )
      .from("tasks")
      .rightJoin("lists", "lists.list_id", "tasks.list_id")
      .groupBy(
        "lists.name",
        "tasks.title",
        "tasks.done",
        "tasks.id",
        "tasks.due_date"
      )
      .where({ "tasks.due_date": today, "tasks.done": false });
    return task;
  }
}

module.exports = new anotherModel();
