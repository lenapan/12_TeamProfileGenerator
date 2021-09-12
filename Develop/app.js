//const manager = require("./lib/Manager");   
//const Engineer = require("./lib/Engineer"); 
//const Intern = require("./lib/Intern"); 

const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "dist");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const init = [
    {   
        type: "list",
        name: "employee",
        message: "Add Employee:",
        choices: ['Manager','Engineer','Intern']
    },
    {   
        type: "input",
        name: "name",
        message: "Enter Name:"
    },
    {   
        type: "input",
        name: "id",
        message: "Enter ID:"
    },
    {   
        type: "input",
        name: "email",
        message: "Enter Email:"
    },       
    {   
        when: (a) => a.employee === 'Manager',
        type: "input",
        name: "number",
        message: "Office Number:"
    }, 
    {   
        when: (a) => a.employee === 'Intern',
        type: "input",
        name: "school",
        message: "School Name:"
    }, 
    {   
        when: (a) => a.employee === 'Engineer',
        type: "input",
        name: "github",
        message: "Github Username:"
    },
    {   
        type: "list",
        name: "add",
        message: "Any more team members to acknowledge?",
        choices: ['Yes',"No; Let's render the page!"]
    }
]
var team = [];
function startApp(){
    inquirer.prompt(init)
    .then(response => {
        team.push(response);
        console.log("\n"+ "Let's welcome "+response.name+ "\n");
        if (response.add === 'Yes'){
            startApp();
        }
        else{
            console.log("An HTML page is being generated...");
            //buildTeam();
        }
    })
}
startApp();

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
    fs.writeFileSync(OUTPUT_DIR, render(team), "utf-8")
}