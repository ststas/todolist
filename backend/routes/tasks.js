const router = require("express").Router();
// const {
//   validateCardCreation,
//   validateCardRemoval,
//   validateCardLike,
//   validateCardDislike,
// } = require("../middlewares/validation");

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

// router.get("/", getCards);
// router.post("/", validateCardCreation(), createCard);
// router.delete("/:cardId", validateCardRemoval(), deleteCard);
// router.put("/:cardId/likes", validateCardLike(), likeCard);
// router.delete("/:cardId/likes", validateCardDislike(), dislikeCard);

module.exports = router;
