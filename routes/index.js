var express = require('express');
var router = express.Router();

const journeyModel = require('../models/journeys');
const userModel = require('../models/users');
const orderModel = require('../models/orders');

var city = ["Paris","Marseille","Nantes","Lyon","Rennes","Melun","Bordeaux","Lille"]
var date = ["2018-11-20","2018-11-21","2018-11-22","2018-11-23","2018-11-24"]



/* GET home page. */
router.get('/', function(req, res, next) {

  if(req.session.basket == undefined){
    req.session.basket = []
  }
  
  res.render('login');
});

router.get('/home', function(req, res, next) {
  if(req.session.user == null){
    res.redirect('/');
  }
  checkout = false;
  res.render('home', {basket:req.session.basket, checkout });
});

router.get('/notrain', function(req, res, next) {

  if(req.session.user == null){
    res.redirect('/');
  }
  res.render('notrain');
});

router.post('/sucess', async function(req, res, next) {
  
  let departure = req.body.departure;
  let arrival = req.body.arrival;
  let date = new Date(req.body.date);
  let day = date.getDay();
  let month = date.getMonth()+1;
  
  let allTrips = await journeyModel.find({departure, arrival, date})
  if(allTrips.length == 0){
    res.render('notrain');
  }
  
  res.render('sucess', { allTrips, dateCmd: req.body.date, day, month });
});

router.get('/basket', function(req, res, next) {

  if(req.session.user == null){
    res.redirect('/');
  }

  req.session.basket.push({
    id: req.query.id,
    departure : req.query.departure,
    arrival : req.query.arrival,
    date : req.query.date,
    departureTime : req.query.departureTime,
    price : req.query.price
  });

  res.render('basket', { basket:req.session.basket });
});

router.get('/deletetrip', function(req, res, next){

  req.session.basket.splice(req.query.id,1)


  res.render('basket', {basket: req.session.basket, dateCmd:req.session.date})
});



router.get('/checkout', async function(req, res, next) {
  if(req.session.user == null){
    res.redirect('/');
  }

  for(var i=0; i<req.session.basket.length; i++){
    var newOrder = new orderModel({
      userID: req.session.user.id,
      tripsId: req.session.basket[i].id
    })
    await newOrder.save();
  }
  req.session.basket = [];

  res.render('basket', {basket: req.session.basket, dateCmd:req.session.dat});
});

router.get('/orders', async function(req, res, next) {

  if(req.session.user == null){
    res.redirect('/');
  }
  let userTrips = await orderModel.find({userId: req.session.user.id}).populate("tripsId");

  res.render('orders', { userTrips });
});



// Remplissage de la base de donnée, une fois suffit
router.get('/save', async function(req, res, next) {

  // How many journeys we want
  var count = 300

  // Save  ---------------------------------------------------
    for(var i = 0; i< count; i++){

    departureCity = city[Math.floor(Math.random() * Math.floor(city.length))]
    arrivalCity = city[Math.floor(Math.random() * Math.floor(city.length))]

    if(departureCity != arrivalCity){

      var newUser = new journeyModel ({
        departure: departureCity , 
        arrival: arrivalCity, 
        date: date[Math.floor(Math.random() * Math.floor(date.length))],
        departureTime:Math.floor(Math.random() * Math.floor(23)) + ":00",
        price: Math.floor(Math.random() * Math.floor(125)) + 25,
      });
       
       await newUser.save();

    }

  }
  res.render('index', { title: 'Express' });
});


// Cette route est juste une verification du Save.
// Vous pouvez choisir de la garder ou la supprimer.
router.get('/result', function(req, res, next) {

  // Permet de savoir combien de trajets il y a par ville en base
  for(i=0; i<city.length; i++){

    journeyModel.find( 
      { departure: city[i] } , //filtre
  
      function (err, journey) {

          console.log(`Nombre de trajets au départ de ${journey[0].departure} : `, journey.length);
      }
    )

  }


  res.render('index', { title: 'Express' });
});
//deconnection
router.get('/logout', function(req,res,next){

  req.session.user = null;

  res.redirect('/')
});


module.exports = router;
