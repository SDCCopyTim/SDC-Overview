const faker = require('faker');
const pool = require('./index.js');

const weather = ['Cloudy', 'Clear', 'Partly Cloudy', 'Raining', 'Snowing', 'Drizzling'];

const createSite = () => {
  const site = {};
  const randomIndex = Math.floor(Math.random() * weather.length);

  site.sitename = faker.address.streetName();

  site.sitearea = faker.address.city();

  site.sitestate = faker.address.state();

  site.elevation = faker.random.number(5300);

  site.temperature = faker.random.number(120);

  site.weather = weather[randomIndex];

  site.distance = faker.random.float({
    min: 0.1,
    max: 100.2,
    precision: 0.1,
  });

  return site;
};

const createSites = () => {
  const sitesArr = [];
  for (let i = 0; i < 5; i++) {
    sitesArr.push(createSite());
  }
  console.log(sitesArr)
  return sitesArr;
};

const insertData = () => {
  const allData = createSites();
  allData.forEach((item) => {
    const { sitename, sitearea, sitestate, elevation, temperature, weather, distance } = item;
    pool.query(`INSERT INTO sites (sitename, sitearea, sitestate, elevation, temperature, weather, distance) VALUES ('${sitename}', '${sitearea}', '${sitestate}', ${elevation}, ${temperature}, '${weather}', ${distance})`, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log('site seed succeeded!');
      }
    });
  });
};

insertData();
