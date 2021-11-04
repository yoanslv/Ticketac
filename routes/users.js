var express = require('express');
var router = express.Router();



router.get('/sign-in', function(req, res, next) {


  res.render('login', { title: 'Express' });
});

router.post('/sign-up', function(req, res, next) {


  res.render('login', { title: 'Express' });
});

module.exports = router;
