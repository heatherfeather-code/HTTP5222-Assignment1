const portfolioModel = require("./model");

const getAllSkills = async (request,response) => {
    let skillList = await portfolioModel.getSkills();
    

    if(!skillList.length){
        await portfolioModel.initalizeSkills();
        skillList = await portfolioModel.getSkills();
    }
    response.render("index", {skills : skillList})
};

const getAllProjects = async (request, response) => {
    let projectsList = await portfolioModel.getProjects();

    if(!projectsList.length){
        await portfolioModel.initalizeProjects();
        projectsList = await portfolioModel.getProjects();
    }
    response.render("index", {projects: projectsList})
};

module.exports = {
    getAllSkills,
    getAllProjects
};