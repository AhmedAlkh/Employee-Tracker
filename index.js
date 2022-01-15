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