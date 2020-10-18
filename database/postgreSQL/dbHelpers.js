const pool = require('./index.js');

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
}