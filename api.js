const express = require("express"); // backend
const cors = require("cors"); // middleware
const app = express(); // create express



const db = require("./app/models"); // connect

db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Successfully connected to the Smiley database");
    })
    .catch(err => {
        console.log("Cannot connect to the Smiley database. Quitting ...", err);
        process.exit();
    });


// listen at all
app.use(cors()); 

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.get('/healthcheck', (req, res) => {
    res.send({status: 'Working'})
});


require("./app/routes/task.routes")(app);
require('./app/routes/product.routes')(app);
require('./app/routes/user.routes')(app);
//Wallet
require('./app/routes/wallet.routes')(app);
require('./app/routes/transaction.routes')(app);

// const productRoutes = require('./app/routes/product.routes')

// app.use(productRoutes);


// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

