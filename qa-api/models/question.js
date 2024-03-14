import * as questionService from "../services/questionService.js";

export class Question {
    constructor({
        id = null,
        courseId = null,
        userUuid = null,
        title = null,
        content = null,
        creationTime = new Date(),
        upvoteCount = 0,
        lastUpvoteTime = null,
        userHasUpvoted = false
    }) {
        this.id = id;
        this.courseId = courseId;
        this.userUuid = userUuid;
        this.title = title;
        this.content = content;
        this.creationTime = creationTime;
        this.upvoteCount = upvoteCount;
        this.lastUpvoteTime = lastUpvoteTime || creationTime;
        this.userHasUpvoted = userHasUpvoted;
    }

    validate() {
        const MAX_TITLE_LENGTH = 100;

        if(!this.title || this.title.trim() === '') {
            throw new Error('The title field cannot be empty.');
        }

        if(this.title.length > MAX_TITLE_LENGTH) {
            throw new Error('The title field cannot exceed 200 characters.');
        }

        if(!this.content || this.content.trim() === '') {
            throw new Error('The content field cannot be empty.');
        }
    }
}