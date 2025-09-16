const box = document.querySelector('#errorBox');

export function notify(message){
    box.innerHTML = `<span>${message}</span>`;
    box.style.display = 'inline-block';
    setTimeout(() => {
    box.style.display = 'none';
    }, 3000)
}