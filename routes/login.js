const express = require('express')
const multer = require('multer')//接受formData 文档类型
const upload = multer()
let login = express.Router()



login.post('', upload.none(),async (req,res) => {
    let originData = await req.body

    
    res.setHeader('access-token','71ba9ab4ed2629112d9ade32c28c0e01')
    res.setHeader('content-type','application/json;charset=UTF-8')
    

   let message = {
    'state':1,
    'content':'成功登陆',
    'user':{
        roles:['vip'],
        info:{'menu':['home','movie','live','gamePart']}

    }
   } 
   
   res.send(JSON.stringify(message))
  
    
})
module.exports=login