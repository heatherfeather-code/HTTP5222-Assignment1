const express = require("express");
const router = express.Router();

const {getAllProjects} = require("./controller");
const {getAllSkills} = require("./controller");
const {getIndex} = require("./controller");

router.get("/projects",getAllProjects);
router.get("/skills", getAllSkills);
router.get("/", getIndex);
module.exports = router;