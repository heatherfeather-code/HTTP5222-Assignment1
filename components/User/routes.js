const express = require("express");
const router = express.Router();

const userController = require("./controller");

router.get("/", userController.getUser);

router.get("/login", userController.loginForm);
router.post("/login", userController.login);


router.get("/register", userController.registerForm);
router.post("/register", userController.register);


router.get("/admin-dashboard", userController.adminDashboard);



router.get("/logout", userController.logout);


module.exports = router;