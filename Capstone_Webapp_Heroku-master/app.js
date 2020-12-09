const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const passport = require('passport');

//App initialization
const app = express();
//Form data middleware
app.use(bodyParser.urlencoded({
    extended: false
}));
//Json body middleware
app.use(bodyParser.json());
//Cors middleware
app.use(cors());
//Setting up static directory
app.use(express.static(path.join(__dirname, 'public')));
// Use the passport Middleware
app.use(passport.initialize());
// Bring in the Passport Strategy
require(path.join(__dirname, './config/passport'))(passport);
//Diable browser cache thingy
app.disable('etag');

//Test
/*
app.get('/', (req, res) => {
    return res.send("hello")
})
*/

//Mongodb Atlas connection
const db = require(path.join(__dirname, './config/keys')).mongoURI
mongoose.connect(db, { useNewUrlParser:true 
}).then(() => {
    console.log(`Database ${db} connected`)
}).catch(err => {
    console.log(`Database connection failed ${err}`)
});

//Routing
const users = require(path.join(__dirname, './routes/api/user'));
app.use('/api/user', users);

const inventory = require(path.join(__dirname, './routes/api/inventory'));
app.use('/api/inventory', inventory);

const appointments = require(path.join(__dirname, './routes/api/appointment'));
app.use('/api/appointment', appointments);

const customers = require(path.join(__dirname, './routes/api/customer'));
app.use('/api/customer', customers);

// Serving static files from dist
app.use(express.static(path.join(__dirname, './dist')));
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, './dist', 'index.html'))
})

//Port setting
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})

//https://broadway-exxon-auto-care.herokuapp.com/