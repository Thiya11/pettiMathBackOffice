const dotenv  = require('dotenv');
const express = require('express');
const app     = express();
dotenv.config()
const port    = process.env.PORT;

app.listen(port,()=>{
    console.log('listening at port ' + port)
})