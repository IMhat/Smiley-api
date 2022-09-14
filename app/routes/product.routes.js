module.exports = app => {
    const products = require("../controllers/product.controller.js");
    // create router
    var router2 = require("express").Router();

    // Create a new product
    router2.post("/", products.create);

    // Retrieve all products
    router2.get("/", products.findAll);

    // Retrieve all products cursos
    router2.get("/cursos", products.findAllCursos);

    // Retrieve all products in gaming
    router2.get("/gaming", products.findAllInGaming);

    // Retrieve all products indumentaria
    router2.get("/indumentaria", products.findAllIndumentaria);

    // Retrieve a single product with id
    router2.get("/:id", products.findOne);

    // Update a produt with id
    router2.put("/:id", products.update);

    // Delete a product with id
    router2.delete("/:id", products.delete);

    // delete all products
    router2.delete("/", products.deleteAll); 

    // host at '/api/products'
    app.use('/api/products', router2);
};

