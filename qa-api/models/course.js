export class Course {
    constructor({
        id = null,
        title = '',
        description = ''
    }) {
        this.id = id;
        this.title = title;
        this.description = description;
    }
}