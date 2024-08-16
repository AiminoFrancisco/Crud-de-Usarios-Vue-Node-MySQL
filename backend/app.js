const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3001;


app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: 'root',
    database: "usuarios_crud;",
    port: 3306
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to database');
});

app.get('/users', (req, res) => {
  const query = 'SELECT * FROM users';
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});


app.post('/users', (req, res) => {
  const { nombre, edad, email, pais, password } = req.body;
  const query = 'INSERT INTO users (nombre, edad, email, pais, password) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [nombre, edad, email, pais, password], (err, result) => {
    if (err) throw err;
    res.json({ message: 'User created', id: result.insertId });
  });
});


app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, edad, email, pais, password } = req.body;
  const query = 'UPDATE users SET nombre = ?, edad = ?, email = ?, pais = ?, password = ? WHERE id = ?';
  db.query(query, [nombre, edad, email, pais, password, id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'User updated' });
  });
});


app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM users WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'User deleted' });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
