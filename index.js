const res = require('express/lib/response');
const inquirer = require('inquirer');
const db_connection = require('./config/connection');
require('console.table');

// Function call to initialize prompts
initialize();

function initialize() {
    inquirer
    .prompt({
        type: 'list',
        name: 'options',
        message: 'Please select an option',
        choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role'
        ]
    })
    .then(function ({ options }) {
        switch (options) {
            case 'View all departments':
                view_departments();
                break;
            
            case 'View all roles':
                view_roles();
                break;

            case 'View all employees':
                view_employees();
                break;

            case 'Add a department':
                add_department();
                break;
            
            case 'Add a role':
                add_role();
                break;

            case 'Add an employee':
                add_employee();
                break;

            case 'Update an employee role':
                update_role();
                break;
        }
    });
}

function view_departments() {
    
    const query = `SELECT departments.id, departments.name AS Department FROM departments`;
    db_connection.query(query, (err, result) => {
        if(err) {
            res.status(500).json({ error: err.message })
            return;
        }
        console.table(result);
        initialize();
    });
}

function view_roles() {
    
    const query = `SELECT * FROM roles`;
    db_connection.query(query, (err, result) => {
        if(err) {
            res.status(500).json({ error: err.message })
            return;
        }
        console.table(result);
        initialize();
    });
}

function view_employees() {
    const query = 
    `SELECT employees.id,
    employees.first_name,
    employees.last_name,
    roles.title AS job_title,
    departments.name AS department,
    roles.salary,
    CONCAT(manager.first_name, ' ' ,manager.last_name) AS manager
    FROM employees
    LEFT JOIN roles ON employees.role_id = roles.id
    LEFT JOIN departments ON roles.department_id = departments.id
    LEFT JOIN employees AS manager ON employees.manager_id = manager.id
    ORDER By employees.id`;

    db_connection.query(query, (err, result) => {
        if(err) throw err;
        console.table(result);
        initialize();
    });
}

function add_department() {
    inquirer.prompt([
        {
            name: 'name',
            type: 'input',
            message: 'Please enter name for the new department',
            validate: new_department_name => {
                if(new_department_name) {
                    return true;
                } else {
                    console.log('Please enter a name for the new department.');
                    return false;
                }
            }
        }
    ])
    .then((answer) => {

    const query = `INSERT INTO departments (name) VALUES (?)`;
    const params = [answer.name];
    db_connection.query(query, params, (err, result) => {
    if (err) throw err;
    console.log('New department added to database!');

    db_connection.query(`SELECT * FROM departments`, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message })
            return;
        }
            console.table(result);
            initialize();
        });
    });
});
}

function add_role() {
    inquirer.prompt([
        {
            name: 'title',
            type: 'input',
            message: 'Please enter the title of the new role.',
            validate: new_role_title => {
                if(new_role_title) {
                    return true;
                } else {
                    console.log('Please enter the title of the new role.');
                    return false;
                }
            }
        },
        {
            name: 'salary',
            type: 'input',
            message: 'Please enter the salary of the new role.',
            validate: new_role_salary => {
                if(new_role_salary) {
                    return true;
                } else {
                    console.log('Please enter the salary of the new role.');
                    return false;
                }
            }
        },
        {
            name: 'department_id',
            type: 'number',
            message: 'Please enter the id of the department this role will be categorized in.',
        }
    ])
    .then(function (response) {
        db_connection.query('INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)', [response.title, response.salary, response.department_id], 
        function (err, data) {
            if (err) throw err;
            console.log('New role added to database!');

            db_connection.query(`SELECT * FROM roles`, (err, result) => {
                if (err) {
                    res.status(500).json({ error: err.message })
                    initialize();
                }
                console.table(result);
                initialize();
            });
        })
    });
}

function add_employee() {
    inquirer.prompt([
        {
            name: 'first_name',
            type: 'input',
            message: 'Please enter the first name of the new employee.',
            validate: new_employee_fn => {
                if(new_employee_fn) {
                    return true;
                } else {
                    console.log('Please enter the first name of the new employee.');
                    return false;
                }
            }
        },
        {
            name: 'last_name',
            type: 'input',
            message: 'Please enter the last name of the new employee.',
            validate: new_employee_ln => {
                if(new_employee_ln) {
                    return true;
                } else {
                    console.log('Please enter the last name of the new employee.');
                    return false;
                }
            }
        },
        {
            name: 'role_id',
            type: 'number',
            message: 'Please enter a role id for the new employee.',
            validate: new_employee_role => {
                if(new_employee_role) {
                    return true;
                } else {
                    console.log('Please enter a role id for the new employee.');
                    return false;
                }
            }
        },
        {
            name: 'manager_id',
            type: 'number',
            message: 'Please enter the id of the employees new manager.',
            validate: new_employee_manager => {
                if(new_employee_manager) {
                    return true;
                } else {
                    console.log('Please enter the id of the employees new manager.');
                    return false;
                }
            }
        }

    ])
    .then(function (response) {
        db_connection.query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [response.first_name, response.last_name, response.role_id, response.manager_id], 
        function (err, data) {
            if (err) throw err;
            console.log('New employee added to the database!');

            db_connection.query(`SELECT * FROM employees`, (err, result) => {
                if (err) {
                    res.status(500).json({ error: err.message })
                    initialize();
                }
                console.table(result);
                initialize();
            });
        })
    });
};

function update_role() {
    inquirer.prompt([
        {
            name: 'first_name',
            type: 'input',
            message: 'Please enter the first name of the employee.',
            validate: update_employee_named => {
                if(update_employee_named) {
                    return true;
                } else {
                    console.log('Please enter the first name of the employee.');
                    return false;
                }
            }
        },
        {
            name: 'role_id',
            type: 'number',
            message: 'Please enter the new role id.',
            validate: updated_employee_role => {
                if(updated_employee_role) {
                    return true;
                } else {
                    console.log('Please enter the new role id.');
                    return false;
                }
            }
        }
    ])
    .then(function (response) {
        db_connection.query('UPDATE employees SET role_id = ? WHERE first_name = ?', [response.role_id, response.first_name], 
        function (err, data) {
            if (err) throw err;
            console.log('Employee role has been updated!');

            db_connection.query(`SELECT * FROM employees`, (err, result) => {
                if (err) {
                    res.status(500).json({ error: err.message })
                    initialize();
                }
                console.table(result);
                initialize();
            });
        })
    });
};