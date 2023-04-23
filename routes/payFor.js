const express = require('express')
const payFor = express.Router()

payFor.post('',(req,res) => { 
    res.send('我已经成功结束')
 })

 module.exports = payFor