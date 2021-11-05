const mongoose = require('mongoose');

var userHistorySchema = mongoose.Schema({
    userID: String,
    tripsId: {type: mongoose.Schema.Types.ObjectId, ref:'journeys'}
  });
  
  var userHistoryModel = mongoose.model('usersHistory', userHistorySchema);

  module.exports = userHistoryModel;