module.exports = app => {
    const tasks = require("../controllers/task.controller.js");
    // create router
    var router = require("express").Router();

    // Create a new task
    router.post("/", tasks.create);

    // Retrieve all tasks
    router.get("/", tasks.findAll);

    // Retrieve all tasks backlog
    router.get("/backlog", tasks.findAllBacklog);

    // Retrieve all tasks backlog
    router.get("/backlog/search", tasks.findUserBacklog);

    // Retrieve all tasks to do
    router.get("/todo", tasks.findAllToDo);

    // Retrieve user tasks to do
    router.get("/todo/search", tasks.findUserToDo);

    // Retrieve all tasks in progress
    router.get("/inprogress", tasks.findAllInProgress);

    // Retrieve user tasks in progress
    router.get("/inprogress/search", tasks.findUserInProgress);

    // Retrieve all tasks done
    router.get("/done", tasks.findAllDone);

    // Retrieve user tasks done
    router.get("/done/search", tasks.findUserDone);

    // Retrieve all tasks Approved
    router.get("/approved", tasks.findAllApproved);

    // Retrieve user tasks Approved
    router.get("/approved/search", tasks.findUserApproved);


    // Retrieve a single task with id
    router.get("/:id", tasks.findOne);

    // Update a task with id
    router.put("/:id", tasks.update);


    // Update a task with id
    router.put("/:id/completeByAdmin", tasks.completeByAdmin);


    // Delete a task with id
    router.delete("/:id", tasks.delete);

    // delete all tasks
    router.delete("/", tasks.deleteAll); 

    // host at '/api/tasks'
    app.use('/api/tasks', router);
};
