const db = require('../config/db');
const run = () => {
    return new Promise((resolve, reject) => {
  db.query(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
    deadline DATE,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )
`, (err, result) => {
  if (err) {
    console.error('Error creating tasks table:', err);
    return reject(err);
  } else {
    console.log('Tasks table created successfully or already exists.');
    return resolve(result);
  }
});
    });
}

const down = () => {
    return new Promise((resolve, reject) => {
        db.query('DROP TABLE IF EXISTS tasks', (err, result) => {
            if (err) {
                console.error('Error dropping tasks table:', err);
                return reject(err);
            } else {
                console.log('Tasks table dropped successfully.');
                return resolve(result);
            }
        });
    });
}

module.exports = { run, down };