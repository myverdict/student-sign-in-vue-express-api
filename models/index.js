let Sequelize = require('sequelize');

let env = process.env.NODE_ENV || 'development';
let config = require(__dirname + '/../config.json')[env];

let db = {};

let sequelize;

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config)
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config)
}

const model = sequelize['import']('./student.js')
db[model.name] = model;

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;