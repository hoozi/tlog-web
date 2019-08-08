const cheerio = require('cheerio');
const request = require('request');
const Entities = require('html-entities').XmlEntities;
const _ = require('lodash');
const fs = require('fs');
const nbportUrl = 'http://www.nbport.com.cn/zcms/catalog/15569/pc/';
const entities = new Entities();
const types = ['X', 'G', 'Z'];
//开始采集数据
function dataCollectorStartup(url) {
  for(let i=1;i<=5;i++) {
    dataRequest(url, i)
  }
}

function dataRequest(url, page, cb) {
  let _url = url;
  if(page) {
    _url = `${url}index_${page}.html`;
  }
  const opts = {
    url:_url,
    method: 'GET'
  }
  request(opts, (err, res, body) => {
    if(err) {
      console.log(`[Error]Collection:${err}`);
      return;
    }
    if(url === nbportUrl) {
      dataParse(body)
    } else {
      cb && cb(body)
    }
  })
}

function dataParse(body) {
  const $ = cheerio.load(body);
  
  const list = $('.piclists_second');
  const item = list.find('li');
  
  for(let i=0; i<item.length;i++) {
    const titleDom = $(item[i]).find('.text_second a');
    const title = titleDom.text();
    const url = titleDom.attr('href');
    const desc = $(item[i]).find('.detail_second').text();
    const thumbnail = $(item[i]).html().match(/<img src=(\".*\")/)[1].replace(/\"/g,'');
    const createDate = $(item[i]).find('.date_second').text();
    dataRequest(url, null, body => {
      const detail = detailParse(body);
      write2json({
        type:types[_.random(2)],
        status: 'P',
        title,
        desc,
        thumbnail,
        detail,
        createDate
      },'./data.json')
    })
    
  }
}

function detailParse(body) {
  const $ = cheerio.load(body);
  return entities.decode($('.body').html());
}

function write2json(parsedData, url) {
  const data = fs.readFileSync(url, 'utf8');
  const hasNews = data && typeof JSON.parse(data)['news']!=='undefined'
  const news =  hasNews ? JSON.parse(data)['news'] : [];
  news.push({id: news.length+1, ...parsedData});
  fs.writeFileSync(url, JSON.stringify({news}, 2, '\t'));
}

dataCollectorStartup(nbportUrl);