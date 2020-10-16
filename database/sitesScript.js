const faker = require('faker');
const fs = require('fs');

const writeSites = fs.createWriteStream('sites.csv');
writeSites.write(`id,siteName,siteArea,siteState,elevation,temperature,weather,distance\n`, 'utf8');

function writeTenMillionSites(writer, encoding, callback) {
  let i = 10000000;
  let id = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      id += 1;

      const weatherTypes = ['Cloudy', 'Clear', 'Partly Cloudy', 'Raining', 'Snowing', 'Drizzling'];

      const randomIndex = Math.floor(Math.random() * weatherTypes.length);

      const siteName = faker.address.streetName();

      const siteArea = faker.address.city();

      const siteState = faker.address.state();

      const elevation = faker.random.number(5300);

      const temperature = faker.random.number(120);

      const weather = weatherTypes[randomIndex];

      const distance = faker.random.float({
        min: 0.1,
        max: 100.2,
        precision: 0.1,
      });

      const data = `${id},${siteName},${siteArea},${siteState},${elevation},${temperature},${weather},${distance}\n`;

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

writeTenMillionSites(writeSites, 'utf-8', () => {
  writeSites.end();
});