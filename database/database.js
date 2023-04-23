const _ = require('lodash')
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
let  url ="mongodb://fox:fox@127.0.0.1:27017/admin"
const client = new MongoClient(url);


async function database(options=def){
  await client.connect();
  console.log('connect successfully to server');
  const db = client.db(options.dbName)
  const collection_name = db.collection(options.col)
  //添加不重复的数据
  if(options.action=='insertMany'&&options.dedup["choose"]==true){
    
    if(options.col !=='selector'){

      let tittle = options.dedup.tittle 
      
  
      //删除链接为空的数据
      options.data = options.data.filter((item)=>{
        return item['target_url']!==''
     
      })
      //简单去除数据中重复的数据
      for(let element of options.data){
        
        //删除重复的数据
        for(let secElement of options.data){
          if(element[tittle] == secElement[tittle]){
          const index =  options.data.find((value)=>{return value[tittle] == element[tittle]})
          options.data.splice(index,1)
          }
        }
      }

      let insertReault = await collection_name.insertMany(options.data)

    }else{
      let tmpArr = await collection_name.find({'keysword':tittle}).toArray()

      if( tmpArr.length == 0){
        let insertReault = await collection_name.insertMany(options.data)

      }
     
    }
    
  }else if(options.action=='insertMany'&&options.dedup["choose"]==false){
  //添加数据，不限重复
    let insertReault = await collection_name.insertMany(options.data)
  
  }

  

 
  return "done"
}
const def = {
    'col' :'practice',
    "dbName":'goodsList',
    'data':[{"name":"steve"}],
    'action':'insertMany',
    'dedup':{"choose":false,"tittle":"name"}
  }

module.exports = {client,database}