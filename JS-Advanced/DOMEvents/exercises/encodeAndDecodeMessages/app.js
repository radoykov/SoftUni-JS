function encodeAndDecodeMessages() {
    const [encode, decode] = document.querySelectorAll('button');
    const [firstText, secondText] = document.querySelectorAll('textarea');


    encode.addEventListener('click', toEncode);
    decode.addEventListener('click', toDecode);


    function toEncode() {
        const encodedText = [...firstText.value].map(char => String.fromCharCode(char.charCodeAt(0) + 1));
        firstText.value = '';
        secondText.value = encodedText.join('');
    }

    function toDecode() {
        const decodedText = [...secondText.value].map(char => String.fromCharCode(char.charCodeAt(0) - 1));
        secondText.value = decodedText.join('');
    }
}