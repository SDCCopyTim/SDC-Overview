const faker = require('faker');
const fs = require('fs');

const writeServices = fs.createWriteStream('services.csv');
writeServices.write(`id,name,description,price,image\n`, 'utf8');

function writeTenMillionServices(writer, encoding, callback) {
  let i = 10000000;
  let id = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      id += 1;

      const nameOfService = ['Firewood bundle', 'Macala Orchards'];

      const descriptions = ['Start your trip off right with a bundle of firewood waiting for you at your camp for your first campfire.', 'Olive orchards vineyard guava orchards decorative landscape and oak groves spread out on our 20 acres set against beautiful natural rock landscape.'];

      const priceServices = ['free', '5', '10'];

      const imageServices = ['https://fec-overview-2.s3-us-west-1.amazonaws.com/services/FirewoodBundle.png', 'https://fec-overview-2.s3-us-west-1.amazonaws.com/services/MacalaOrchards.png'];

      const randomIndex = Math.floor(Math.random() * priceServices.length);

      const index = Math.floor(Math.random() * nameOfService.length);

      const name = nameOfService[index];

      const description = descriptions[index];

      const price = priceServices[randomIndex];

      const image = imageServices[index];

      const data = `${id},${name},${description},${price},${image}\n`;

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

writeTenMillionServices(writeServices, 'utf-8', () => {
  writeServices.end();
});