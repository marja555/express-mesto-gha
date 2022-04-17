const express = require('express');
const { default: mongoose } = require('mongoose');

const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use((req, res, next) => {
  req.user = {
    _id: '625850df1e722638355859a0',
  };

  next();
});

app.use('/users', require('./routes/user'));
app.use('/cards', require('./routes/card'));

const { PORT = 3001 } = process.env;

app.all('*', (req, res) => {
  res.status(404).send({ message: 'Путь не найден' });
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
