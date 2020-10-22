const express = require('express');
const bodyparser = require('body-parser');
// const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3003;
require('newrelic');

const db = require('../../database/postgreSQL/dbHelpers.js')

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors());

app.use(express.static(path.join(__dirname, '../../client/dist')));

app.get('/api/sites/:id', (req, res) => {
  db.getSite(req.params.id, (err, results) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).json(results);
    }
  });
});

app.get('/api/services/:id', (req, res) => {
  db.getServices(req.params.id, (err, results) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).json(results);
    }
  });
});

app.get('/api/activities/:id', (req, res) => {
  db.getActivities(req.params.id, (err, results) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).json(results);
    }
  });
});

app.listen(port, () => console.log(`currently listening on localhost:${port}`));