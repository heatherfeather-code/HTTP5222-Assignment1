const express = require("express");
const router = express.Router();
const projectController = require("./controller");

const {getAllProjects} = require("./controller");
const {getAllSkills} = require("./controller");
const {getIndex} = require("./controller");

router.get("/projects", getAllProjects);
router.get("/skills", getAllSkills);
router.get("/", getIndex);

router.post("/addProject", projectController.addProject);
router.post("/deleteProject", projectController.deleteProjectByName);

router.post("/addSkill", projectController.addSkill);
router.post("/deleteSkill", projectController.deleteSkillByName);

module.exports = router;