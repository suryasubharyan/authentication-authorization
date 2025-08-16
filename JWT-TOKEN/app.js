const express = require('express');
const app = express();
const userModel = require('./models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const cookieParser = require('cookie-parser');
const path = require('path');

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.render("index");
});

app.post('/create', async (req, res) => {
    const { username, email, password, age } = req.body;
    
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            const createdUser = await userModel.create({
        username,
        email,
        password: hash,
        age
    });

    let token = jwt.sign({email}, "shubhamkkk");
    res.cookie("token", token);

    res.send("User created successfully: " + createdUser);
        })
    })

   
})

app.post('/login', (req, res) => {
    res.cookie("token", "");
    res.redirect("/");
})



app.listen(4000);