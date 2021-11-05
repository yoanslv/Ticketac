var express = require('express');
var router = express.Router();

const journeyModel = require('../models/journeys');

var city = ["Paris","Marseille","Nantes","Lyon","Rennes","Melun","Bordeaux","Lille"]
var date = ["2018-11-20","2018-11-21","2018-11-22","2018-11-23","2018-11-24"]

let basket = [];


/* GET home page. */
router.get('/', function(req, res, next) {
  basket = [];
  res.render('login', { basket });
});

router.get('/home', function(req, res, next) {
  if(req.session.user == null){
    res.redirect('/');
  }
  res.render('home', {basket});
});

router.get('/notrain', function(req, res, next) {
  res.render('notrain');
});

router.post('/sucess', async function(req, res, next) {
  
  let departure = req.body.departure;
  let arrival = req.body.arrival;
  let date = new Date(req.body.date);
  let day = date.getDay();
  let month = date.getMonth() +1;
  
  let allTrips = await journeyModel.find({departure, arrival, date})
  if(allTrips.length == 0){
    res.render('notrain');
  }
  
  res.render('sucess', { allTrips, dateCmd: req.body.date, day, month });
});

router.get('/basket', function(req, res, next) {

  let dateCmd = req.query.date;

  basket.push({
    departure : req.query.departure,
    arrival : req.query.arrival,
    departureTime : req.query.departureTime,
    price : req.query.price
  });

  res.render('basket', { basket, dateCmd });
});

router.get('/mylasttrips', function(req, res, next) {
  res.render('mylasttrips', { title: 'Express' });
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

module.exports = router;
