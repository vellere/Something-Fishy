require('dotenv').config()
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');
require('./middleware/passportSetup');


const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');


mongoose.connect('mongodb://localhost:27017/tradeOffDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}, () => {
    console.log('Connected to DB');
});

app.use(express.static('uploads'))
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2']
}))

app.use(passport.initialize())
app.use(passport.session())

app.use("/user", userRoutes);
app.use("/products", productRoutes);

app.get('/failed', (req, res) => {
    res.send("failed")
})
app.get('/success', (req, res) => {
    res.send("success")
})


app.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

app.get('/google/callback', passport.authenticate('google', {failureRedirect: '/failed'}), function (req, res) { // Successful authentication, redirect home.
    res.redirect('/success');
});

app.listen(process.env.PORT, () => {
    console.log("Server up and running on port " + process.env.PORT);
})
© 2021 GitHub, Inc.
Terms
Privacy
Security
St