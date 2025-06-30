import { expect } from 'chai'
import Repository from "./repo.js";

describe("Repo", function () {
    // Initialize props object
    let properties = {
        name: "string",
        age: "number",
        birthday: "object"
    };
    //Initialize the repository
    let repository = new Repository(properties);

    it("add", function () {
        let entity = {
            name: "Pesho",
            age: 22,
            birthday: new Date(1998, 0, 7)
        };
        expect(repository.add(entity)).to.be.equal(0);
        expect(repository.add(entity)).to.be.equal(1);
    });
    it ("get count", () => {
        expect(repository.count).to.be.equal(2);
    });
    it ("get id", () => {
        expect(repository.getId(1)).to.be.deep.equal({ "name": "Pesho", "age": 22, "birthday":  new Date("1998-01-06T22:00:00.000Z")});
        expect(() => { repository.getId(5).to.throw("Entity with id: 5 does not exist!") });
    });
    it ("update", () => {
        let entity = {
            name: 'Gosho',
            age: 22,
            birthday: new Date(1998, 0, 7)
        };
        repository.update(1, entity);
        expect(repository.getId(1)).to.be.deep.equal({ "name": "Gosho", "age": 22, "birthday":  new Date("1998-01-06T22:00:00.000Z")});

        expect(() => { repository.update(5, entity).to.throw("Entity with id: 5 does not exist!") });
    });
    it("del", () => {
        repository.del(0);
        expect(repository.count).to.be.equal(1);

        expect(() => { repository.del(5).to.throw("Entity with id: 5 does not exist!") });
    });
    it("should throw error 1", () => {
        let anotherEntity = {
            name1: 'Stamat',
            age: 29,
            birthday: new Date(1991, 0, 21)
        };
        expect(() => { repository.add(anotherEntity).to.throw });
    });
    it("should throw error 2", () => {

        let anotherEntity = {
            name: 'Stamat',
            age: 29,
            birthday: 1991
        };
        expect(() => { repository.add(anotherEntity).to.throw });
    });

});
