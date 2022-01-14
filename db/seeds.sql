INSERT INTO departments (name)
VALUES 
    ('Sales'),          /* department_id 1 */
    ('Engineering'),    /* department_id 2 */
    ('Finance'),        /* department_id 3 */
    ('Legal');          /* department_id 4 */

INSERT INTO roles (title, salary, department_id)
VALUES
    ('Salesperson', 80000, 1),          /* role_id 1 */
    /* Engineering roles */         
    ('Lead Engineer', 150000, 2),       /* role_id 2 */
    ('Software Engineer', 120000, 2),   /* role_id 3 */
    /* Finance roles */
    ('Account Manager', 160000, 3),     /* role_id 4 */
    ('Accountant', 125000, 3),          /* role_id 5 */
    /* Legal roles */
    ('Legal Team Lead', 250000, 4),     /* role_id 6 */
    ('Lawyer', 190000, 4);              /* role_id 7 */

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
    ('Mike', 'Chan', 1, 1),
    ('Ashley', 'Rodriguez', 2, null),
    ('Kevin', 'Tupik', 3, 2),
    ('Kunal', 'Singh', 4, null),
    ('Malia', 'Brown', 5, 3),
    ('Sarah', 'Lourd', 6, null),
    ('Tom', 'Allen', 7, 4);