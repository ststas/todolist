const router = require("express").Router();
const { handleRouteError } = require("../middlewares/handleRouteError");

const tasksRouter = require("./tasks");

router.use("/", tasksRouter);

router.all("*", handleRouteError);

module.exports = router;

// const { validateSignUp, validateSignIn } = require("../middlewares/validation");
// const auth = require("../middlewares/auth");
// const { login, logout, createUser } = require("../controllers/users");

// const usersRouter = require("./users");

// router.post("/signup", validateSignUp(), createUser);
// router.post("/signin", validateSignIn(), login);
// router.delete("/signout", logout);

// router.use("/users", auth, usersRouter);

// router.get("/", (_, res) => {
//   res.status(200).json({ message: "API is working" });
// });
