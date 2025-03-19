class Post {
    constructor(title, content) {
        this.title = title;
        this.content = content;
    }

    toString() {
        return `Post: ${this.title}\nContent: ${this.content}\n`;
    }
}

class SocialMediaPost extends Post {
    constructor(title, content, likes, dislikes) {
        super(title, content);
        this.likes = likes;
        this.dislikes = dislikes;
        this.comments = [];
    }

    addComment(comment) {
        this.comments.push(comment);
    }

    toString() {
        let result = super.toString() + `\nRating: ${this.likes - this.dislikes}\n`;

        if (this.comments.length > 0) {
            let temp = '';
            for (let i = 0; i < this.comments.length; i++) {
                temp += ' * ' + this.comments[i] + '\n';
            }

            result += temp;
        }

        return result;
    }
}

class BlogPost extends Post {
    constructor(title, content, views) {
        super(title, content);
        this.views = views;
    }

    addComment(comment) {
        this.comments.push(comment);
    }

    view() {
        this.views++;
        return this;
    }

    toString() {
        return super.toString() + `Views: ${this.views}\n`;
    }
}

let post = new Post("Post", "Content");

console.log(post.toString());

// Post: Post
// Content: Content

let scm = new SocialMediaPost("TestTitle", "TestContent", 25, 30);

scm.addComment("Good post");
scm.addComment("Very good post");
scm.addComment("Wow!");

console.log(scm.toString());

let bp = new BlogPost('Science', 'About it', 0);
console.log(bp.view());

// Post: TestTitle
// Content: TestContent
// Rating: -5
// Comments:
//  * Good post
//  * Very good post
//  * Wow!
