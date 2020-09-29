const fsPromises = require('fs').promises;
const path = require('path');

module.exports.getAllUsers = (req, res) => {
  const filepath = path.join(__dirname, '../data/users.json');
  fsPromises.readFile(filepath, { enconding: 'utf8' })
    .then((data) => {
      const information = JSON.parse(data);
      res.status(200).json(information);
    })
    .catch((err) => {
      res.status(500).json({ message: `Нет пользователя с таким id ${err}` });
    });
};

module.exports.getUser = (req, res) => {
  const filepath = path.join(__dirname, '../data/users.json');
  fsPromises.readFile(filepath, { enconding: 'utf8' })
    .then((data) => {
      const information = JSON.parse(data);
      const user = information.find((item) => item._id === req.params.id);
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).json({ message: `Нет пользователя с таким id ${err}` });
    });
};
