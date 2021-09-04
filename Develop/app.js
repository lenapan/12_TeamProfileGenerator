const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer"); //internal mod
const Intern = require("./lib/Intern"); //internal mod
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamMembers = [];
const questions = [
    {   
        type:   "",
        name: "",
        message: "What is the team manager's name?"
    },
    {   
        type:   "",
        name: "",
        message: "What is the team manager's id?"
    },
    {   
        type:   "",
        name: "",
        message: "What is the team manager's email?"
    },
    {   
        type:   "",
        name: "",
        message: "What is the team manager's office number?"
    },
    {   
        type:   "list",
        name: "",
        message: "Which type of team member would you like to add?",
        choices: ['Engineer','Intern',"I don't want to add any more team members"]
    }
]
//function start(){}

//function createManager(){ inquirer.prompt ([]) }
            //.then(answers => {
// const manager = new Manager (answers.managerName, answers.id, answers.email, answers.tel ...)
        //teamMembers.push(manager)
        //createTeam() 
//})
//function createTeam()
//type list of options to call for team members
    //conditional statements...

//build team
function buildTeam(){
    //create the output dir if the output path doesn't exist
    if (!fs.existsSync(OUTPUT_DIR)){
        fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFileSync(OUTPUT_DIR, render(teamMembers), "utf-8")
}