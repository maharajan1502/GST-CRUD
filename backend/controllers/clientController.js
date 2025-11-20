const Client = require("../models/Client");
exports.addClient = async (req, res) => {
  try {
    const client = new Client(req.body);
    await client.save(); res.json(client);
  }
  catch (err) { res.status(500).json({ message: err.message }); }
};
exports.getClient = async (req, res) => {
  try { const c = await Client.findById(req.params.id); res.json(c); }
  catch (err) { res.status(500).json({ message: err.message }); }
};
exports.updateClient = async (req, res) => {
  try { const c = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true }); res.json(c); }
  catch (err) { res.status(500).json({ message: err.message }); }
};
exports.deleteClient = async (req, res) => {
  try { await Client.findByIdAndDelete(req.params.id); res.json({ message: "deleted" }); }
  catch (err) { res.status(500).json({ message: err.message }); }
};
