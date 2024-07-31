function attachGradientEvents() {
    document.getElementById('gradient').addEventListener('mousemove', onMove);
    const output = document.getElementById('result');

    function onMove(ev) {
        const offsetX = ev.offsetX;
        const percent = Math.round(offsetX / ev.target.clientWidth * 100);

        output.textContent = `${percent}%`;
    }
}
