const mongoose = require('mongoose');
const geocoder = require("../utils/geocoder")

const StoreSchema = new mongoose.Schema({
    storeId: {
        type: String,
        required: [true, 'Please add a store ID'],
        unique: true,
        trim: true,
        maxlength: [10, 'Store ID must be less than 10 characters']
    },
    adress: {
        type: String,
        required: [true, 'Please add an adress']
    },
    location: {
          type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'] // 'location.type' must be 'Point'
            //required: true
          },
          coordinates: {
            type: [Number],
            index: '2dsphere'
          },
          formattedAdress: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Geocode & create location
StoreSchema.pre('save', async function(next) {
  const loc = await geocoder.geocode(this.adress);
  //console.log(loc);
  this.location = {
    type: 'Point',
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAdress: loc[0].formattedAddress
  }
  // do not save adress to db
  this.adress = undefined;
  next();
});


module.exports = mongoose.model("Store", StoreSchema);