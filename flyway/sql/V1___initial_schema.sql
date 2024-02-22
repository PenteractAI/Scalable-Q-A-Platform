CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) UNIQUE NOT NULL,
    description TEXT NOT NULL
);

CREATE TABLE questions (
    id SERIAL PRIMARY KEY,
    course_id INT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    user_uuid UUID NOT NULL,
    title VARCHAR(200) NULL,
    content TEXT NOT NULL,
    creation_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    upvote_count INT DEFAULT 0,
    last_upvote_time TIMESTAMP NULL
);

CREATE TABLE answers (
    id SERIAL PRIMARY KEY,
    question_id INT NULL REFERENCES questions(id) ON DELETE CASCADE,
    user_uuid UUID NOT NULL,
    content TEXT NOT NULL,
    creation_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    upvote_count INT DEFAULT 0,
    last_upvote_time TIMESTAMP NULL
);

CREATE TABLE question_votes (
    id INT NULL REFERENCES questions(id) ON DELETE CASCADE,
    user_uuid UUID NOT NULL,
    upvote_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id, user_uuid)
);

CREATE TABLE answer_votes (
    id INT NOT NULL REFERENCES answers(id) ON DELETE CASCADE,
    user_uuid UUID NOT NULL,
    upvote_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id, user_uuid)
);

CREATE INDEX idx_question_votes_user ON question_votes (id, user_uuid);
CREATE INDEX idx_answer_votes_user ON answer_votes (id, user_uuid);