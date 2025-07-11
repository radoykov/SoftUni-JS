function loadRepos() {
   let res = "";

   fetch('https://api.github.com/users/testnakov/repos')
      .then(response => response.json())
      .then(data => document.querySelector("div#res").textContent = JSON.stringify(data))
      .catch(err => console.log(err));
}