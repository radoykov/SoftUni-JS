function rectangle(width, height, color) {
    const object = {
        width,
        height,
        color,
        calcArea(){
            return this.width * this.height;Ф
        }
    };

    return object;
}

let rect = rectangle(4, 5, 'red');
console.log(rect.width);
console.log(rect.height);
console.log(rect.color);
console.log(rect.calcArea());
