const Task = require("../models/Task");

exports.createTask = async (req, res) => {
  const task = await Task.create({ ...req.body, userId: req.user.id });
  res.status(201).json(task);
};

exports.getTasks = async (req, res) => {
  const filter = { userId: req.user.id };
  if (req.query.status) filter.status = req.query.status;
  const tasks = await Task.find(filter);
  res.json(tasks);
};

exports.updateTask = async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(task);
};

exports.deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};
