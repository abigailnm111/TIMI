    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        password VARCHAR(50) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL
    );