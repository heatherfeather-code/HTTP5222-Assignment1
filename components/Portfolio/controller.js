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
    response.render("skills", {skills : skillList})
};

const getAllProjects = async (request, response) => {
    let projectsList = await portfolioModel.getProjects();

    if(!projectsList.length){
        await portfolioModel.initalizeProjects();
        projectsList = await portfolioModel.getProjects();
    }
    response.render("projects", {projects: projectsList})
};

module.exports = {
    getIndex,
    getAllSkills,
    getAllProjects
};