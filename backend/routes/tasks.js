const router = require("express").Router();

const {
  getTasks,
  createTask,
  deleteTask,
  updateTask,
} = require("../controllers/tasks");

router.get("/tasks", getTasks);
router.post("/tasks", createTask);
router.delete("/tasks/:taskId", deleteTask);
router.patch("/tasks/:taskId", updateTask);

module.exports = router;
