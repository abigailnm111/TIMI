import os
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import psycopg2
from psycopg2.extras import RealDictCursor

load_dotenv()

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# PostgreSQL connection setup
conn = psycopg2.connect(
    dbname=os.getenv("DB_NAME"),
    user=os.getenv("DB_USER"),
    password=os.getenv("DB_PASSWORD"),
    host=os.getenv("DB_HOST"),
    port=os.getenv("DB_PORT"),
    cursor_factory=RealDictCursor
)

@app.get("/")
def root():
    return {"message": "Hello from FastAPI backend!"}

#TODO: better error handling, especially for duplicate email
@app.post("/signUp")
async def signUp(request: Request):
    data = await request.json()
    try:
        with conn.cursor() as cur:
            cur.execute(
                "INSERT INTO users (email, password, username) VALUES (%s, %s, %s) RETURNING id",
                (data["email"], data["password"], data["username"])
            )
            user_id = cur.fetchone()["id"]
            conn.commit()
        return {"message": "User created successful", "userId": user_id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error executing query: {str(e)}")

#TODO Create real auth 
@app.post("/signIn")
async def signIn(request: Request):
    data = await request.json()
    try:
        with conn.cursor() as cur:
            cur.execute(
                "SELECT * FROM users WHERE username = %s AND password = %s",
                (data["username"], data["password"])
            )
            user = cur.fetchone()
        if user:
            return {"message": "Sign in successful", "userId": user["id"]}
        else:
            raise HTTPException(status_code=401, detail="Invalid username or password")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error during signIn: {str(e)}")

#Body contains: user_id
@app.get("/getPosts")
async def getPosts(user_id):
    print("REQUEST"+user_id)
   # data = await request.json()
    
    try:
        with conn.cursor() as cur:
            cur.execute(
                'SELECT * FROM followers INNER JOIN posts ON followers.user_id = posts.user_id WHERE followers.follower_id = %s',
                (user_id)
            )
            posts= cur.fetchall()
            if not posts:
                return {"message": "No posts found for this user", "posts": []}
            conn.commit()
        return {"message": "Got your feed", "posts": posts}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error executing query: {str(e)}")

#body contains: user_id, content, title, media_url, content_type
@app.post("/createPost")
async def createPost(request: Request):
    data = await request.json()
    try:
        with conn.cursor() as cur:
            cur.execute(
                'INSERT INTO posts (user_id, content, title, media_url, content_type) VALUES (%s, %s, %s, %s, %s) RETURNING *',
                (str(data["user_id"]), data["content"], data["title"], data["media_url"], data["content_type"])
            )
            post = cur.fetchone()
        if post:
            return {"message": "Post created successfully", "postId": post["id"]}
        else:
            raise HTTPException(status_code=401, detail="Could not create post")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error during creating: {str(e)}")
    
#body contains: user_id, follower_id
@app.post("/followUser")
async def followUser(request: Request):
    data = await request.json()
    try:
        with conn.cursor() as cur:
            cur.execute(
                'INSERT INTO followers (user_id, follower_id) VALUES (%s, %s) RETURNING *',
                (str(data["user_id"]), str(data["follower_id"]))
            )
            follow = cur.fetchone()
        if follow:
            return {"message": "Follow created successfully", "followId": follow["id"]}
        else:
            raise HTTPException(status_code=401, detail="Could not create follow")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error during creating: {str(e)}")
