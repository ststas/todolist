const router = require("express").Router();

const {
  getTasks,
  createTask,
  deleteTask,
  updateTask,
} = require("../controllers/tasks");

router.get("/", getTasks);
router.post("/", createTask);
router.delete("/:taskId", deleteTask);
router.patch("/:taskId", updateTask);

module.exports = router;
