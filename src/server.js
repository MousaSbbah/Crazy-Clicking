'use strict';

const express = require('express');
const app = express();




app.use(express.static('./public'))

app.get('/',(req,res)=>{
  res.status(200).send('Server Is Working')
})





function start(port){
  app.listen(port,()=>{
    console.log('Server listening at PORT : '+ port)
  })
}
module.exports ={
  server: app,
  start: start
}
