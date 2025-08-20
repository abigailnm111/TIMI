const express = require('express');
require('dotenv').config({path:'../.env'});
const cors = require('cors');
const { Pool } = require('pg');
const app = express();
const PORT = process.env.PORT;
app.use(express.json()); // Middleware to parse JSON bodies
app.use(cors());

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

app.post('/signUp', async (req, res) => {
    //TODO: better error handling, especially for duplicate email
    try{

        const queryRes=await pool.query('INSERT INTO users (email, password, username) VALUES ($1, $2, $3) RETURNING *', [req.body.email, req.body.password, req.body.username]);
        res.json({ message: 'User created successful', userId: queryRes.rows[0].id }).status(200);
        return res;
    }catch (error) {
        res.status(500).send('Error executing query:'+error.stack);
        return res}
    
});

app.post('/signIn', async (req, res) => {
    try{
        const queryRes = await pool.query('SELECT * FROM users WHERE username = $1 AND password = $2 ', [req.body.username, req.body.password]);
        if (queryRes.rows.length > 0) {
             res.status(200).json({ message: 'Sign in successful', userId: queryRes.rows[0].id });
            return res;
        }else {
            return res.status(401).send('Invalid username or password');
        }
    }catch (error) {
        return res.status(500).send('Error during signIn'+error.stack);
    }
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
