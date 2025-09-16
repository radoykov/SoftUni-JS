class Story {
    constructor(title, creator) {
        this.title = title;
        this.creator = creator;
        this._comments = [];
        this._likes = [];

    }
    get likes() {
        if (this._likes.length == 0) {
            return `${this.title} has 0 likes`;
        } else if (this._likes.length == 1) {
            return `${this._likes[0]} likes this story!`;
        } else {
            return `${this._likes[0]} and ${this._likes.length - 1} others like this story!"`;
        }
    }
    like(username) {//[usernames]
        if (this._likes.includes(username)) {
            throw Error("You can't like the same story twice!");
        }
        if (username === this.creator) {
            throw Error("You can't like your own story!");
        }
        this._likes.push(username);
        console.log(`${username} liked ${this.title}!`);
    }
    dislike(username) {
        if (this._likes.includes(username) == false) {
            throw Error("You can't dislike this story!");
        }
        this._likes.splice(this.likes.indexOf(username), 1);
        console.log(`${username} disliked ${this.title}`);
    }
    comment(username, content, id) {//[{id, username, content, [replies:{id, username, content}]}]
        if (id == undefined || this._comments.some(e => e.id == id) == false) {
            this._comments.push({ id: this._comments.length + 1, username, content, replies: [] });

            console.log(`${username} commented on ${this.title}`);
        } else {
            let arrRep = this._comments.find(e => e.id == id).replies;
            arrRep.push({ id: `${id}.${arrRep.length + 1}`, username, content });

            console.log("You replied successfully");
        }
    }
    toString(sortingType) {
        if (sortingType == "asc") {
            this._comments.sort((a, b) => a.id - b.id);
            this._comments.forEach(obj => obj.replies.sort((a, b) => a.id.localeCompare(b.id)));
        }
        else if (sortingType == "desc") {
            this._comments.sort((a, b) => b.id - a.id);
            this._comments.forEach(obj => obj.replies.sort((a, b) => b.id.localeCompare(a.id)));
        } else if (sortingType == "username") {
            this._comments.sort((a, b) => b.username.localeCompare(a.username));
            this._comments.forEach(obj => obj.replies.sort((a, b) => b.username.localeCompare(a.username)));
        }

        let res = `Title: ${this.title}\nCreator: ${this.creator}\nLikes: ${this._likes.length}\nComments:\n`;

        this._comments.forEach(com => {
            res += `-- ${com.id}. ${com.username}: ${com.content}\n`;
            com.replies.forEach(rep => {
                res += `--- ${rep.id}. ${rep.username}: ${rep.content}\n`;
            });
        });

        console.log(res.trim());
    }
}

let art = new Story("My Story", "Anny");
art.like("John");                       //John liked My Story!
console.log(art.likes);                 //John likes this story!
art.dislike("John");                    //John disliked My Story!
console.log(art.likes);                 //My Story has 0 likes
art.comment("Sammy", "Some Content");   //Sammy commented on My Story
art.comment("Ammy", "New Content");     //Ammy commented on My Story
art.comment("Zane", "Reply", 1);        //You replied successfully
art.comment("Jessy", "Nice :)");        //Jessy commented on My Story
art.comment("SAmmy", "Reply@", 1);      //You replied successfully
art.toString('username');
art.like("Zane");
art.toString('desc');