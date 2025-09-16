function validate() {
    const input = document.querySelector("input");

    input.addEventListener('change', validateEmail);

    function validateEmail() {
        const emailPattern = /^[a-z]+@[a-z]+\.[a-z]+$/;

        if (!emailPattern.test(input.value)) {
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    }
}