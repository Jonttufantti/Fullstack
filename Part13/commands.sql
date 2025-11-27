CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author VARCHAR(255),
    title VARCHAR(255) NOT NULL,
    url VARCHAR(255) NOT NULL,
    likes INTEGER DEFAULT 0
);

INSERT INTO blogs (author, title, url, likes) 
VALUES 
('Dan Abramov', 'On let vs const', 'https://example.com/let-vs-const', 0),
('Laurenz Albe', 'Gaps in sequences in PostgreSQL', 'https://example.com/pg-sequences', 0);
