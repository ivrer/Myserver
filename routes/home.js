const express = require('express')
//创建路由对象
const superagent = require('superagent')
const cheerio = require('cheerio')
const Mock = require('mockjs')
const puppeteer = require('puppeteer');
const {database,client} = require('../database/database')
//拉取数据库方法和代理

const home = express.Router()
//home页面首页加载请求
home.use("/goodsList", (req,res) => { 
  
  const catchPage = /pages=(\d)/.exec(req.url);
  //获得页面参数

  const page = catchPage[1];
  const curDate = Date.parse(new Date())  + Math.floor(Math.random()*10000) ;
  //模拟时间戳

  superagent.get("https://floor.jd.com/user-v20/feed/get?page="+`${page}`+"&pagesize=25&area=15_1290_0_0&source=pc-home&callback=jsonpMore2Goods&_="+`${curDate}`,(err,data)=>{
    if(err) return console.log(err)

    const tmp = JSON.parse(data.text)
  

    const options = {
        'col' :'goodsList',
        "dbName":'home',
        'data':tmp.data,
        'action':'insertMany',
        'dedup':{"choose":true,"title":"pid"}
      }
    //数据库参数

    database(options)
      .catch(()=>{console.error;})
      // .finally(()=>{console.log('关闭数据库连接'); return client.close()})
    //将数据存入数据库中

    res.send(tmp)
   
  })
  //爬取网站页面数据
 
})


//home页面搜索框处理请求


  


module.exports = home;