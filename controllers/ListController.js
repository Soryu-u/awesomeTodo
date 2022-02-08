const listModel = require("../models/listModel");

class ListController {
  async getAll(req, res) {
    const lists = await listModel.getAllLists();

    res.json(lists);
  }

  async getList(req, res) {
    const list_id = req.params.listId;
    const list = await listModel.getList(list_id);

    res.json(list);
  }

  async createList(req, res) {
    const { name } = req.body;
    const newList = await listModel.createList(name);

    res.json(newList);
  }

  async deleteList(req, res) {
    const list_id = req.params.listId;
    const list = await listModel.deleteList(list_id);

    res.json(list);
  }

  async updateList(req, res) {
    const list_id = req.params.listId;
    const { name } = req.body;
    const list = await listModel.updateList(list_id, name);

    res.json(list);
  }

  async putList(req, res) {
    const list_id = req.params.listId;
    const { name } = req.body;
    const list = await listModel.putList(list_id, name);

    res.json(list);
  }
}

module.exports = new ListController();
