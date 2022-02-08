const db = require("../db");

class anotherModel {
  async dashboard() {
    const counted = await db.query(
      "select count(id) from tasks where done = false and due_data <= current_date"
    );

    const result = Number(counted.rows[0].count);

    const task = await db.query(
      "select lists.name, lists.list_id, cast(count(done) as int) from tasks right join lists on tasks.list_id = lists.list_id GROUP BY lists.name, lists.list_id, done HAVING done=false OR done is null;"
    );

    const dashboardRes = { count: result, tasks: task.rows };

    return dashboardRes;
  }

  async collection() {
    const task = await db.query(
      "select tasks.title, tasks.done, tasks.id, tasks.due_data, tasks.list_id, lists.name from lists right join tasks on lists.list_id = tasks.list_id group by lists.name, tasks.title, tasks.done, tasks.id, tasks.list_id, tasks.due_data having due_data = current_date"
    );
    return task.rows;
  }
}

module.exports = new anotherModel();
