import './common';
import service from '../api';
import '@/vendors/jquery.cycle.js';
import { typeMap } from '../utils'

$('#cycle').cycle({
  pause:  1,
  speed: 1000
})


const newsTpl = $('#news-tpl').html();
const cargoTpl = $('#cargo-tpl').html();
const transportTpl = $('#transport-tpl').html();
const logisticsTpl = $('#logistics-tpl').html();
const newsCompile = _.template(newsTpl);
const cargoCompile = _.template(cargoTpl);
const transportCompile = _.template(transportTpl);
const logisticsCompile = _.template(logisticsTpl);

async function getNewsList() {
  const response = await service('queryNews', {
    "crudType": "retrieve",
    "current":1,
    "size":10,
    "status":"P"
  });
  if(!response || !response.success) return;
  const news = response.data.recordList.map(item => {
    return {
      ...item,
      desc:item.details.replace(/<[^>]+>/g, ""),
      thumbnail: 'nc.png'
    }
  });
  //const news = response.news.filter(item => item.thumbnail);
  const newsData = {
    ...createHot(news),
    ...createLastest(news)
  }
  $('#news-area').html(newsCompile(newsData));
}

async function getCargo() {
  const response = await service('queryCargo', {
    "crudType": "retrieve",
    "current": 1,
    "size": 10,
    "status": 30
  });
  if(!response || !response.success) return;
  const data = {
    data: response.data.recordList.map(item => {
      const { beginDate='', endDate='' } = item;
      return {
        ...item,
        beginDate: beginDate.substring(0,10),
        endDate: endDate.substring(0,10)
      }
    })
  };
  $('#cargo-area').html(cargoCompile(data))
}

async function getTransport() {
  const response = await service('queryTransport', {
    "crudType": "retrieve",
    "current": 1,
    "size": 10,
    "status": 30
  });
  if(!response || !response.success) return;
  const data = {
    data: response.data.recordList
  }
  $('#transport-area').html(transportCompile(data))
}

async function getLogistics() {
  const response = await service('queryLogistics', {
    "crudType": "retrieve",
    "current": 1,
    "size": 10,
    "status": 'B'
  });
  if(!response || !response.success) return;
  const data = {
    data: response.data.recordList
  }
  $('#logistics-area').html(logisticsCompile(data))
}
function createHot(data) {
  const hot = data.slice(0,5);
  //const lastest = data.slice(5, 8);
  return {
    hot_thumbnail: hot[0].thumbnail,
    hot_title: hot[0].title,
    hot_id:hot[0].id,
    hotList: hot.slice(1,5).map(item => {
      return {
        ...item,
        title: item.title.length > 23 ? item.title.substring(0,23)+'...' : item.title,
        cat: typeMap[item.type]
      }
    })
  }
}

function createLastest(data) {
  const lastest = data.slice(5, 8).map(item => {
    return {
      ...item,
      title: item.title.length > 23 ? item.title.substring(0,23)+'...' : item.title,
      desc: item.desc.length > 85 ? item.desc.substring(0,85)+'...' : item.desc,
    }
  });
  return {
    news_lastest: lastest
  }
}

getCargo();
getLogistics();
getTransport();
getNewsList();
