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
//TODO Create real auth 
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
app.get('/getPosts', async (req, res) => {
    try{
        //where userId = followerId on follower table, and userId from follower table = userId on post table
        const queryRes = await pool.query('SELECT * FROM followers INNER JOIN posts ON followers.user_id = posts.user_id WHERE followers.follower_id = $1 ', [req.body.user_id]);
        if (queryRes.rows.length > 0) {
             res.status(200).json({ message: 'Got your feed', posts: queryRes.rows[0] });
            return res;
        }else {
            return res.status(401).send("you don't follow anyone");
        }
    }catch (error) {
        return res.status(500).send('Error during getting posts'+error.stack);
    }
});

//TODO
app.post('/createPost', async (req, res) => {
    try{
        const queryRes=await pool.query('INSERT INTO posts (user_id, content, title, media_url, content_type) VALUES ($1, $2, $3, $4, $5) RETURNING *', [req.body.user_id, req.body.content, req.body.title, req.body.media_url, req.body.content_type]);
        res.json({ message: 'User created successful', postId: queryRes.rows[0].id }).status(200);
        return res;
    }catch (error) {
        res.status(500).send('Error executing query:'+error.stack);
        return res}
});

//TODO
app.post('/followUser', async (req, res) => {
    try{
        const queryRes=await pool.query('INSERT INTO followers (user_id, follower_id) VALUES ($1, $2) RETURNING *', [req.body.user_id, req.body.follower_id, ]);
        res.json({ message: 'Follow created', postId: queryRes.rows[0].id }).status(200);
        return res;
    }catch (error) {
        res.status(500).send('Error executing query:'+error.stack);
        return res}
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
