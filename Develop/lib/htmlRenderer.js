const path = require("path");
const fs = require("fs");

const templatesDir = path.resolve(__dirname, "../templates");

const render = employees => {
  const html = [];
  //filter() and map() can only be used on an array
  html.push(...employees
    .filter(employee => employee.getRole() === "Manager") //If "Manager" is found in the array,
    .map(manager => renderManager(manager)) //create a new array with values derived from line 25-33
  );
  html.push(...employees
    .filter(employee => employee.getRole() === "Engineer")
    .map(engineer => renderEngineer(engineer))
  );
  html.push(...employees
    .filter(employee => employee.getRole() === "Intern")
    .map(intern => renderIntern(intern))
  );

  return renderMain(html.join(""));//line 55 reference
};
//line 60 for replacePlaceholders reference
const renderManager = manager => {
  let template = fs.readFileSync(path.resolve(templatesDir, "manager.html"), "utf8");
  template = replacePlaceholders(template, "name", manager.getName()); //<h2 class="card-title"> {{ name }} </h2>
  template = replacePlaceholders(template, "role", manager.getRole()); //{{ role }}
  template = replacePlaceholders(template, "email", manager.getEmail());  //{{ email }}
  template = replacePlaceholders(template, "id", manager.getId()); //{{ id }}
  template = replacePlaceholders(template, "officeNumber", manager.getOfficeNumber()); //{{ officeNumber }}
  return template;
};

const renderEngineer = engineer => {
  let template = fs.readFileSync(path.resolve(templatesDir, "engineer.html"), "utf8");
  template = replacePlaceholders(template, "name", engineer.getName());
  template = replacePlaceholders(template, "role", engineer.getRole());
  template = replacePlaceholders(template, "email", engineer.getEmail());
  template = replacePlaceholders(template, "id", engineer.getId());
  template = replacePlaceholders(template, "github", engineer.getGithub());
  return template;
};

const renderIntern = intern => {
  let template = fs.readFileSync(path.resolve(templatesDir, "intern.html"), "utf8");
  template = replacePlaceholders(template, "name", intern.getName());
  template = replacePlaceholders(template, "role", intern.getRole());
  template = replacePlaceholders(template, "email", intern.getEmail());
  template = replacePlaceholders(template, "id", intern.getId());
  template = replacePlaceholders(template, "school", intern.getSchool());
  return template;
};

const renderMain = html => {
  const template = fs.readFileSync(path.resolve(templatesDir, "main.html"), "utf8");
  return replacePlaceholders(template, "team", html); //{{ team }}
};

const replacePlaceholders = (template, placeholder, value) => {
  const pattern = new RegExp("{{ " + placeholder + " }}", "gm"); //RegExp() constructor // g (global match); find ALL
                        //creates a regular expression object for matching text with a pattern.
  return template.replace(pattern, value);
};

module.exports = render;
//const render = require("./lib/htmlRenderer");
