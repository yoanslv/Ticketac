var express = require('express');
const userModel = require('../models/users');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.post('/sign-in', async function(req, res, next) {

  var searchUser = await userModel.findOne({
    email: req.body.emailFromFront,
    password: req.body.passwordFromFront
  })
  if(searchUser != null){
    req.session.email = req.body.emailFromFront,
    req.session.password = req.body.passwordFromFront

    res.redirect('/home')
  }else{
    res.redirect('/');
  }

  });

router.post('/sign-up', async function(req, res, next) {

  var searchUser = await userModel.findOne({
    email: req.body.emailFromFront
  })
  
  if(!searchUser){
    var newUser = new userModel({
      name: req.body.nameFromFront,
      firstname: req.body.firstnameFromFront,
      email: req.body.emailFromFront,
      password: req.body.passwordFromFront,
    })
  
    var newUserSave = await newUser.save();
  
    req.session.user = {
      name: newUserSave.name,
      firstname: newUserSave.firstname,
      email: newUserSave.email,
      password: newUserSave.password,
    }
  
  
    res.redirect('/home')
  } else {
    res.redirect('/')
  }
  
 
});

module.exports = router;
