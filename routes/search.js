
//创建路由对象
const superagent = require('superagent')
const express = require('express')
const cheerio = require('cheerio')
const Mock = require('mockjs')
const puppeteer = require('puppeteer');
const {database,client} = require('../database/database')
const {getSearchData} = require('../database/getSearchData')
//拉取数据库方法和代理
//拉取数据方法和代理
const search = express.Router()


search.post('/',(req,res) => {  
  //获得请求中的地址参数和post的数据
  const originData= req.body
  // let   catchCallback = /callback=([a-zA-Z0-9-_]+)/.exec(url)
  const callback = originData.callback

  getSearchList(req,res,originData)


  async function getSearchList(req,res,ori){

    
    let keywords = ori.search 
    let page = ori.page
    let search_url = "https://search.jd.com/Search?keyword="+ `${keywords}`+"&enc=utf-8&wq=" + `${keywords}`+"&pvid=8858151673f941e9b1a4d2c7214b2b52" 
    let tmp_url =  'https://search.jd.com/Search?keyword=%E6%89%8B%E6%9C%BA&enc=utf-8&suggest=1.his.0.0&wq=&pvid=987d6c9172e24dccaff38c9c646d3728'
    let search_url_page = "https://search.jd.com/Search?keyword=" + `${keywords}` + "&qrst=1&wq=" + `${keywords}`+ "&stock=1&pvid=8858151673f941e9b1a4d2c7214b2b52&page=" + `${page}` + "s=56&click=0"
    let cookies_url  = 'https://search.jd.com'
   
    //获得抓取页面所需的参数

    puppeteer.launch().then(async browser =>{

      try{

        //拿到已经登陆后的页面cookie
        const page_cookie = await browser.newPage();

        await page_cookie.goto(cookies_url);

        const cookies = await page_cookie.cookies()

        await page_cookie.close()


        const arr = {'searchList':[],'selector':[]}

        const page = await browser.newPage();

        //打开页面前设置cookie
        for(let i = 0;i<cookies.length;i++){
          await  page.
          
          
          setCookie(cookies[i])
        }
        //打开页面
        await page.goto(search_url_page);
        
        const html = await page.content();
        const $ = cheerio.load(html) 

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
             "p-tittle":$(item).find('a').prop('title'),
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
        const data = JSON.stringify(arr)
  
        if(arr.searchList.length==0){
          throw new Error('fail')
        }
        
        //返回请求
        res.send(data)
       
        //将数据存储在数据库中
        try{
          const options = {
            'col' :'goodsList',
            "dbName":'search',
            'data':arr.searchList,
            'action':'insertMany',
            'dedup':{"choose":true,"title":"pid"}
          }
          const options2 = {
            'col' :'selector',
            "dbName":'search',
            'data':arr.selector,
            'action':'insertMany',
            'dedup':{"choose":true,"title":`sl-key`}
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
  
      }catch{
        let defaultOptions ={
          'col' :'goodsList',
          "dbName":'search',
          'action':'get',
        }
        getSearchData(defaultOptions,originData,res)
      }


      


    //抓取页面数据

 })

  

  
  }
})

module.exports = search