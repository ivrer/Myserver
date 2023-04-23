// const puppeteer = require('puppeteer');
// const cheerio = require('cheerio');
// const axios  = require('axios')

// puppeteer.launch().then(async browser =>{
//     const page = await browser.newPage();
//     await page.goto('https://item.jd.com/100048276065.html');
//     const html = await page.content();
//     page.on('console',msg=>console.log(msg.text,'这是页面打印的内容'))
//     const $ = cheerio.load(html) 



//     let postResponse = await page.evaluate(async() => {    

//         let response = fetch('https://api.m.jd.com/api?appid=pc-item-soa&functionId=pc_detailpage_wareBusiness&t=1679890507618&client=pc&clientVersion=1.0.0&loginType=3&body={"skuId": "100048276065","cat": "9987,653,655","area": "5_148_34049_34080","shopId": "1000000904","venderId": 1000000904,"paramJson": {"platform2":"100000000001","specialAttrStr":"p0ppppppppp2p1ppppppppppppp","skuMarkStr":"00"},"num": 1}&uuid=122270672.321466734.1652875912.1679820535.1679890490.83&jsonp=jQuery4409820&_=1679890507619', {
//               method : 'GET',    
//             }).then(response => response.text()).catch(error => console.log(error));
    
//             return response;
    
//           });
    
//     console.log('Final response');
//     console.log(postResponse)

//     page.close()
//    })


const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const axios  = require('axios')

puppeteer.launch().then(async browser =>{
    const page = await browser.newPage();
    await page.goto('https://satv02.me/movie/142.html');
    const html = await page.content();
    page.on('console',msg=>console.log(msg.text,'这是页面打印的内容'))
    const $ = cheerio.load(html) 



    let postResponse = await page.evaluate(async() => {    

        let response = fetch('https://im292v.huifenshou.com/uploads/km3u8/032/0324671c1f3dad75921881293ee7ab32/index.m3u8', {
              method : 'GET',    
            }).then(response => response.text()).catch(error => console.log(error));
    
            return response;
    
          });
    
    console.log('Final response');
    console.log(postResponse)

    page.close()
   })






      








