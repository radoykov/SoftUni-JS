function solution() {
    const stock = {
        protein: 0,
        carbohydrate: 0,
        fat: 0,
        flavour: 0
    };
    const map = {
        apple: function () {
            if (stock.carbohydrate >= 1 && stock.flavour >= 2) {
                stock.carbohydrate -= 1;
                stock.flavour -= 2;
                return `Success`;

            } else {
                return `Error: not enough ${stock.carbohydrate - 1 < 0 ? 'carbohydrate' : 'flavour'} in stock`;
            }
        },
        lemonade: function () {
            if (stock.carbohydrate >= 10 && stock.flavour >= 20) {
                stock.carbohydrate -= 10;
                stock.flavour -= 20;
                return `Success`;


            } else {
                return `Error: not enough ${stock.carbohydrate - 10 < 0 ? 'carbohydrate' : 'flavour'} in stock`;
            }
        },
        burger: function () {
            if (stock.carbohydrate >= 5 && stock.fat >= 7 && stock.flavour >= 3) {
                stock.carbohydrate -= 5;
                stock.fat -= 7;
                stock.flavour -= 3;
                return `Success`;


            } else {

                return `Error: not enough ${stock.carbohydrate - 10 < 0 ? 'carbohydrate' : stock.fat - 7 < 0 ? 'fat' : 'flavour'} in stock`;
            }
        },
        eggs: function () {
            if (stock.protein >= 5 && stock.fat >= 1 && stock.flavour >= 1) {
                stock.protein -= 5;
                stock.fat -= 1;
                stock.flavour -= 1;
                return `Success`;


            } else {
                return `Error: not enough ${stock.protein - 5 < 0 ? 'protein' : stock.fat - 1 < 0 ? 'fat' : 'flavour'} in stock`;
            }
        },
        turkey: function () {
            if (stock.protein >= 10 && stock.carbohydrate >= 10 && stock.fat >= 10 && stock.flavour >= 10) {
                stock.protein -= 10;
                stock.carbohydrate -= 10;
                stock.fat -= 10;
                stock.flavour -= 10;
                return `Success`;


            } else {
                return `Error: not enough ${stock.protein - 10 < 0 ? 'protein' : stock.carbohydrate - 10 < 0 ? 'carbohydrate' :  stock.fat - 10 < 0 ? 'fat' : 'flavour'} in stock`;
            }
        }
    };

    function robot(str) {
        let [command, name, quantity] = str.split(' ');
        quantity = Number(quantity);

        if (name == undefined) {
            console.log(`protein=${stock.protein} carbohydrate=${stock.carbohydrate} fat=${stock.fat} flavour=${stock.flavour}`);
        } else if (command == 'restock') {
            stock[name] = quantity;
            console.log('Success');
        } else {
            let res;
            let flag = 1;
            for (let i = 0; i < quantity; i++) {
                res = map[name]();
                if (res != 'Success') {
                    console.log(res);
                    flag = 0;
                    break;
                }
            }
            if (flag == 1) {
                console.log('Success');
            }
        }
    }
    return robot.bind(solution);
}

let manager = solution();
manager("restock flavour 50");  // Success
manager("prepare lemonade 4");  // Error: not enough carbohydrate in stock
manager("restock carbohydrate 10");  // Success
manager("restock flavour 10");  // Success
manager("prepare apple 1");  // Success
manager("restock fat 10");  // Success
manager("prepare burger 1");  // Success
manager("report"); //   protein=0 carbohydrate=4 fat=3 flavour=5

manager("prepare turkey 1");    //Error: not enough protein in stock
manager("restock protein 10");  //Success
manager("prepare turkey 1");    //Error: not enough carbohydrate in stock
manager("restock carbohydrate 10"); //Success
manager("prepare turkey 1");    //Error: not enough fat in stock
manager("restock fat 10");  //Success
manager("prepare turkey 1");    //Error: not enough flavour in stock
manager("restock flavour 10");  //Success
manager("prepare turkey 1");    //Success
manager("report");  //protein=0 carbohydrate=0 fat=0 flavour=0
