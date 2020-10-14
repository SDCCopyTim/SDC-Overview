const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
mongoose.connect('mongodb://localhost/overviewDB', {useNewUrlParser: true});
const connection = mongoose.connection;

connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', function() {
  console.log('~Mongoose Connection Successful~')
});

const sitesSchema = new mongoose.Schema({
  siteName: String,
  siteArea: String,
  siteState: String,
  elevation: Number,
  temperature: Number,
  weather: String,
  distance: Number
});

const Sites = mongoose.model('Sites', sitesSchema);

module.exports = {
  connection,
  Sites
}