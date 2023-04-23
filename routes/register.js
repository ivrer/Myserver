const express = require('express')
const multer = require('multer')//接受formData 文档类型
const upload = multer()
let register = express.Router()



register.post('', upload.none(),async (req,res) => {
    let originData = await req.body

    
    res.setHeader('access-token','71ba9ab4ed2629112d9ade32c28c0e01')
    let user= {

        roles:['vip'],
        info:{'menu':['home','movie','live','gamePart']}

    }

   let message = {
    'state':1,
    'content':'成功注册'
   } 
   
   res.send(JSON.stringify(message))
  
    
})
module.exports=register