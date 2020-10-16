const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
mongoose.connect('mongodb://localhost/overviewDB', {useNewUrlParser: true});
const connection = mongoose.connection;

connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', function() {
  console.log('~Mongoose Connection Successful~')
});

const sitesSchema = new mongoose.Schema({
  id: Number,
  siteName: String,
  siteArea: String,
  siteState: String,
  elevation: Number,
  temperature: Number,
  weather: String,
  distance: Number
});

const servicesSchema = new mongoose.Schema({
  id: Number,
  name: String,
  description: String,
  price: String,
  image: String
});

const activitiesSchema = new mongoose.Schema({
  id: Number,
  name: String,
  image: String
});

const terrainSchema = new mongoose.Schema({
  id: Number,
  name: String,
  image: String
});

const photosSchema = new mongoose.Schema({
  id: Number,
  photo: String,
  userName: String,
  userImage: String,
  date: String,
  likes: Number,
  caption: String
});

const attractionsSchema = new mongoose.Schema({
  id: Number,
  name: String,
  image: String,
  distance: Number
});

const Sites = mongoose.model('Sites', sitesSchema);
const Services = mongoose.model('Services', servicesSchema);
const Activities = mongoose.model('Activities', activitiesSchema);
const Terrain = mongoose.model('Terrain', terrainSchema);
const Photos = mongoose.model('Photos', photosSchema);
const Attractions = mongoose.model('Attractions', attractionsSchema);


module.exports = {
  connection,
  Sites,
  Services,
  Activities,
  Terrain,
  Photos,
  Attractions
}