const express = require('express');
const mysql = require('mysql');

const dbconfig = {
  host: 'mysql',
  user: 'root',
  password: 'root',
  database: 'node'
};

const dbConnection = mysql.createConnection(dbconfig);

const app = express();

const createTableQuery = `CREATE TABLE IF NOT EXISTS user(id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255))`;

dbConnection.query(createTableQuery);

const names = ['Matheus', 'João', 'Maria', 'José', 'Ana', 'Carlos', 'Pedro', 'Paulo', 'Lucas', 'Mariana'];

names.forEach(name => {
  const insertQuery = `INSERT INTO user(name) VALUES('${name}')`;

  dbConnection.query(insertQuery);
});

const listUsersQuery = `SELECT * FROM user`;

let listOfUsers = [];

dbConnection.query(listUsersQuery, (err, result) => {
  if (err) {
    console.error(err);
  } else {
    listOfUsers = result;
  }
});

dbConnection.end();

app.get('/', (req, res) => {
  res.send('<h1>Full Cycle</h1>' + '<h3>Lista de nomes cadastrada no banco de dados:</h3>' + `<ol>${listOfUsers.map(user => `<li>${user.name}</li>`).join('')}</ol>`);
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});