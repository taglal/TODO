const express = require('express');
const router = express.Router();
const db = require('../config/db');
/** 
 GET http://localhost:3000/api/tasks -> all tasks
 POST http://localhost:3000/api/tasks -> create task
 GET http://localhost:3000/api/tasks/:id -> single task
 PUT http://localhost:3000/api/tasks/:id -> update task
 DELETE http://localhost:3000/api/tasks/:id -> delete task
 DELETE http://localhost:3000/api/tasks -> delete all tasks

*/

// GET all tasks
router.get('/', (req, res) => {
    db.query('SELECT * FROM tasks', (err, results) => {
        if (err) {
            
            return res.status(500).json({ error: 'Failed to fetch tasks' });
        } else {
            return res.status(200).json(results);
        }
    });
});
// get single todo
router.get('/:id', (req, res) => {
    const taskId = req.params.id;
    db.query('SELECT * FROM tasks WHERE ID = ?', [taskId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch todo' });
        } else if (results.length === 0) {
            return res.status(404).json({ error: 'Todo not found' });
        } else {
            return res.status(200).json(results[0]);
        }
    });
});

// POST create todo
router.post('/', (req, res) => {
    const { title, description, deadline } = req.body;
    db.query('INSERT INTO tasks (title, description, deadline) VALUES (?, ?, ?)', [title, description, deadline], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to create todo' });
        } else {
            return res.status(201).json({ id: results.insertId, title, description });
        }
    });
});


//DELETE single todo
router.delete('/:id', (req, res) => {
    const taskId = req.params.id;
    db.query('DELETE FROM tasks WHERE ID = ?', [taskId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to delete todo' });
        } else if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Todo not found' });
        } else {
            return res.status(200).json({ message: 'Todo deleted successfully' });
        }
    });
});

// DELETE all tasks
router.delete('/', (req, res) => {
    db.query('DELETE FROM tasks', (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to delete all tasks' });
        } else {
            return res.status(200).json({ message: 'All tasks deleted successfully' });
        }
    });
});

// patch a todo by id
router.patch('/:id', (req, res) => {
    const taskId = req.params.id;
    

    // Build the update query dynamically based on provided fields
    const updateFields = Object.keys(req.body).map(field => `${field} = ?`).join(', ');
    const updateValues = Object.values(req.body);

    db.query(`UPDATE tasks SET ${updateFields} WHERE ID = ?`, [...updateValues, taskId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to update task' });
        } else if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Todo not found' });
        } else {
            return res.status(200).json({ message: 'Todo updated successfully' });
        }
    });
})





module.exports = router;