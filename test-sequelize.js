const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('mysql://app_user:new_password@localhost:3306/wscraft');

sequelize.authenticate()
  .then(() => console.log('Connection successful!'))
  .catch((err) => console.error('Unable to connect:', err));
