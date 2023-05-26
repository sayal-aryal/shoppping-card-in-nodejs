const Product = require('../model/product');

exports.register = (req, res, next) => {
    const addedProduct = new Product(null, req.body.name, req.body.price, req.body.image_url, req.body.stock).save();
    res.status(201).json(addedProduct);
}

exports.getAll = (req, res, next) => {
    res.status(200).json(Product.getAll());
}

exports.placeOrder = (req, res, next)=>{

        const cart=  req.body.cart;
        let updatedProducts = Product.getAll();
        
        let orderValid = true;
        cart.forEach(cartItem => {
            const name = cartItem.name;
            const stock = cartItem.stock;
            
            const productIndex = updatedProducts.findIndex(product => product.name === name);

            if (productIndex !== -1) {
                if (updatedProducts[productIndex].stock >= stock) {
                    updatedProducts[productIndex].stock -= stock;
                } else {
                    orderValid = false;
                }
            } else {
                orderValid = false;
            }

        });

        if (orderValid) {
            res.status(200).json(updatedProducts);
          } else {
            res.status(400).json({message: "Invalid order"});
          }



        
        // res.status(200).json(Product.placeOrder(cart))
}



