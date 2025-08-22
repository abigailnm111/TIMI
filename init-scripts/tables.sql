    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        password VARCHAR(50) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        userName VARCHAR(50) UNIQUE NOT NULL
    );

        CREATE TABLE followers (
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id),
        follower_id INT REFERENCES users(id)
    );

        CREATE TABLE posts (
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id),
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        title VARCHAR(100) NOT NULL,
        media_url VARCHAR(255),
        content_type VARCHAR(50) NOT NULL

    );