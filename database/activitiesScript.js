const faker = require('faker');
const fs = require('fs');

const writeActivities = fs.createWriteStream('activities.csv');
writeActivities.write(`id,name,image\n`, 'utf8');

const shuffle = (array) => {
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

function writeTenMillionActivities(writer, encoding, callback) {
  let i = 10000000;
  let id = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      id += 1;

      let nameActivities = ['Biking', 'Boating', 'Climbing', 'Fishing', 'Hiking', 'Paddling', 'Swimming'];

      const index = Math.floor(Math.random() * 6);

      const name = nameActivities[index];

      const image = `https://fec-overview-2.s3-us-west-1.amazonaws.com/activities/${name}.png`;

      const data = `${id},${name},${image}\n`;

      if (i === 0) {
        writer.write(data, encoding, callback);
      } else {
// see if we should continue, or wait
// don't pass the callback, because we're not done yet.
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
// had to stop early!
// write some more once it drains
      writer.once('drain', write);
    }
  }
write()
}

writeTenMillionActivities(writeActivities, 'utf-8', () => {
  writeActivities.end();
});