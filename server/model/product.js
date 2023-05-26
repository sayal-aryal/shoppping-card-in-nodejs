let db = [];
class Product {
    constructor(name, price, image_url, stock) {
        this.name = name;
        this.price = price;
        this.image = image_url;
        this.stock = stock;
    }

    static getAll() {
        return db;
    }

    save() {
        db.push(this);
        return this;
    }

}

let p1 = new Product("Pen", 20, "./images/pen.jpg", 2);
let p2 = new Product("Pencil", 30, "./images/pencil.jpg", 30);
let p3 = new Product("Mouse", 40, "./images/mouse.jpg", 35);
let p4 = new Product("Monitor", 100, "./images/monitor.jpg", 40);
let p5 = new Product("CPU", 300, "./images/cpu.jpg", 45);

db = [p1, p2, p3, p4, p5];

module.exports = Product;