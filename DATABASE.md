## Database schema

The database is designed to optimize the performances for retrieving and updating information in the database.
This is done by separating the Questions and Answers. Both concepts have the same structure and could be 
designed as Posts (A Post without a parent post is a Question, and a Post with a parent post is an Answer), benefiting
from polymorphic operations. However, this approach has several concerns about scalability and performances.
First, if the Posts structure was implemented, I will be necessary to find a way to filter Questions from Answers, which 
have a certain operational cost. So, one solution would be to create an index to simplify the filtering over the posts.
However, even if indexes increase the performances for reading operations, they decrease the writing operations.
Having two different table allows to have targeted indexes and an optimized schema that avoid filtering operations.
The same reasoning have been made for the votes, divided between QuestionVotes and AnswerVotes.
Thus, the normalization of the schema is balanced and fit the requirements of the project.

### Table course(***id***, title, description)
Table that contains information about the courses.
The title and description are mandatory, and the title cannot exceed 200 characters.

### Table questions(***id***, *course_id*, user_uuid, title, content, creation_time, upvote_count, last_upvote_time)
Table that contains information about the questions for a course (one-to-many relationship).
A question is linked to a course. If a course is deleted, then corresponding questions are also deleted.
The title and content field are mandatory, and the title length cannot exceed 200 characters.

### Table answers(***id***, *course_id*, user_uuid, content, creation_time, upvote_count, last_upvote_time)
Table that contains information about the answers for a question (one-to-many relationship).
An answer is linked to a question. If a question is deleted, then corresponding answers are also deleted.
The  content field is mandatory.

### Table question_votes(***post_id***, **user_uuid**, upvote_time)
Table that contains upvotes of the users for a specific question (one-to-many relationship).
An answer is linked to a question. If a question is deleted, then corresponding answers are also deleted.
The  content field is mandatory.

### Table answer_votes(***post_id***, **user_uuid**, upvote_time)
Table that contains upvotes of the users for a specific answer (one-to-many relationship).
An answer is linked to a question. If a question is deleted, then corresponding answers are also deleted.
The  content field is mandatory.



## Caching decisions

TODO for merits: Caching decisions are outlined in DATABASE.md.