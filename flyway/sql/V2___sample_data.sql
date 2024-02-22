INSERT INTO courses (title, description) VALUES
('Introduction to Data Science', 'A comprehensive course covering the basics of Data Science.'),
('Advanced Database Systems', 'An in-depth look at modern database systems, focusing on performance and scalability.'),
('Principles of Machine Learning', 'Explore the core concepts of Machine Learning and how to apply them.'),
('Web Development for Beginners', 'Learn the fundamentals of web development, from HTML to advanced web frameworks.'),
('Cloud Computing Essentials', 'Understanding the basics of cloud computing and its applications in today’s technology.'),
('Cybersecurity Fundamentals', 'An introductory course on the principles of cybersecurity and digital protection measures.'),
('Blockchain and Cryptocurrency', 'Discover the technology behind blockchain and its use in cryptocurrencies.'),
('Artificial Intelligence Basics', 'Dive into the world of AI and learn about its impact on various industries.'),
('Internet of Things (IoT) Introduction', 'Explore how IoT devices are connected and the implications for the future.'),
('Big Data Analytics', 'Learn how to analyze and extract meaningful insights from large datasets.'),
('Software Testing Principles', 'A guide to the essential principles and practices of software testing.');

INSERT INTO questions (id, course_id, user_uuid, title, content) VALUES
(1, 1, '903e64c9-d1d8-4870-b12c-f56247290c6f', 'What exactly encompasses Data Science?', 'I''m new to the field and curious about the main components that define Data Science.'),
(3, 1, '903e64c9-d1d8-4870-b12c-f56247290c6f', 'Essential tools for a data scientist?', 'Looking for recommendations on tools and software that are crucial for data science work.'),
(5, 1, '903e64c9-d1d8-4870-b12c-f56247290c6f', 'How do Data Science and Data Analytics differ?', 'Is there a clear distinction between these two fields, or do they overlap significantly?'),
(7, 1, '903e64c9-d1d8-4870-b12c-f56247290c6f', 'Recommended learning resources for Data Science?', 'What books, courses, or online resources are best for beginners?'),
(9, 1, '903e64c9-d1d8-4870-b12c-f56247290c6f', 'Exploring career paths in Data Science', 'What are the various career options in Data Science, and how do they differ?'),
(11, 1, '903e64c9-d1d8-4870-b12c-f56247290c6f', 'Importance of statistics in Data Science', 'How crucial is having a strong foundation in statistics for a data scientist?'),
(13, 1, '903e64c9-d1d8-4870-b12c-f56247290c6f', 'Integrating machine learning in data science projects', 'Examples of how machine learning is applied in real data science projects?'),
(15, 1, '903e64c9-d1d8-4870-b12c-f56247290c6f', 'Starting with data science projects', 'Any suggestions for beginner-friendly projects to start applying data science concepts?'),
(17, 1, '903e64c9-d1d8-4870-b12c-f56247290c6f', 'Common challenges faced by data scientists', 'What are some of the hurdles in data science work, and how can one overcome them?'),
(19, 1, '903e64c9-d1d8-4870-b12c-f56247290c6f', 'The future of Data Science', 'Predictions or insights on how the field of Data Science might evolve in the coming years?');

INSERT INTO questions (id, course_id, user_uuid, title, content) VALUES
(2, 2, '903e64c9-d1d8-4870-b12c-f56247290c6f', 'Choosing between NoSQL and SQL databases', 'Under what circumstances is NoSQL a better choice than traditional SQL databases?'),
(4, 2, '903e64c9-d1d8-4870-b12c-f56247290c6f', 'Understanding database normalization', 'Why is normalization important in database design, and what are its benefits?'),
(6, 2, '903e64c9-d1d8-4870-b12c-f56247290c6f', 'Effective indexing strategies for databases', 'How can one design indexing strategies to improve query performance significantly?'),
(8, 2, '903e64c9-d1d8-4870-b12c-f56247290c6f', 'Explaining ACID properties in databases', 'Can someone provide practical examples of ACID properties and their importance?'),
(10, 2, '903e64c9-d1d8-4870-b12c-f56247290c6f', 'Scalability solutions for database systems', 'What are the best practices or technologies for scaling databases to accommodate growth?'),
(12, 2, '903e64c9-d1d8-4870-b12c-f56247290c6f', 'Ensuring database security', 'What measures should be taken to secure database information effectively?'),
(14, 2, '903e64c9-d1d8-4870-b12c-f56247290c6f', 'The workings of distributed databases', 'How do distributed databases enhance performance and reliability, and when should they be used?'),
(16, 2, '903e64c9-d1d8-4870-b12c-f56247290c6f', 'Benefits of data warehousing', 'What are the key advantages of implementing a data warehousing solution?'),
(18, 2, '903e64c9-d1d8-4870-b12c-f56247290c6f', 'Tips for optimizing database queries', 'Looking for advice on making database queries run faster and more efficiently.'),
(20, 2, '903e64c9-d1d8-4870-b12c-f56247290c6f', 'Emerging trends in database technologies', 'What new technologies or approaches are shaping the future of database systems?');

