function toggle(){
    const button = document.getElementsByClassName("button")[0];
    const text = document.getElementById("extra");

    if(text.style.display === 'none'){
        text.style.display ='block';
        button.textContent = 'Less'
    } else{
        text.style.display ='none';
        button.textContent = 'More'
    }
}