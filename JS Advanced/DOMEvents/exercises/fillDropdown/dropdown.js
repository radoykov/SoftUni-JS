function addItem() {

    document.querySelector('input[type=button]').addEventListener('click', onClick);
    
    function onClick(ev){
        
        if(ev.target.tagName == 'INPUT' && ev.target.type == 'button'){
            const text = document.getElementById('newItemText').value;
            const value = Number(document.getElementById('newItemValue').value);

            let option = document.createElement('option');
            option.textContent = text;
            option.value = value;
            document.getElementById('menu').appendChild(option);

            document.getElementById('newItemText').value = '';
            document.getElementById('newItemValue').value = '';
        }
    }
}