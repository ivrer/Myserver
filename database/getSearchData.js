const _ = require('lodash')
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
let  url ="mongodb://fox:fox@127.0.0.1:27017/admin"
const client = new MongoClient(url);



async function getSearchData(options=def,originData,res){
  await client.connect();
  console.log('connect successfully to server');
  const db = client.db(options.dbName)
  const collection_name = db.collection(options.col)
  const collection_select = db.collection('selector')

    

  let getSearchReault = await collection_name.find({'keyword':'手机'}).toArray()
  let getSelectReault = await collection_select.find({'keyword':'手机'}).toArray()



 let  data = {'searchList':getSearchReault,'selector':getSelectReault}

  

  res.send(JSON.stringify(data)) 

}
const def = {
    'col' :'goodsList',
    "dbName":'search',
    'data':[{"name":"steve"}],
    'action':'get',

  }
module.exports = {client,getSearchData}