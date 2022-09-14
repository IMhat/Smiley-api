const db = require("../models");
const User = db.users;

// Create and Save a new User
exports.create = (req, res) => {
    // Validate request
    if (!req.body.email) {
        res.status(400).send({ message: "Body can't be empty" });
        return;
    }

    // Create a user
    const user = new User({

        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        type: req.body.type ? req.body.type : "collaborator", // validate later
        userImage: req.body.userImage,
        due: req.body.due, // when it's due
        points: req.body.points ? req.body.points : 1,

       

        //description: req.body.description,
       // user: req.body.user ? req.body.user : "root",
        //points: req.body.points ? req.body.points : 1,
    });

    // Save User in the database
    user
        .save(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "ERROR creating User"
            });
        });
};

// find one with id
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "No User with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "ERROR creating Product with id=" + id });
    });
};
// Retrieve all users from the database.
exports.findAll = (req, res) => {
    const email = req.query.email;
    var condition = email ? { email: { $regex: new RegExp(email), $options: "i" } } : {};

    User.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "ERROR finding all Users"
            });
        });
};
// update a user by id
exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Body can't be empty"
      });
    }
  
    const id = req.params.id;
  
    User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Couldn't update User with id=${id}.`
          });
        } else res.send({ message: "User was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "ERROR updating User with id=" + id
        });
      });
};

// delete user by id
exports.delete = (req, res) => {
const id = req.params.id;

User.findByIdAndRemove(id)
    .then(data => {
    if (!data) {
        res.status(404).send({
        message: `Couldn't delete User with id=${id}.`
        });
    } else {
        res.send({
        message: "User was deleted successfully!"
        });
    }
    })
    .catch(err => {
    res.status(500).send({
        message: "ERROR updating User with id=" + id
    });
    });
};

// delete all users
exports.deleteAll = (req, res) => {
  User.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Users were removed successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "ERROR deleting all users"
      });
    });
};

// find all Uteam
exports.findAllUteam = (req, res) => {
  User.find({ type: 'uteam' })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "ERROR retrieving users."
      });
    });
};

// find all in collaborator
exports.findAllInCollaborator = (req, res) => {
  User.find({ type: 'collaborator' })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "ERROR retrieving users."
      });
    });
};

// find all admin
exports.findAllAdmin = (req, res) => {
  User.find({ type: 'admin' })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "ERROR retrieving users."
      });
    });
};
// add methods to get priorities for each as well