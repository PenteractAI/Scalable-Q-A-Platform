export class Answer {
    constructor({
        id = null,
        questionId: questionId = null,
        userUuid = '',
        content = '',
        creationTime = new Date(),
        upvoteCount = 0,
        lastUpvoteTime = null,
        userHasUpvoted = false
    }) {
        this.id = id;
        this.questionId = questionId;
        this.userUuid = userUuid;
        this.content = content;
        this.creationTime = creationTime;
        this.upvoteCount = upvoteCount;
        this.lastUpvoteTime = lastUpvoteTime || creationTime;
        this.userHasUpvoted = userHasUpvoted;
    }

    validate() {
        if(!this.content || this.content.trim() === '') {
            throw new Error('The content field cannot be empty.');
        }
    }
}