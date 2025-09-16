import PaymentPackage from './PaymentPackage.js'
import { assert } from 'chai'

describe("class PaymentPackage", function () {
    let instance = undefined;
    beforeEach(() => {
        instance = new PaymentPackage('Name', 1000);
    })
    it("constructor", function () {
        assert.equal(instance._name, "Name", '1');
        assert.equal(instance._value, 1000, '2');
        assert.equal(instance._VAT, 20, '3');
        assert.equal(instance._active, true, '4');

    });
    it("name", function () {
        assert.equal(instance.name, "Name", '1');
        instance.name = 'Pesho';
        assert.equal(instance.name, "Pesho", '2');
        assert.throw(() => { instance.name = '' }, 'Name must be a non-empty string');
        assert.throw(() => { instance.name = '' }, 'Name must be a non-empty string');

    });
    it("value", function () {
        assert.equal(instance.value, 1000, '1');
        instance.value = 1200;
        assert.equal(instance.value, 1200, '2');
        assert.throw(() => { instance.value = '1000' }, 'Value must be a non-negative number');
        assert.throw(() => { instance.value = -120 }, 'Value must be a non-negative number');
    });
    it("VAT", function () {
        assert.equal(instance.VAT, 20, '1');
        instance.VAT = 25;
        assert.equal(instance.VAT, 25, '2');
        assert.throw(() => { instance.VAT = '100' }, 'VAT must be a non-negative number');
        assert.throw(() => { instance.VAT = -12 }, 'VAT must be a non-negative number');

    });
    it("active", function () {
        assert.equal(instance.active, true, '1');
        instance.active = false;
        assert.equal(instance.active, false, '2');
        assert.throw(() => { instance.active = 'true' }, 'Active status must be a boolean');

    });
    it("toString", function () {
        function getString(name, value, VAT = 20, active = true) {

            return [
                `Package: ${name}` + (active === false ? ' (inactive)' : ''),
                `- Value (excl. VAT): ${value}`,
                `- Value (VAT ${VAT}%): ${value * (1 + VAT / 100)}`
            ].join('\n');

        }

        assert.equal(instance.toString(), getString("Name", 1000));

        instance.name = 'Pesho'
        assert.equal(instance.toString(), getString("Pesho", 1000));
        instance.value = 2500;
        assert.equal(instance.toString(), getString("Pesho", 2500));
        instance.VAT = 25;
        assert.equal(instance.toString(), getString("Pesho", 2500, 25));
        instance.active = false;
        assert.equal(instance.toString(), getString("Pesho", 2500, 25, false));

    });
});