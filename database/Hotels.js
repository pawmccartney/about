const mongoose = require('mongoose');
const db = require('./index.js');

const hotelSchema = new mongoose.Schema({
  hotel_name: String,
  description: String,
  number_of_reviews: Number,
  overall_rating: Number,
  rank: Number,
  location_rating: Number,
  cleanliness_rating: Number,
  service_rating: Number,
  value_rating: Number,
  property_amenities: {
    "Valet parking": Boolean,
    "Pool": Boolean,
    "Free breakfast": Boolean,
    "Beach": Boolean,
    "Babysitting": Boolean,
    "Free internet": Boolean,
    "Fitness center": Boolean,
    "Entertainment": Boolean,
    "Business center": Boolean,
    "Spa": Boolean,
    "Diving": Boolean,
    "Wifi": Boolean,
    "Hot tub": Boolean,
    "Kids club": Boolean,
    "Fishing": Boolean,
    "Airport transportation": Boolean,
    "Banquet room": Boolean,
    "Couples massage": Boolean,
    "Taxi service": Boolean,
    "Steam room": Boolean,
    "Salon": Boolean,
    "Gift shop": Boolean,
    "ATM on site": Boolean,
    "Dry cleaning": Boolean,
    "24-hour front desk": Boolean,
    "Karaoke": Boolean,
    "Aerobics": Boolean,
    "Swimup bar": Boolean,
    "Snack bar": Boolean,
    "Meeting rooms": Boolean,
    "Tennis courts": Boolean,
    "Free parking": Boolean,
    "Breakfast buffet": Boolean,
    "Shuttle bus service": Boolean,
    "24-hour security": Boolean,
    "Concierge": Boolean,
    "Currency exchange": Boolean,
    "Non-smoking hotel": Boolean,
    "Sun loungers/beach chairs": Boolean,
    "Doorperson": Boolean,
    "Shops": Boolean
  },
  room_features: {
    "Air conditioning": Boolean,
    "Room service": Boolean,
    "Flatscreen TV": Boolean,
    "Safe": Boolean,
    "Wake-up service": Boolean,
    "Housekeeping": Boolean,
    "Iron": Boolean,
    "Balcony": Boolean,
    "Private beach": Boolean,
    "Additional bathroom": Boolean,
    "Interconnected rooms available": Boolean,
    "Kitchenette": Boolean,
    "Laptop safe": Boolean,
    "VIP room facilities": Boolean,
    "Refrigerator": Boolean,
    "Private balcony": Boolean,
    "Sofa": Boolean,
    "DVD/CD player": Boolean,
    "Microwave": Boolean
  },
  room_types: {
    "Ocean View": Boolean,
    "Partial Ocean View": Boolean,
    "Suites": Boolean,
    "Family rooms": Boolean,
    "Non-smoking rooms": Boolean
  },
  images: Array,
  hotel_class: Number,
  languages_spoken: String,
  hotel_style: Array,
  hotel_website: String
})

let Hotels = mongoose.model('Hotel', hotelSchema);

// Database Helpers
let counter = 100;

const getHotel = function(hotel_name, cb) {
  return Hotels.findOne({ hotel_name }, (err, result) => {
    if (err) cb(err);
    cb(null, result);
  })
}

const createHotel = function(hotel, cb) {
  hotel["hotel_name"] = 'hotel' + counter;
  counter++;
  return Hotels.create(hotel, (err, result) => {
    if (err) cb(err);
    cb(null, result);
  })
}

const updateHotel = function(hotel_name, update, cb) {
  return Hotels.findOneAndUpdate({ hotel_name }, update, { new: true }, (err, result) => {
    if (err) cb(err);
    cb(null, result);
  })
}

module.exports = {
  Hotels,
  getHotel,
  createHotel,
  updateHotel
}
