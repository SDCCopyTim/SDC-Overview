const express = require('express');
const bodyparser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3003;

const db = require('../../database/mongoDB/index.js');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());

app.use(express.static(path.join(__dirname, '../../client/dist')));

app.get('/api/sites/:id', (req, res) => {
  db.Sites.aggregate([{ $sample: { size: 1 } }], (err, results) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).json(results);
    }
  });
});



app.listen(port, () => console.log(`currently listening on localhost:${port}`));