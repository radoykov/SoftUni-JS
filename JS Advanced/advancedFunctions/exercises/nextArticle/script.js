function getArticleGenerator(articles) {
    
    function fun2() {
        let res = document.getElementById('content');
        artical = document.createElement('article');
        artical.textContent = articles.shift();
        res.appendChild(artical);
    }

    return fun2.bind(getArticleGenerator);
}
