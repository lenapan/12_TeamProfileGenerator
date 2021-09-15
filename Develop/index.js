const Manager = require("./lib/Manager");   
const Engineer = require("./lib/Engineer"); 
const Intern = require("./lib/Intern"); 
const render = require("./lib/htmlRenderer");

const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "dist");
const output = path.join(OUTPUT_DIR, "team.html");

const init = [
    {   
        type: "list",
        name: "team",
        message: "Add Teammate:",
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
        when: (a) => a.team=== 'Manager',
        type: "input",
        name: "number",
        message: "Office Number:"
    }, 
    {   
        when: (a) => a.team === 'Intern',
        type: "input",
        name: "school",
        message: "School Name:"
    }, 
    {   
        when: (a) => a.team === 'Engineer',
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
var teamArr = [];
function startApp(){
    inquirer.prompt(init)
    .then(response => { 
        if (response.team === 'Manager'){
            const m = new Manager (response.name, response.id, response.email, response.number);
            teamArr.push(m);    //console.log(teamArr); 
            console.log(`\n A new ${m.getRole()} has been added \n`);
        }
        else if(response.team === 'Engineer'){
            const e = new Engineer (response.name, response.id, response.email, response.github);
            teamArr.push(e);    //console.log(teamArr)
            console.log(`\n A new ${e.getRole()} has been added \n`);
        }
        else if(response.team === 'Intern'){
            const i = new Intern (response.name, response.id, response.email, response.school);
            teamArr.push(i);    //console.log(teamArr)
            console.log(`\n A new ${i.getRole()} has been added \n`);
        }              
        if (response.add === 'Yes'){ 
            startApp();
        }
        else{
            console.log(`\n An HTML page is being generated... \n Here it is:`);
            buildTeam();
        }
    })
}
startApp();

function buildTeam(){
    //create the output dir if the output path doesn't exist
    if (!fs.existsSync(OUTPUT_DIR)){
        fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFileSync(output, render(teamArr), "utf-8")
    console.log(`${output} \n`);
}