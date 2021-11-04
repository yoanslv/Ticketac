var express = require('express');
const userModel = require('../models/users');
var router = express.Router();



router.post('/sign-in', function(req, res, next) {
  

  res.render('login', { title: 'Express' });
});

router.post('/sign-up', async function(req, res, next) {

  if(await userModel.find({ email:req.body.emailFromFront }) !== -1){
    res.render('login');
  }

  let newUser = new userModel ({
    name: req.body.nameFromFront,
    firstname: req.body.firstnameFromFront,
    email: req.body.emailFromFront,
   password:  req.body.passwordFromFront
    });
  let userSaved = await newUser.save();

  req.session.user = {
    name: userSaved.name,
    firstname: userSaved.firstname,
    email: userSaved.email,
   password:  userSaved.password
  };

  let users = await userModel.find()

  res.redirect('/home');
});

module.exports = router;
