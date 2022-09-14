const db = require("../models");
const Product = db.products;

// Create and Save a new Product
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({ message: "Body can't be empty" });
        return;
    }

    // Create a Product
    const product = new Product({
        title: req.body.title,

        type: req.body.type ? req.body.type : "gaming", // validate later

        due: req.body.due, // when it's due

        productImage: req.body.productImage,

        description: req.body.description,
       // user: req.body.user ? req.body.user : "root",
        points: req.body.points ? req.body.points : 1,
    });

    // Save Product in the database
    product
        .save(product)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "ERROR creating Product"
            });
        });
};

// find one with id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Product.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "No Product with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "ERROR creating Product with id=" + id });
    });
};
// Retrieve all Products from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

    Product.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "ERROR finding all Products"
            });
        });
};
// update a product by id
exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Body can't be empty"
      });
    }
  
    const id = req.params.id;
  
    Product.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Couldn't update Product with id=${id}.`
          });
        } else res.send({ message: "Product was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "ERROR updating Product with id=" + id
        });
      });
};

// delete product by id
exports.delete = (req, res) => {
const id = req.params.id;

Product.findByIdAndRemove(id)
    .then(data => {
    if (!data) {
        res.status(404).send({
        message: `Couldn't delete Product with id=${id}.`
        });
    } else {
        res.send({
        message: "Product was deleted successfully!"
        });
    }
    })
    .catch(err => {
    res.status(500).send({
        message: "ERROR updating Product with id=" + id
    });
    });
};

// delete all products
exports.deleteAll = (req, res) => {
  Product.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Products were removed successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "ERROR deleting all Products"
      });
    });
};

// find all cursos
exports.findAllCursos = (req, res) => {
  Product.find({ type: 'cursos' })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "ERROR retrieving products."
      });
    });
};

// find all in gaming
exports.findAllInGaming = (req, res) => {
  Product.find({ type: 'gaming' })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "ERROR retrieving products."
      });
    });
};

// find all indumentaria
exports.findAllIndumentaria = (req, res) => {
  Product.find({ type: 'indumentaria' })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "ERROR retrieving products."
      });
    });
};
// add methods to get priorities for each as well