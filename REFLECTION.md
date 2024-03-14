# Brief description of the application
The application is a scalable online question and answer platform. Users are allowed to select courses and post questions and answers,
upvote them, through an anonymous environment. The platform is built with a focus on scalability, using Facebook's OPT-125M
to generate answers to questions. The application include all the basic and merit functionalities asked. Content is sorted by 
its recency, retrieved through a infinite scroll mechanism, and updated in real-time (not for upvoting). The application is deployed using Docker compose configurations and
Kubernetes configurations. Monitoring is possible with Prometheus and Grafana, and TailwindCSS is used for styling.


# Key design decisions
First, I tried to introduce a more formal files structure to the qa-api service by implementing repositories, routes, 
services, utils, models and handlers. As the application needs a certain amount of logic to implement, it was necessary 
to keep a clean structure, allowing it to grow smoothly.

Here are the description of my folder structure:
- app.js is the entrypoint of the service. It acts as a router and redirect the request to the appropriate services, depending on their routes.
- "routes": organizes the different routes defined for the API.
- "handlers": Handlers are methods managing the requests. Their role is to extract the necessary data from the request and send them to services. They also build responses and manage WebSocket connection.
- "services": Contain the logic of the application and operate as a bridge between handlers and the data access layer.
- "models": Represents the data structures of the entities used in the application. They incorporate validation functions.
- "repositories": Repositories implement the data access layer and abstract the interaction with the data source.
- "utils": Utility functions used in qa-api.

The application shows available courses. When the user selects a course, the course page opens and shows a list of questions,
with the possibility to upvote them, select them or create a new question.

Questions (and answers) are listed by their recency and limited to 20. If the user scrolls down, the application will send a request
to retrieve the following posts; implementing an infinite scroll functionality.

When a user upvote a question, the application saves the user entry in the database in order to avoid the user to upvote twice
the same post.

In order to limit the user to one question and answer per minute, I decided to store an entry in Redis when the user publish a new post, with a TTL of 1 minute.
If the user wants to create a new post, then the application checks in Redis if there is already an entry for the corresponding using and post type.
If an entry is found, an error message is sent to the user and nothing happens. Otherwise, the algorithm continues.

Thus, when a user publish a new question or answer, the UI needs to be updated automatically; WebSockets are used to manage this functionality.
When the user opens the page listing questions or answers, a WebSocket is opened with the qa-api. When a user creates a new post, a message is published 
on Redis containing the information about the new post. On WebSocket connection opening, the application subscribes to Redis and listen for new post.
If the application detects a new post, it retrieves the information and send them to the view, which add the received post at the top of its
corresponding list.

When a question is created by a user, the application sends a request asynchronously to the LLM API. This API generates 3 answers
and add them to the Redis pub/sub pattern. They are retrieved as any post from Redis.

Finally, there is a production and development configuration using Docker, and configurations files implementing Kubernetes, Prometheus and Grafana.

# Possible improvements

## Performance improvements
- Refactor certain portion of the code for better performances and readability; find bottlenecks
- Improve the caching and scaling of the application
- Improve the starting phase of the application, which takes time

## UX improvements
- Make the website responsive for any devices and ensure its accessibility to anyone
- Improve the feedbacks (UX aspect) by implementing more animations, sounds and details
- Replace course IDs and question IDs by slugs in the URL

## Functionalities
- Implement the entire CRUD process for courses, questions and answers.
- Allows the user to answer to other answers (this can be done by merge questions and answers as "posts" in the database)
- Accounts for users

## Test
-  Test more deeply the different part of the application with more specific tests and mocks