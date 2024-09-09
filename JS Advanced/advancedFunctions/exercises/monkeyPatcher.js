function solution(args) {
    if (args == 'upvote') {
        post.upvotes++;
    } else if (args == 'downvote') {
        post.downvotes++;
    } else {
        let up, down, sub, str, magicNumber;

        sub = post.upvotes - post.downvotes;

        if (post.upvotes + post.downvotes < 50) {
            up = post.upvotes;
            down = post.downvotes;
        } else {
            magicNumber = Math.ceil(0.25 * (Math.max(post.upvotes, post.downvotes)));
            up = post.upvotes + magicNumber;
            down = post.downvotes + magicNumber;
        }

         if (up > (up + down) * 0.66) { str = 'hot' }
        else if(sub >= 0 &&( up >100 || down > 100)){str = 'controversial'}
        else if(sub < 0){str = 'unpopular'}
        else if(up + down < 10){str = 'new'}

        return [up, down, sub, str];

    }
}

let post = {
    id: '3',
    author: 'emil',
    content: 'wazaaaaa',
    upvotes: 100,
    downvotes: 100
};
solution.call(post, 'upvote');
solution.call(post, 'downvote');
let score = solution.call(post, 'score');
console.log(score);      // [127, 127, 0, 'controversial']
solution.call(post, 'downvote');
solution.call(post, 'downvote');
solution.call(post, 'downvote');
solution.call(post, 'downvote');
solution.call(post, 'downvote');
solution.call(post, 'downvote');
solution.call(post, 'downvote');
solution.call(post, 'downvote');
solution.call(post, 'downvote');
solution.call(post, 'downvote');
solution.call(post, 'downvote');
solution.call(post, 'downvote');
solution.call(post, 'downvote');
solution.call(post, 'downvote');
solution.call(post, 'downvote');
solution.call(post, 'downvote');
solution.call(post, 'downvote');
solution.call(post, 'downvote');
solution.call(post, 'downvote');
solution.call(post, 'downvote');
solution.call(post, 'downvote');
solution.call(post, 'downvote');
solution.call(post, 'downvote');
solution.call(post, 'downvote');
solution.call(post, 'downvote');
solution.call(post, 'downvote');
solution.call(post, 'downvote');
solution.call(post, 'downvote');
solution.call(post, 'downvote');
solution.call(post, 'downvote');
solution.call(post, 'downvote');
solution.call(post, 'downvote');
solution.call(post, 'downvote');
solution.call(post, 'downvote');
solution.call(post, 'downvote');
solution.call(post, 'downvote');
solution.call(post, 'downvote');
solution.call(post, 'downvote');
solution.call(post, 'downvote');
solution.call(post, 'downvote');
solution.call(post, 'downvote');
solution.call(post, 'downvote');
solution.call(post, 'downvote');
solution.call(post, 'downvote');
solution.call(post, 'downvote');
solution.call(post, 'downvote');
solution.call(post, 'downvote');
solution.call(post, 'downvote');
solution.call(post, 'downvote');
solution.call(post, 'downvote');

score = solution.call(post, 'score');     // [139, 189, -50, 'unpopular']
console.log(score)
