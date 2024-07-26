function search() {
    const searchText = document.getElementById("searchText").value;
    const result = document.getElementById("result");
    const towns = [...document.querySelectorAll('ul#towns li')];

    let count = 0;
    for(let i = 0; i<towns.length; i++){
        let town = towns[i].textContent;
        if( town.indexOf(searchText) >= 0){
            count++;
            towns[i].innerHTML = `<bold><u>${town}</u></bold>`;
        }
    }
    result.textContent = `${count} matches found`


}