import StringBuilder from './stringBuilder.js'
import { assert } from 'chai'

describe("class StringBuilder", ()=>{
    function getArrOfStr(str){
        return Array.from(str);
    }

    it("constructor", ()=>{
        let instance = new StringBuilder('Alex');
        assert.deepEqual(instance._stringArray, getArrOfStr('Alex'));

        let instance2 = new StringBuilder('');
        assert.deepEqual(instance2._stringArray, getArrOfStr(''));
    });

    it("append", ()=>{
        let instance = new StringBuilder('Alex');
        instance.append('Pesho');
        assert.deepEqual(instance._stringArray, getArrOfStr('AlexPesho'));
        instance.append("nik");
        assert.deepEqual(instance._stringArray, getArrOfStr('AlexPeshonik'));
    });

    it("prepend", ()=>{
        let instance = new StringBuilder('Alex');
        instance.prepend('Pesho');
        assert.deepEqual(instance._stringArray, getArrOfStr('PeshoAlex'));
        instance.prepend("nik");
        assert.deepEqual(instance._stringArray, getArrOfStr('nikPeshoAlex'));

    });

    it("insertAt", ()=>{
        let instance = new StringBuilder('Alex');
        instance.insertAt('Pesho', 3);
        assert.deepEqual(instance._stringArray, getArrOfStr('AlePeshox'));
        instance.insertAt("nik", 1);
        assert.deepEqual(instance._stringArray, getArrOfStr('AniklePeshox'));

    });

    it("remove", ()=>{
        let instance = new StringBuilder('Alex');
        instance.remove(3, 10);
        assert.deepEqual(instance._stringArray, getArrOfStr('Ale'));
        instance.remove(1, 2);
        assert.deepEqual(instance._stringArray, getArrOfStr('A'));
    });

    it("_vrfyParam", ()=>{
        let instance = new StringBuilder('Alex');
        assert.doesNotThrow(()=>{instance._vrfyParam});
        assert.throw(()=>{new StringBuilder(4)}, 'Argument must be a string');
    });

    it("toString", ()=>{
        let instance = new StringBuilder('Alex');
        assert.equal(instance.toString(), 'Alex');
    });
});