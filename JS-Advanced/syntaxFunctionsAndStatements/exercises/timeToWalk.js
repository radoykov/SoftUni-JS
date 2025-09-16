function timeToWalk(steps, footprint, speedKMh) {
    let speed = speedKMh / 3.6;
    let way = steps * footprint;

    let rest = Math.floor(way / 500) * 60;
    let time = (way / speed) + rest;

    let hours = Math.floor(time / 60 / 60).toFixed(0).padStart(2, "0");
    let min = Math.floor((time - hours * 3600) / 60).toFixed(0).padStart(2, "0");;
    let sec = Math.Ceiling(time - hours * 60 * 60 - min * 60).toFixed(0).padStart(2, "0");;

    return `${hours}:${min}:${sec}`;
}
console.log(timeToWalk(4000, 0.60, 5));
console.log(timeToWalk(2564, 0.70, 5.5));