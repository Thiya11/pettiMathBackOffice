const dotenv     = require('dotenv');
const express    = require('express');
const bodyParser = require('body-parser');
const app        = express();
dotenv.config()
const port     = process.env.PORT;
const mongoose = require('mongoose');
const uri      = process.env.DB_URI;
mongoose.connect(uri);
const { registerNewUser, loginUser } = require('./actions/users/user-crud');
app.use(bodyParser.json())

app.post('/api/register', async (req,res)=>{
   registerNewUser(req,res)
})

app.post('/api/login', async(req,res)=> {
    loginUser(req,res)
})

app.listen(port,()=>{
    console.log('listening at port ' + port)
})