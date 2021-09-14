// TODO: Write code to define and export the Employee class
//12.3.18 - 19 (Review)
class Employee {
    constructor(name, id, email){
        this.name = name;
        this.id = id;
        this.email = email;
    }
    //see htmlRenderer.js for function hints
    getRole() {return "Employee"}//only needed to pass npm run test; app can function without
    getName() {return this.name};
    getId() {return this.id};
    getEmail() {return this.email};
}

module.exports= Employee;