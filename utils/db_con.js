const Sequelize = require('sequelize')
const sequelize = new Sequelize('appointments',
    'azzam','StrongPassword@123',{
        'dialect':'mysql',
        'host':'localhost'
    })

module.exports = {
    sequelize}
