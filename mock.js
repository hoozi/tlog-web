const Mock = require('mockjs');
const { Random } = Mock;

const data = {
  news: []
}

function createNews(size) {
  for(let i=0; i<size; i++) {
    data.news.push({
      "id": i+1,
      "status": "P",
      "type": "Z",
      "title": "19",
      "details": "公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容",
      "pubDate": "2019-07-20 14:52:57",
      "createUserId": 601196790779220992,
      "createUserName": "刘瑾明",
      "createDate": "2019-07-01 15:05:32"
    })
  }
}

module.exports = () => {
  return data;
}