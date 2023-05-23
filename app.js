// const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { sequelize } = require('./utils/db_con.js')

const userRoute = require('./routes/user.js')

// const allowedOrigins = ['localhost:8000','http://127.0.0.1:8000','http://127.0.0.1:5500'];
// app.use(cors({
//   origin: allowedOrigins
// }));
const setCors = (req,res,next)=>{
  res.setHeader('Content-Type','application/json')
  res.setHeader('Access-Control-Allow-Origin','http://127.0.0.1:8000')
  res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,DELETE')
  res.setHeader('Access-Control-Allow-Headers','Content-Type')
  res.setHeader('Vary','origin')
  next()
}
app.use(setCors)
app.use(bodyParser.json({extended: false}));

app.use('/users',setCors,userRoute);

sequelize.sync()
.then(()=>app.listen(3000))
.catch(err=>console.log(err))