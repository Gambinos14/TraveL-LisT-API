const mongoose = require('mongoose')

const destinationSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  latitude: {
    type: Number,
    required: true,
    max: 90,
    min: -90
  },
  longitude: {
    type: Number,
    required: true,
    max: 180,
    min: -180
  },
  rating: {
    type: Number,
    min: 1
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Destination', destinationSchema)
