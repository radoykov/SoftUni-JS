function argInfo(str, num, fun) {
    let strc = 0, numc = 0, func = 0;
    if (str != undefined) {
        console.log(`string: ${str}`);
        strc++;
    }
    if (num != undefined) {
        console.log(`number: ${num}`);
        numc++;
    }
    if (fun != undefined) {
        console.log(`function: ${fun}`);
        func++;
    }
    if (strc != 0) {
        console.log(`string = ${Number(strc)}`);
    }
    if (numc != 0) {
        console.log(`number = ${Number(numc)}`);
    }
    if (func != 0) {
        console.log(`function = ${Number(func)}`);
    }

}

argInfo('cat', 42, function () { console.log('Hello world!'); });