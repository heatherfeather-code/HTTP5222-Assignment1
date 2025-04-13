const portfolioModel = require("./model");

const getIndex = async (request, response) => {
    response.render("index");
};


const getAllSkills = async (request,response) => {
    let skillList = await portfolioModel.getSkills();
    

    if(!skillList.length){
        await portfolioModel.initalizeSkills();
        skillList = await portfolioModel.getSkills();
    }
    
    // return skillList;
    response.send(skillList);
};




// dont touch this function 
const getSkillsView = async (request,response) =>{
    let skillList = await portfolioModel.getSkills();
    

    if(!skillList.length){
        await portfolioModel.initalizeSkills();
        skillList = await portfolioModel.getSkills();
    }
    response.render("skills", {skills : skillList})
};

//Add Skill
const addSkill = async (request, response) =>{
    try{

        await portfolioModel.addSkill(
            request.body.skillExpertise,
            request.body.skillLanguages,
            request.body.skillDescription
        );
        response.redirect("/");
    }catch (err){
        console.error("Error adding skill: ", err);
        response.status(500).send("Internal Server Error");
    }
};
//Delete Skill
const deleteSkillByName = async (request, response) =>{
    console.log("deleting a skill: " + request.body.skillExpertise);
    await portfolioModel.deleteSkillByName(request.body.skillExpertise);
    response.redirect("/skills");
};

//============== Projects ==================
const getAllProjects = async (request, response) => {
    let projectsList = await portfolioModel.getProjects();

    if(!projectsList.length){
        await portfolioModel.initalizeProjects();
        projectsList = await portfolioModel.getProjects();
    }
    response.send(projectsList);
};

const getProjectsView = async (request, response) => {
    let projectsList = await portfolioModel.getProjects();

    if(!projectsList.length){
        await portfolioModel.initalizeProjects();
        projectsList = await portfolioModel.getProjects();
    }
    response.render("projects", {projects: projectsList})
};

// Add Project
const addProject = async (request, response) => {
    try{
        // console.log("Trying to add project: " + request.body);

        await portfolioModel.addProject
        (
            request.body.projectName,
            request.body.projectLanguages,
            request.body.projectDescription
        );
        response.redirect("/");
    } catch(err){
        console.error("Error adding project: ", err);
        response.status(500).send("Internal Server Error");
    }
   
    
};
//Delete Project
const deleteProjectByName = async (request,response)=>{
    console.log("deleting a project: " + request.body.projectName);
    await portfolioModel.deleteProjectByName(request.body.projectName);
    response.redirect("/projects");
}

module.exports = {
    getIndex,
    getAllSkills,
    getSkillsView,
    addSkill,
    deleteSkillByName,
    getAllProjects,
    getProjectsView,
    addProject,
    deleteProjectByName
};