INSERT INTO answers (question_id, user_uuid, content) VALUES
(1, '903e64c9-d1d8-4870-b12c-f56247290c6f', 'Data Science, to me, feels like a magic box sometimes. You have data coming in—could be numbers, text, or images—and then, after some statistical spells and machine learning charms, insights and predictions start popping out. It’s about making sense of data in a way that can help answer complex questions and solve real-world problems.'),
(1, '903e64c9-d1d8-4870-b12c-f56247290c6f', 'I''ve always seen Data Science as a puzzle. You start with these pieces of data scattered everywhere. Part of the work is figuring out which pieces matter and how they fit together. The cool part? When you get it right, you can actually predict the future—like, what’s the next big trend, or how can we make things better.'),
(1, '903e64c9-d1d8-4870-b12c-f56247290c6f', 'Imagine being a detective, but instead of solving crimes, you’re uncovering stories hidden in data. That’s Data Science for me. It involves a lot of digging through data, looking for patterns, and using those patterns to make educated guesses about whatever you’re investigating.'),
(1, '903e64c9-d1d8-4870-b12c-f56247290c6f', 'To me, Data Science is all about asking the right questions and then using data to find the answers. It’s a mix of knowing your math and statistics, sure, but also about being curious and creative in how you interpret and visualize data.'),
(1, '903e64c9-d1d8-4870-b12c-f56247290c6f', 'Data Science is like cooking. You start with raw ingredients (data), apply some recipes (algorithms), and you end up with a meal (insights). The beauty is in how different chefs (data scientists) can use the same ingredients but come up with entirely different dishes based on their techniques and creativity.');

INSERT INTO answers (question_id, user_uuid, content) VALUES
(2, '903e64c9-d1d8-4870-b12c-f56247290c6f', 'NoSQL databases shine when you’re dealing with large volumes of unstructured or semi-structured data. They’re designed to excel in speed and scalability, making them a go-to for big data applications and real-time web apps. If your project involves a lot of read/write operations and you need to scale quickly, NoSQL can be a great fit.'),
(2, '903e64c9-d1d8-4870-b12c-f56247290c6f', 'From my experience, NoSQL is a better choice when you need flexibility for your database schema. If your data model is evolving or you’re working with JSON documents, NoSQL databases like MongoDB allow for schema-less storage, which means you can add new data types without restructuring your entire database.'),
(2, '903e64c9-d1d8-4870-b12c-f56247290c6f', 'NoSQL databases often provide more horizontal scalability than traditional SQL databases. This means that if your application expects a high level of traffic or data growth, you might find it easier to scale out with NoSQL. They’re built to distribute data across multiple servers from the get-go.'),
(2, '903e64c9-d1d8-4870-b12c-f56247290c6f', 'It really depends on the specific requirements of your project. NoSQL databases can handle a wide variety of data types and structures, making them ideal for projects that involve dynamic, complex datasets which do not fit neatly into tables, like graphs or time-series data.'),
(2, '903e64c9-d1d8-4870-b12c-f56247290c6f', 'One of the main reasons to go for NoSQL is when you’re dealing with high-performance applications that require fast data access, irrespective of the data’s structure. NoSQL databases can provide faster responses because they allow you to work with data in a way that’s more natural to the programming language being used.');

