function cars(arr) {
    const arrOfObjs = [];
    let obj = {
        create(v) {
            arrOfObjs.push({
                name: v
            });
        },
        createInherit(v1, v2) {
            arrOfObjs.push({
                name: v1,
                parent: v2
            });
        },
        color(v1, v2) {
            arrOfObjs.forEach(obj => {
                if (obj.name == v1) {
                    obj.color = v2;
                }
            });
        },
        model(v1, v2) {
            arrOfObjs.forEach(obj => {
                if (obj.name == v1) {
                    obj.model = v2;
                }
            });
        },
        print(v) {
            arrOfObjs.forEach(obj => {
                if (obj.name == v) {
                    let arr = [];
                    if (obj.color != undefined) {
                        arr.push(`color:${obj.color}`);
                    } if (obj.model != undefined) {
                        arr.push(`model:${obj.model}`);

                    } if (obj.parent != undefined) {
                        arrOfObjs.forEach(obj2 => {
                            if (obj2.name == obj.parent) {
                                if (obj2.color != undefined) {
                                    arr.push(`color:${obj2.color}`);
                                } else if (obj2.model != undefined) {
                                    arr.push(`model:${obj2.model}`);
                                }
                            }
                        });
                    }
                    console.log(arr.join(', '));
                }
            });
        }
    }

    arr.forEach(str => {
        let [opper1, value1, opper2, value2] = str.split(' ');

        if (opper1 == 'create') {
            if (opper2 == undefined) {
                obj.create(value1);
            } else {
                obj.createInherit(value1, value2);
            }

        } else if (opper1 == 'set') {
            if (opper2 == 'color') {
                obj.color(value1, value2);
            } else if (opper2 == 'model') {
                obj.model(value1, value2);
            }
        } else {
            obj.print(value1);
        }
    });
}

cars(['create c1',
    'create c2 inherit c1',
    'set c1 color red',
    'set c2 model new',
    'print c1',
    'print c2']
);