function solve() {

    const searchText = document.getElementById('searchField').value;
    let button = document.getElementById('searchBtn');

    const tableCells = Array.from(document.querySelectorAll("tbody tr td"));
    //clean
    
    for(let i = 0; i< tableCells.length; i++){
        tableCells[i].parentElement.style.backgroundColor = 'grey';
    }
    
    for (let i = 0; i < tableCells.length; i++) {
        let a = tableCells[i].textContent.toLowerCase();
        if(a.indexOf(searchText) >= 0){
            tableCells[i].parentElement.style.backgroundColor = 'yellow';
        }
    }
    
    searchText.textContent =  '';
}