const express = require('express');
const bodyparser = require('body-parser');
// const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3003;

const db = require('../../database/mongoDB/index.js');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
// app.use(morgan('dev'));
app.use(cors());

app.use(express.static(path.join(__dirname, '../../client/dist')));

const randomNum = (num) => {
  return Math.floor(Math.random() * num);
}
app.get('/api/sites/:id', (req, res) => {
  db.Sites.find({id: req.params.id}, (err, results) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).json(results);
    }
  });
});

app.get('/api/services/:id', (req, res) => {
  db.Services.find({ id: { $in: [randomNum(3), randomNum(1)] } }, (err, results) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).json(results);
    }
  });
});

app.get('/api/activities/:id', (req, res) => {
  let randomNumber = randomNum(5);
  if (randomNumber === 1) {
    db.Activities.find({ id: { $in: [randomNum(10000000)] } }, (err, results) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).json(results);
      }
    });
  } else if (randomNumber === 2) {
    db.Activities.find({ id: { $in: [randomNum(10000000), randomNum(10000000)] } }, (err, results) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).json(results);
      }
    });
  } else if (randomNumber === 3) {
    db.Activities.find({ id: { $in: [randomNum(10000000), randomNum(10000000), randomNum(10000000)] } }, (err, results) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).json(results);
      }
    });
  } else {
    db.Activities.find({ id: { $in: [randomNum(10000000), randomNum(10000000), randomNum(10000000), randomNum(10000000)] } }, (err, results) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).json(results);
      }
    });
  }
});

app.get('/api/terrain/:id', (req, res) => {
  db.Terrain.find({id: req.params.id}, (err, results) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).json(results);
    }
  });
});

app.get('/api/photos/:id', (req, res) => {
  db.Photos.find({id: req.params.id}, (err, results) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).json(results);
    }
  });
});

app.get('/api/attractions/:id', (req, res) => {
  db.Attractions.find({id: req.params.id}, (err, results) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).json(results);
    }
  });
});


app.listen(port, () => console.log(`currently listening on localhost:${port}`));