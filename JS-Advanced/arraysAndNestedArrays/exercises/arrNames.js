function arrNames(arr) {

    arr.sort().forEach((el, index) => console.log(`${index + 1}.${el}`));
}

arrNames(["John", "Bob", "Christina", "Ema"]);