const router = require("express").Router();
const { handleRouteError } = require("../middlewares/handleRouteError");
const { validateSignUp, validateSignIn } = require("../middlewares/validation");
const auth = require("../middlewares/auth");
const { login, logout, createUser } = require("../controllers/users");

const usersRouter = require("./users");
const tasksRouter = require("./tasks");

router.post("/signup", validateSignUp(), createUser);
router.post("/signin", validateSignIn(), login);
router.delete("/signout", logout);

router.use("/users", auth, usersRouter);
router.use("/tasks", tasksRouter);

router.all("*", handleRouteError);

module.exports = router;
