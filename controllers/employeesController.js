const data = {
    employees: require('../model/employees.json'),
    setEmployee: function(data) {
        this.employees = data;
    },
};

// const getAllEmployee = (req, res) => {}

const getAllEmployee = (req, res) => {
    res.json(data.employees);
}

const createNewEmployee = (req, res) => {
    const newEmployee = {
        id: data.employees[data.employees.length -1].id + 1 || 1,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        role: "Tutor"

    }

    if(!newEmployee.firstname || !newEmployee.lastname) {
        return res.status(400).json({"message": "First and last name is required! Thank you.👨‍🦲"})
    }
    data.setEmployee([...data.employees, newEmployee]);
    
    res.json(newEmployee);
}

const updateEmployee =  (req, res) => {
    const employee = data.employees.find((emp) => emp.id === parseInt(req.body.id))

    if(!employee){
        return res.status(400).json({"Message": `Employee with the ID ${req.body.id} not found`})
    }
    if(req.body.firstname) employee.firstname = req.body.firstname;
    if(req.body.lastname) employee.lastname = req.body.lastname;
    if(req.body.role) employee.rolen = req.body.role;

    const filteredEmployee = data.employees.filter(
        (emp) => emp.id !== parseInt(req.body.id)
    )

    const unsortedArray = [...filteredEmployee, employee]

    data.setEmployee(
        unsortedArray.sort((a,b) => (a.id > b.id ? 1 : a.id ? 1: 0))
    )
    res.json(data.employees)
}

const deleteEmployee = (req, res) => {
    const employee = data.employees.find((emp) => emp.id === parseInt(req.body.id))

    if(!employee){
        return res.status(400).json({"Message": `Employee with the ID ${req.body.id} not found`})
    }

    const filteredEmployee = data.employees.filter(
        (emp) => emp.id !== parseInt(req.body.id)
    )
    data.setEmployee([...filteredEmployee]);
    res.json(data.employees)
}

 const getEmployee = (req, res) =>{
    const employee = data.employees.find((emp) => emp.id === parseInt(req.params.id))

    if(!employee){
        return res.status(400).json({"Message": `Employee with the ID ${req.body.id} not found`})
    }
    res.json(employee)
 }

 module.exports = {
    getAllEmployee, createNewEmployee, updateEmployee,deleteEmployee, getEmployee
 }