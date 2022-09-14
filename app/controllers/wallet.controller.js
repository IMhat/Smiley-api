const db = require("../models");
const Point = db.points;

// Create and Save a new Point
exports.create = (req, res) => {
    // Validate request
    if (!req.body.email) {
        res.status(400).send({ message: "Body can't be empty" });
        return;
    }

    // Create a point
    const point = new Point({

        name: req.body.name,

        email: req.body.email,
        phone: req.body.phone,
        type: req.body.type ? req.body.type : "collaborator", // validate later

        due: req.body.due, // when it's due
        description: req.body.description,
        points: req.body.points ? req.body.points : 1,

       

        //description: req.body.description,
       // user: req.body.user ? req.body.user : "root",
        //points: req.body.points ? req.body.points : 1,
    });

    // Save point in the database
    point
        .save(point)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "ERROR creating Póint"
            });
        });
};

// find one with id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Point.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "No Point with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "ERROR creating point with id=" + id });
    });
};
// Retrieve all points from the database.
exports.findAll = (req, res) => {
    const email = req.query.email;
    var condition = email ? { email: { $regex: new RegExp(email), $options: "i" } } : {};

    Point.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "ERROR finding all Points"
            });
        });
};
// update a point by id
exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Body can't be empty"
      });
    }
  
    const id = req.params.id;
  
    Point.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Couldn't update Point with id=${id}.`
          });
        } else res.send({ message: "Point was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "ERROR updating Point with id=" + id
        });
      });
};

// delete point by id
exports.delete = (req, res) => {
const id = req.params.id;

Point.findByIdAndRemove(id)
    .then(data => {
    if (!data) {
        res.status(404).send({
        message: `Couldn't delete Point with id=${id}.`
        });
    } else {
        res.send({
        message: "Point was deleted successfully!"
        });
    }
    })
    .catch(err => {
    res.status(500).send({
        message: "ERROR updating Point with id=" + id
    });
    });
};

// delete all points
exports.deleteAll = (req, res) => {
  Point.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Points were removed successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "ERROR deleting all Points"
      });
    });
};


// find  with email
exports.findEmail = (req, res) => {
    const email = req.params.email;
  
    Point.findByEmail(email)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "No Point with email " + email });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "ERROR creating point with email=" + email });
      });
  };
// find  with name
exports.findName = (req, res) => {
    const name = req.params.name;
  
    Point.findByName(name)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "No Point with name " + name });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "ERROR creating point with name=" + name });
      });
  };
// find  with phone
exports.findPhone = (req, res) => {
    const phone= req.params.phone;
  
    Point.findByPhone(phone)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "No Point with phone " + phone });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "ERROR creating point with phone=" + phone });
      });
  };




// add methods to get priorities for each as well