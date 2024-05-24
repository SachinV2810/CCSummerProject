const mongoose = require('mongoose');

// Define the schema for a trip
const tripSchema = new mongoose.Schema({
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
    required: true
  },
  flightid:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Flight',
    required:true
  },
  status: {
    type: String,
    enum: ['Upcoming','Cancelled' ,'Completed'],
    default: 'Upcoming'
  },
  departureDateTime: {
    type: Date,
    required: true
  },
  arrivalDateTime: {
    type: Date,
    required: true
  },
    userid:{type: String, required: true},
});

// Create a model using the schema
const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;
