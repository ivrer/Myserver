const fs = require('fs')
const superagent = require('superagent')
const express = require('express')
const cheerio = require('cheerio')
const Mock = require('mockjs')
const {database,client} = require('./database')

//fs的路劲选着是以当前根目录开始的，特殊
fs.readFile('./database/defaultHtml/2.html',function(err,data){
  if(err){
    console.log(err);
  }
  let html = data
  const $ = cheerio.load(html) 

  const arr = {'searchList':[],'selector':[]}
  let keywords = '电脑'

  //获取页面结构数据
  $('.gl-warp>li').each((index,item) => {
  
    arr.searchList[index] = {
      'keyword':`${keywords}`,
      'sku':$(item).attr('data-sku'),
      'href':$(item).find('.p-img').children('a').prop('href'),
      'img-url':$(item).find('.p-img').children('a').children('img').prop('src')?$(item).find('.p-img').children('a').children('img').prop('src'):$(item).find('.p-img').children('a').children('img').prop('data-lazy-img'),
      'price':$(item).find('.p-price').children('strong').find('i').text(),
      'name':$(item).find('.p-name').children('a').children('em').text(),
      'pid':$(item).prop('data-sku'),
      'seller':$(item).find('.p-shop').children('span').children('a').text(),
      'p-commit':$(item).find('.p-commit').children('strong').children('a').text().split('+')[0],
      'p-scroll':[]
    }

    $(item).find('.p-scroll').children('.ps-wrap').children('ul').children('li').each((secIndex,item)=>{
      const  tmp =  arr.searchList[index]['p-scroll']
      tmp[secIndex] = {
       "p-tittle":$(item).find('a').prop('tittle'),
       "img":$(item).find('a').children('img').attr('data-lazy-img')
    }
     
   })
      
  });

  $('.sl-wrap').each((index,item)=>{
   
    arr.selector[index]= {
      "keyword":`${keywords}`,
      'sl-key':$(item).children('.sl-key').children('strong').text()?$(item).children('.sl-key').children('strong').text():$(item).children('.sl-key').children('span').text(),
      'sl-value':{
        'sl-v-logo':[

        ],
        'sl-v-list':[

        ]
      }
      
    }
    $(item).find('img').each((secIndex,item)=>{
      arr.selector[index]['sl-value']['sl-v-logo'][secIndex] =  {
        'img-url':$(item).prop('src'),
        
    }
    })

    $(item).find('.sl-v-list').find('.J_valueList').children('li').each((secIndex,item)=>{
      arr.selector[index]['sl-value']['sl-v-list'][secIndex] = {
        'name':$(item).children('a').text(),
        'data-group':$(item).prop('data-group')
      }
    })
  
  })



  if(arr.searchList.length==0){
    throw new Error('fail')
  }
  
  //返回请求


 
  //将数据存储在数据库中
  try{
    const options = {
      'col' :'goodsList',
      "dbName":'search',
      'data':arr.searchList,
      'action':'insertMany',
      'dedup':{"choose":true,"tittle":"pid"}
    }
    const options2 = {
      'col' :'selector',
      "dbName":'search',
      'data':arr.selector,
      'action':'insertMany',
      'dedup':{"choose":true,"tittle":arr.selector[0].keywords}
    }
    database(options)
      .then(()=>{console.log('数据连接成功');})
      .catch(()=>{console.error;})
      .finally(()=>{console.log('保存数据'+`${options.col}`+'成功')})
    
    database(options2) 
      .then(()=>{console.log('数据连接成功');})
      .catch(()=>{console.error;})
      .finally(()=>{console.log('保存数据'+`${options2.col}`+'成功')})
  }catch(err){console.log(err); }
})