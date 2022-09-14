module.exports = app => {
    const points = require("../controllers/wallet.controller.js");
    // create router
    var router = require("express").Router();

    // Create a new point
    router.post("/", points.create);

    // Retrieve all points
    router.get("/", points.findAll);

    // Retrieve all points name
    router.get("/:name", points.findName);

    // Retrieve all points email
    router.get("/:email", points.findEmail);

    // Retrieve all points phone
    router.get("/:phone", points.findPhone);


    // Retrieve a single point with id
    router.get("/:id", points.findOne);

    // Update a point with id
    router.put("/:id", points.update);

    // Delete a point with id
    router.delete("/:id", points.delete);

    // delete all points
    router.delete("/", points.deleteAll); 

    // host at '/api/products'
    app.use('/api/points', router);
};