function sortStr(str) {
    str.sort((a, b) => a.localeCompare(b));
    str.sort((a, b) => a.length - b.length);
    console.log(str);
}

sortStr(['alpha', 'beta', 'gamma']);
sortStr(['Isacc', 'Theodor', 'Jack', 'Harrison', 'George']);
sortStr(['test', 'Deny', 'omen', 'Default']); 
