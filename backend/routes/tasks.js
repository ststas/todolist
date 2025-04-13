const router = require("express").Router();

const {
  getTasks,
  createTask,
  deleteTask,
  updateTask,
} = require("../controllers/tasks");

router.get("/todolist/api", (_, res) => {
  res.status(200).json({ message: "API is working" });
});

router.get("/tasks", getTasks);
router.post("/tasks", createTask);
router.delete("/tasks/:taskId", deleteTask);
router.patch("/tasks/:taskId", updateTask);

module.exports = router;
