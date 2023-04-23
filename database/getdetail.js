const puppeteer = require('puppeteer')
const fs = require('fs')

//爬取线上代码
// function getDetail(req,res){
//   try{let url = req.query.url

//     puppeteer.launch().then(async (browser)=>{
//     let page = await  browser.newPage()
//     await page.goto(url)
//     let html = await page.content()
  
  
//     //正则拿到数据
//     const reg = /pageConfig = ([a-zA-Z0-9\u4e00-\u9fa5-_{}+=《》。~`、\/\*@#$%&?()（）!【】.\r\s:\n,\[\]''""]*)/
//     let result = reg.exec(html)
    
//     //去除空格
//     let data_str = result[1].replace(/(\s*)/g,'')
//     // console.log(data);
  
//     //这是用eval将字符转换为对象
//     // let obj = eval("(" + data + ")")
//     // console.log(obj,typeof obj);
  
  
//     //该代码片段比eval更加好用，而且少了很多缺点吗，具体可看eval文档
//     function loose(str){
//       try{  return Function('return (' + str + ')')()}
//       catch{
//         return '转换函数出现问题，请注意传入数据是否正确'
//       }
    
//     }
  
//     let data_obj = loose(data_str)
  
//     res.send(JSON.stringify(data_obj))
  
//     console.log('getDetail数据已经发送');
    
//     })

//   }catch{
//     res.send('请求出错，请注意查看请求如参数书写或是接口问题')

//   }
 

// }


//爬取存储的代码
function getDetail(req,res){
  try{

    fs.readFile('./database/defaultHtml/1.html', (err,data) => { 
      if(err){console.log(err);}
       let html = data
       

  
  
      //正则拿到数据
      const reg = /pageConfig = ([a-zA-Z0-9\u4e00-\u9fa5-_{}+=《》。~`、\/\*@#$%&?()（）!【】.\r\s:\n,\[\]''""！]*)/
      let result = reg.exec(html)

      
      //去除空格
      let data_str = result[1].replace(/(\s*)/g,'')
      // console.log(data);
    
      //这是用eval将字符转换为对象
      // let obj = eval("(" + data + ")")
      // console.log(obj,typeof obj);

    
      //该代码片段比eval更加好用，而且少了很多缺点吗，具体可看eval文档
      function loose(str){
        try{  return Function('return (' + str + ')')()}
        catch{
          return '转换函数出现问题，请注意传入数据是否正确'
        }
      
      }
    
      let data_obj = loose(data_str)


    
    
 
      res.send(JSON.stringify(data_obj))

    fs.writeFile('produc1.json',JSON.stringify(data_obj),(rr) => { err?console.log(err):console.log('我已经建立文件product.json');; })


    })
   
    
            

  }catch{
    res.send('请求出错，请注意查看请求如参数书写或是接口问题')

  }
}
 

module.exports = getDetail
// let str = 'asdasdad'

// let str1 = {name:'jack'}
// console.log(typeof str,typeof str1);





