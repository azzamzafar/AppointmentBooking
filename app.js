const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { sequelize } = require('./utils/db_con.js')

const userRoute = require('./routes/user.js')
const allowedOrigins = ['http://127.0.0.1:5500'];
app.use(cors({
  origin: allowedOrigins
}));

app.use(bodyParser.json({extended: false}));

app.use('/users',userRoute);

sequelize.sync()
.then(()=>app.listen(3000))
.catch(err=>console.log(err))