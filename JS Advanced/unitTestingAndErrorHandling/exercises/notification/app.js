function notify(message) {
    const div = document.querySelector("div#notification");

    div.textContent = message;

    div.style.display = 'block';
    
  }