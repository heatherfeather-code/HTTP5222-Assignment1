const mongoose = require("mongoose");

const db = require("../../db"); //shared db items

const ProjectSchema = new mongoose.Schema({
    name: String, 
    languages: String, 
    description: String
}); // { collection: "projects" }

const Project  = mongoose.model("projects", ProjectSchema);


//get all skills from skill collection
async function getProjects(){
    await db.connect();
    return await Project.find({}); //return an array for find all
}


//initalize projects collection with some inital data
async function initalizeProjects(){
    const projectsList =[
        {
            name: "CG Rec's",
            languages: "Javascript, HTML, CSS",
            description: "Cozy Game Recommender, created as a final project in first semester for Javascript. Includes a filter functionality. "
        }, 
        {
            name: "Crafting CMS Project",
            languages: "C#, ASP.Net",
            description: "A second semester project to build a content management system of our choice (or passion). Since I enjoy crafting and I have used reading as a subject prior I decided to use crafts instead."
        },
        {
            name: "Personal Library Database",
            languages: "MySQL",
            description: "Since I have grown a love of reading over the last year and a half I have acquired a lot of books. I felt for my database final the best option was to create a database to be able to record the status of all my books. This also helps with keeping record of who has been loaned a book as well."
        }
    ];
    await Project.insertMany(projectsList);
}

async function addProject(projectName, projectLanguages, projectDescription){
    await db.connect();
    let newProject = new Project ({
        name: projectName,
        languages: projectLanguages, 
        description: projectDescription
    });
    let result = await newProject.save(); // saving to the db collection
    console.log(result);
}
async function updateProject(oldLanguages, newLanguages, oldDescription, newDescription){
    await db.connect();
    let result = await Project.updateOne(
        {lanuages:  oldLanguages},
        {languages: newLanguages},
        {description: oldDescription},
        {description: newDescription}
    );

}

async function deleteProjectByName(projectName){
    await db.connect();
    let result = await Project.deleteOne({name: projectName});
}

//===========SKILLS===============
const SkillSchema = new mongoose.Schema({
    expertise: String, 
    languages: String,
    description: String
});

const Skill = mongoose.model("skills", SkillSchema);
//get all projects from project collection
async function getSkills(){
    await db.connect();
    return await Skill.find({}); // return an array to find all skills
}

//initalize skills collection with some inital data
async function initalizeSkills(){
    const skillList = [
        {
            expertise: "Responsive Front End Development",
            languages: "CSS (Flexbox, CSS Grid, Bootstrap), HTML",
            
        },
        {
            expertise:"building Content Management Systems",
            languages: "C#, Asp.Net, Entity Framework Core"
        },
        {
            expertise: "UI/UX Design",
            description:"wireframing, prototyping, user testing"
        },
        {
            expertise:"Backend Development",
            description: "CRUD Development, API creation and consumption, applications with authentication"
        },
        {
            expertise: "Version control and collaboration",
            description: "Git, GitHub for version control. Collaboration in teams via GitHub"
        }
    ];
    await Skill.insertMany(skillList);
}

async function addSkill(skillExpertise, skillDescription, skillLanguage){
    await db.connect();
    let newSkill = new Skill({
        skill: skillExpertise, 
        languages: skillLanguage,
        description: skillDescription
    });
    let result = await newSkill.save();
    console.log(result);
}

async function updateSkill(oldExpertise, newExpertise, oldLanguages, newLanguages, oldDescription, newDescription){
    await db.connect();
    let result = await Skill.updateOne(
        {expertise: oldExpertise},
        {expertise: newExpertise},
        {lanugages: oldLanguages},
        {languages: newLanguages},
        {description: oldDescription},
        {description: newDescription}
    );
}

async function deleteSkillByName(skillExpertise){
    await db.connect();
    let result = await Skill.deleteOne({name:skillExpertise});
}

//MODULE EXPORTS
module.exports = {
    getProjects, 
    initalizeProjects, 
    addProject, 
    updateProject, 
    deleteProjectByName,

    getSkills,
    initalizeSkills, 
    addSkill, 
    updateSkill, 
    deleteSkillByName
}