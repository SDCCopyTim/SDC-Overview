const faker = require('faker');
const db = require('./index.js');

const createPhoto = (id) => {
  const photo = {};

  photo.id = id;

  photo.photo = `https://fec-overview-2.s3-us-west-1.amazonaws.com/campsitephotos/camp${faker.random.number(346)}.jpg`;

  photo.userName = faker.name.firstName() + ' ' + faker.name.lastName()[0] + '.';

  photo.userImage = 'https://fec-overview-2.s3-us-west-1.amazonaws.com/tim/Tim.png';

  photo.date = faker.date.past();

  photo.likes = faker.random.number(10);

  photo.caption = faker.lorem.sentence();

  return photo;
};

const createPhotos = () => {
  const photosArr = [];

  for (let i = 0; i < 100; i++) {
    const randomNum = Math.floor(Math.random() * 100);
    if (randomNum < 20) {
      for (let j = 0; j < 15; j++) {
        photosArr.push(createPhoto(i));
      }
    } else if (randomNum >= 20 && randomNum < 40) {
      for (let j = 0; j < 29; j++) {
        photosArr.push(createPhoto(i));
      }
    } else if (randomNum >= 40 && randomNum < 60) {
      for (let j = 0; j < 47; j++) {
        photosArr.push(createPhoto(i));
      }
    } else if (randomNum >= 60 && randomNum < 80) {
      for (let j = 0; j < 109; j++) {
        photosArr.push(createPhoto(i));
      }
    } else {
      for (let j = 0; j < 123; j++) {
        photosArr.push(createPhoto(i));
      }
    }
  }

  db.Photos.insertMany(photosArr, (err, results) => {
    if (err) {
      console.error(err);
    } else {
      db.connection.close();
      console.log('Seed successful!');
    }
  });
};


createPhotos();
