const db = require('../config/db');

const migration = [
    require('./001_create_tasks')
];

migration.forEach(migration => {
    migration.run(); //create tasks table
});