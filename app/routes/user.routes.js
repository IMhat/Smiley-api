module.exports = app => {
    const users = require("../controllers/user.controller.js");
    // create router
    var router = require("express").Router();

    // Create a new user
    router.post("/", users.create);

    // Retrieve all users
    router.get("/", users.findAll);

    // Retrieve all users Uteam
    router.get("/uteam", users.findAllUteam);

    // Retrieve all users collaborator
    router.get("/collaborator", users.findAllInCollaborator);

    // Retrieve all users admin
    router.get("/admin", users.findAllAdmin);

    // Retrieve a single user with id
    router.get("/:id", users.findOne);

    // Update a user with id
    router.put("/:id", users.update);

    // Delete a user with id
    router.delete("/:id", users.delete);

    // delete all users
    router.delete("/", users.deleteAll); 

    // host at '/api/users'
    app.use('/api/users', router);
};
