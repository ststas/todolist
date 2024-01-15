const Task = require("../models/task");

module.exports.getTasks = (req, res, next) => {
  Task.find()
    .sort({ createdAt: -1 })
    .then((tasks) => res.status(200).send(tasks))
    .catch((err) => next(err));
};

module.exports.createTask = (req, res, next) => {
  const { task, status, deadlineDate } = req.body;
  Task.create({ task, status, deadlineDate })
    .then((newTask) => {
      Task.findById(newTask._id)
        .then((updatedTask) => res.status(201).send(updatedTask))
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};

module.exports.deleteTask = (req, res, next) => {
  const { taskId } = req.params;
  return Task.findById(taskId)
    .orFail()
    .then((deletedTask) => {
      deletedTask.deleteOne().then((card) => res.status(200).send(card));
    })
    .catch((err) => next(err));
};

module.exports.updateTask = (req, res, next) => {
  const { task, status, deadlineDate } = req.body;
  const { taskId } = req.params;
  return Task.findByIdAndUpdate(
    taskId,
    { task, status, deadlineDate },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((updatedTask) => res.status(200).send(updatedTask))
    .catch((err) => next(err));
};
