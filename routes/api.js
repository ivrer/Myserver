const express = require('express')
const multiparty = require('multiparty')
const fs =require('fs')

const api  = express.Router()

api.post('/',(req,res)=>{
  console.log(req.body);
  let form = new multiparty.Form()
  form.uploadDir = './database/images'
  form.parse(req,function(err,fields,files){
    console.log('fields',fields);
    console.log(files);
    console.log(files.photo[0].path);
    if(err){

    }else{

    }
  })
  api.get('/m3u8',(req,res)=>{
    fs.readFile('./database/dataJson/index.m3u8',(data,err) => { 
      if(err){console.log(err);}

      let value = data

      res.send(value)

     })
  })

  


res.header("Access-Control-Allow-Origin",'http://127.0.0.1:5500')
res.set('content-type',{"png":"image/png","jpg":"image/jpg"})


// var stream = fs.createReadStream()
// var responseData = []
//   if(stream){
//     stream.on('data',function(chunk){
//       responseData.push(chunk)
//     })
//     stream.on('end',function(){
//       var finalData = Buffer.concat(responseData)
//       res.write(finalData)
//       res.end()

//     })
//   }


})

module.exports = api;