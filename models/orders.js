const mongoose = require('mongoose');

var orderSchema = mongoose.Schema({
    userID: String,
    tripsId: {type: mongoose.Schema.Types.ObjectId, ref:'journeys'}
  });
  
  var orderModel = mongoose.model('orders', orderSchema);

  module.exports = orderModel;