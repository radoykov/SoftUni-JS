function createExtensibleObject() {
    return {
        extend(template) {
            for (const key in template) {
                if (typeof template[key] === 'function') {

                    Object.getPrototypeOf(this)[key] = template[key];
                } else {

                    this[key] = template[key];
                }
            }
        }
    };
}

const myObj = createExtensibleObject();
const template = {
    extensionMethod: function () {
        console.log('I am an extension method!');
    },
    extensionProperty: 'someString',
};

myObj.extend(template);

console.log(myObj.extensionProperty); // Outputs: "someString"
myObj.__proto__.extensionMethod(); // Outputs: "I am an extension method!"