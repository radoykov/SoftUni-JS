class Rectangle {
    constructor(width, height, color) {
        this.width = width;
        this.height = height;
        this.color = color.charAt(0).toUpperCase() + color.slice(1);
    }

    calcArea(){
        return this.width * this.height;
    }
};

let rect = new Rectangle(4, 5, 'red');
console.log(rect.width); //4
console.log(rect.height);//5
console.log(rect.color);//Red
console.log(rect.calcArea()); //20