let db = [];
class User {
    constructor(name, password) {
        this.name = name;
        this.password = password;
    }

    static getAll() {
        return db;
    }

    save() {
        db.push(this);
        return this;
    }
}

let u1 = new User("sayal","sayal123");
let u2 = new User("john","john123");
let u3 = new User("Muse","muse123");


db = [u1, u2, u3];

module.exports = User;