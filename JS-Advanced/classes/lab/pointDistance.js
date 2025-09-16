class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    static distance = (p1, p2) => (Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2));
    // static distance(p1, p2){
    //     //d=√((x_2-x_1)²+(y_2-y_1)²)

    //     return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
    // }
};

let p1 = new Point(5, 5);
let p2 = new Point(9, 8);
console.log(Point.distance(p1, p2));//5
