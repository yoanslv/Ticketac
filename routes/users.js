var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/sign-in', function(req, res, next) {


  res.render('login', { title: 'Express' });
});

router.post('/sign-up', function(req, res, next) {


  res.render('login', { title: 'Express' });
});

module.exports = router;
