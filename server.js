var app  = require('./app.js')
var express = require('express');
const path = require('path')
app.use(express.static(path.join(__dirname,'dist')))
app.listen(5566,()=>{
  console.log("启动服务器,端口为5566");

})