const router = require("express").Router();
const userBodyValidator = require("../middlewares/requestValidators/userBodyValidator");
const routerMovies = require("./movies");
const routerUsers = require("./users");
const { login, logout } = require("../controllers/login");
const { createUser } = require("../controllers/users");
const auth = require("../middlewares/auth");
const NotFoundError = require("../utils/errors/NotFoundError");
const ERRORS_MESSAGES = require("../utils/ERRORS_MESSAGES");
const userBodyValidatorForLogin = require("../middlewares/requestValidators/userBodyValidatorForLogin");
const checkEmailOccupied = require("../middlewares/checkEmailOccupied");

router.post("/signin", userBodyValidatorForLogin, login);
router.delete("/signout", logout);
router.post("/signup", userBodyValidator, createUser);

router.use(auth);
router.use("/movies", routerMovies);
router.use("/users", routerUsers);
router.use("*", () => {
  throw new NotFoundError(ERRORS_MESSAGES.NOT_FOUND);
});

module.exports = router;
