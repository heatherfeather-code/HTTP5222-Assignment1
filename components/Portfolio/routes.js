const express = require("express");
const router = express.Router();

const {getAllProjects} = require("./controller");
const {getAllSkills} = require("./controller");

router.get("/",getAllProjects);
// router.get("/", getAllSkills);

module.exports = router;