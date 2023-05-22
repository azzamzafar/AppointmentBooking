const { Sequelize } = require('sequelize')
const {sequelize} = require('../utils/db_con.js')
const User = sequelize.define('user',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name:Sequelize.STRING,
    email:Sequelize.STRING,
    contact:Sequelize.INTEGER
})

module.exports = User;