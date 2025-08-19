const express = require('express');
require('dotenv').config({path:'../.env'});
const { Pool } = require('pg');
const app = express();
const PORT = process.env.PORT;

// PostgreSQL connection setup
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Example: test connection
pool.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('PostgreSQL connection error:', err));

app.get('/', (req, res) => {
  res.send('Hello from Express backend!');
});

//TODO
app.post('/signUp', async (req, res) => {
    await pool.query('SELECT * FROM users');
    res.json(result.rows);
  res.send('Hello from Express backend!');
});

//TODO
app.post('/signIn', (req, res) => {
  res.send('Hello from Express backend!');
});

//TODO
app.get('/getFeed', (req, res) => {
  res.send('Hello from Express backend!');
});

//TODO
app.post('/addPost', (req, res) => {
  res.send('Hello from Express backend!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
