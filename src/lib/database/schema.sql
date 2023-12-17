CREATE TABLE
  users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

CREATE TABLE
  posts (
    post_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users (user_id)
  );

CREATE TABLE
  comments (
    comment_id INTEGER PRIMARY KEY AUTOINCREMENT,
    post_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES Posts (post_id),
    FOREIGN KEY (user_id) REFERENCES Users (user_id)
  );

-- Inserting a user
INSERT INTO
  users (username, email)
VALUES
  ('Glauber', 'glauber@example.com');

-- Inserting a post by the user
INSERT INTO
  posts (user_id, title, content)
VALUES
  (1, 'First Post', 'Content of the first post');

-- Inserting a comment on the post
INSERT INTO
  comments (post_id, user_id, content)
VALUES
  (1, 1, 'This is a comment on the first post');