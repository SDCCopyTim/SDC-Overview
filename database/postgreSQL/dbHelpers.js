const pool = require('./index.js');

const randomNum = (num) => {
  return Math.floor(Math.random() * num);
}

// return new Promise((resolve, reject) => {
//   const queryStr = `SELECT * FROM sites WHERE id=${id}`;
//   pool
//     .query(queryStr)
//     .then(res => resolve(res.rows))
//     .catch(e => reject(e.stack));
// })

module.exports = {
  getSite: (id, callback) => {
    const queryStr = `SELECT * FROM sites WHERE id=${id}`;
    pool.query(queryStr, (err, result) => {
      if (err) {
        callback(err);
      } else {
        callback(null, result.rows);
      }
    });
  },
  getServices: (id, callback) => {
    const queryStr = `SELECT * FROM services WHERE id IN (${randomNum(3)}, ${randomNum(id)})`;
    pool.query(queryStr, (err, result) => {
      if (err) {
        callback(err);
      } else {
        callback(null, result.rows);
      }
    });
  },
  getActivities: (id, callback) => {
    let queryStr = '';
    let randomNumber = randomNum(6);
    if (randomNumber === 1) {
      queryStr = `SELECT * FROM activities WHERE id IN (${randomNum(id)})`;
    }
    if (randomNumber === 2) {
      queryStr = `SELECT * FROM activities WHERE id IN (${randomNum(id)}, ${randomNum(id)})`;
    }
    if (randomNumber === 3) {
      queryStr = `SELECT * FROM activities WHERE id IN (${randomNum(id)}, ${randomNum(id)}, ${randomNum(id)})`;
    }
    if (randomNumber === 4) {
      queryStr = `SELECT * FROM activities WHERE id IN (${randomNum(id)}, ${randomNum(id)}, ${randomNum(id)}, ${randomNum(id)})`;
    }
    if (randomNumber === 5) {
      queryStr = `SELECT * FROM activities WHERE id IN (${randomNum(id)}, ${randomNum(id)}, ${randomNum(id)}, ${randomNum(id)}, ${randomNum(id)})`;
    }
    if (randomNumber === 6) {
      queryStr = `SELECT * FROM activities WHERE id IN (${randomNum(id)}, ${randomNum(id)}, ${randomNum(id)}, ${randomNum(id)}, ${randomNum(id)}, ${randomNum(id)})`;
    }
    pool.query(queryStr, (err, result) => {
      if (err) {
        callback(err);
      } else {
        callback(null, result.rows);
      }
    });
  },
}

