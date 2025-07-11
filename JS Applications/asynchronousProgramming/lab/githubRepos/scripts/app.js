async function loadRepos() {

	let username = document.querySelector('input#username').value;
	try {
		let url = `https://api.github.com/users/${username}/repos`;

		let response = await fetch(url);
		if(response.status != 200){
			console.log(`status : ${response.status}`);
		}
		let data = await response.json();
		let ul = document.querySelector("ul#repos");
		ul.innerHTML = "";
		data.forEach(r => {
			ul.appendChild(e('li', {}, e('a', { href: `https://api.github.com/users/${username}/repos/${r.full_name}`, textContent: r.full_name })));

		});
	} catch (err) {
		console.log("My error!");
		console.log(err);
	}


}
function e(type, attributes = {}, ...content) {
	const result = document.createElement(type);

	for (let attr in attributes) {
		if (attr.substring(0, 2) == 'on') {
			result.addEventListener(attr.substring(2).toLowerCase(), attributes[attr]);
		} else {
			result[attr] = attributes[attr];
		}
	}

	content.forEach(e => {
		if (typeof e == 'string' || typeof e == 'number') {
			const node = document.createTextNode(e);
			result.appendChild(node);
		} else {
			result.appendChild(e);
		}
	});

	return result;
}