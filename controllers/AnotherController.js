const anotherModel = require("../models/anotherModel");

class AnotherController {
  async dashboard(req, res) {
    const task = await anotherModel.dashboard();
    res.json(task);
  }

  async collection(req, res) {
    const task = await anotherModel.collection();

    res.json(task);
  }
}

module.exports = new AnotherController();
