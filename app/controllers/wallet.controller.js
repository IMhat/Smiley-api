// controllers/wallets.js
// const db = require("../models");
// const Wallets = db.wallet;
const Wallets = require('../models/wallet.model');

const createWallet = async (req, res) => {
    try{
        const {username}= req.body;

        const walletExists = await Wallets.findOne({username});
        if (walletExists){
            return res.status(409).json({
                status: false,
                message: 'Wallet already exists',
            })
        }

        const result = await Wallets.create({username});
        console.log(result)
        return res.status(201).json({
            status: true,
            message: 'Wallets created successfully',
            data: result
        })
    } catch (err) {
        return res.status(500).json({
            status: true,
            message: `Unable to create wallet. Please try again. \n Error: ${err}`
        })
    }
}

const findAll = (req, res) => {
    const username = req.query.username;
    // var condition = toUsername ? { toUsername: { $regex: new RegExp(toUsername), $options: "i" } } : {};

    Wallets.find(username)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "ERROR finding all wallets"
            });
        });
};

// const findOne = (req, res) => {
//     var username = req.params.username;
//     var user = req.query.username

//     var condition = username = user;

//      Wallets.findOne(condition)
//      .then(data => {
//         if (!data)
//           res.status(404).send({ message: "No Task with id " + username });
//         else res.send(data);
//       })
//       .catch(err => {
//         res
//           .status(500)
//           .send({ message: "ERROR creating Task with id=" + username});
//       });
     

// }


// const findUserWallet = (req, res) => {

//     const username = req.params.username;

//     Wallets.find({ username: `${username}` })
//       .then(data => {
//         res.send(data);
//       })
//       .catch(err => {
//         res.status(500).send({
//           message:
//             err.message || "ERROR retrieving tasks."
//         });
//       });
//   };


  // const findOne = (req, res) => {
  //   const username = req.query;
  
  //   Wallets.find({ username: `${username}` })
  //     .then(data => {
  //       if (!data)
  //         res.status(404).send({ message: "No Task with id " + username });
  //       else res.send(data);
  //     })
  //     .catch(err => {
  //       res
  //         .status(500)
  //         .send({ message: "ERROR creating Task with id=" + username });
  //     });
  // };






    // const getUserBySearch = async (req, res) => {
    //     // tried req.query and req.query.search
    // const { searchQuery } = req.query;
    // try {
    // // make the search query not case sensitive
    // const user = new RegExp(searchQuery, `i`);

    // //find the user's name using the name field
    // const userFound = await Wallets.find({username: user})
    // res.json({data: userFound})

    // } catch (error) {
    // res.status(404).json({message: error.message})
    // }
    // }

    const getUserBySearch = async (req, res) => {
        // tried req.query and req.query.search
    const { searchQuery } = req.query;

    // make the search query not case sensitive
    const user = new RegExp(searchQuery, `i`);

    //find the user's name using the name field
    await Wallets.find({username: user})
      .then(data => {
        res.send(data);
     })
     .catch(err => {
      res.status(500).send({
          message:
              err.message || `ERROR finding wallet ${user}`
          });
      });
      
    }



module.exports = { createWallet, findAll,  getUserBySearch };