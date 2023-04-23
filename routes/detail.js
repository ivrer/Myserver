//创建路由对象
const superagent = require('superagent')
const express = require('express')
const cheerio = require('cheerio')
const Mock = require('mockjs')
const puppeteer = require('puppeteer');
const {database,client} = require('../database/database')
const {getSearchData} = require('../database/getSearchData')
const getDetail =require('../database/getdetail')
const fs = require('fs')
//拉取数据库方法和代理
//拉取数据方法和代理
const detail = express.Router()

detail.get('',function(req,res,err){
  if(err){
    console.log(err);
  }

  getDetail(req,res)

})

detail.get('/address',function(req,res,err){
  fs.readFile('./database/dataJson/data_address.json',(err,data) => { 
    if(err){console.log(err);}
    else{
       res.send(data)
    }

   })
  
})

detail.get('/productPrice',(req,res,err) => { 
  console.log('一个productPrice的请求到来');
  fs.readFile('./database/dataJson/data_productPrice.json',(err,data) => { 
    if(err){console.log(err);}
    else{
       res.send(data)
    }

   })

 })

 detail.get('/productDetail',(req,res,err) => { 
   console.log('一个productDeatail的请求到来');
  //  url=https://jshop-rec.jd.com/queryData.html?callback=jQuery2014630&SKU=100035753586&venderId=1000002241&_=1679991739117
  fs.readFile('./database/dataJson/data_productDetail.json',(err,data) => { 
    if(err){console.log(err);}
    else{
       res.send(data)
    }

   })

 })

 detail.get('/pageDetail',(req,res,err) => { 
  console.log('一个productDeatail的请求到来');
 //  url=https://api.m.jd.com/api?appid=pc-item-soa&functionId=pc_detailpage_wareBusiness&t=1680005899674&client=pc&clientVersion=1.0.0&loginType=3&body={"skuId": "100035753586","cat": "737,794,878","area": "2_2825_51940_0","shopId": "1000002241","venderId": 1000002241,"paramJson": {"platform2":"1","specialAttrStr":"p0ppppppppp5pppppppppppppp","skuMarkStr":"00"},"num": 1}&uuid=122270672.321466734.1652875912.1679990773.1680005900.86&jsonp=jQuery5290810&_=1680005899674
 fs.readFile('./database/dataJson/data_pageDetail.json',(err,data) => { 
   if(err){console.log(err);}
   else{
      res.send(data)
   }

  })

})


module.exports = detail