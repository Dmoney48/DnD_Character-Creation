const express = require('express');
const bcrypt = require('bcrypt');

//we need our User model
const User = require('../models/users')
const router = express.Router()

router.get('/register', (req, res) => {
    res.render('users/register.ejs');
})

router.post('/register', (req, res) =>{
    //we need to encrypt our passowrds
    //we can use the bcrypt library for this
    //we need to import the library at the top of our file
    //we need to generate salt
    const salt = bcrypt.genSaltSync(10);
    //salt is a random garbage we add to our encrypted passwords
    //the number we pass to genSaltSync determines how my salt
    //we are adding, the higher the number the more secure, but it will take longer 
    //now we're going to generate the actual password.

    req.body.password = bcrypt.hashSync(req.body.password, salt);
    console.log(req.body);

    //first let's see if somebody else already has this username
    User.findOne({ username: req.body.username}, (error, userExists) => {
        if(userExists) {
            res.send('Username unavailable');
        } else {
            User.create(req.body, (error, createdUser) => {
                req.session.currentUser = createdUser
                // res.send('User Created')
                res.redirect('/fruits')
            })
        }
    })
})

router.get('/signin', (req, res) => {
    res.render('users/signin.ejs')
})

router.post('/signin', (req, res) => {
    //we need to get the user with that user name
    User.findOne({username: req.body.username}, (error, foundUser) =>{
        if(foundUser) {
            //if they do exist, we need to compare their passwords
            //we can compare passwords using bcrypt's compareSync function
            const validLogin = bcrypt.compareSync(req.body.password, foundUser.password)
            //compareSync returns true if they match
            //and false if they don't match
            //if the passwords match, log then in
            if(validLogin) {
                console.log(foundUser);
                req.session.currentUser = foundUser;
                //we are letting session know
                //that we have logged in
                // res.send('User logged in.');
                res.redirect('/fruits');
            } else {
                res.send('Invalid username or password')
            }
        } else {
            //if they don't exist on this block
            res.send('Invalid username or password')
        }
    })
})


//Destroy Session route

router.get('/signout', (req, res) => {
    //This DESTROYs the session
    req.session.destroy();
    res.redirect('/users/signin')
})
module.exports = router;

