import './common';
import { getQueryStringByName } from '../utils';
import service from '../api';

const tabItem = $('.news-tab').find('li');
const categoryFormUrl = getQueryStringByName('category');
const skeleton = $('#news-skeleton').html();
const newsListTpl = _.template($('#news-tpl').html());

selectCatgory(categoryFormUrl);
tabItem.on('click', function() {
  const category = $(this).data('category');
  selectCatgory(category);
});
function selectCatgory(category) {
  if(!category) return;
  tabItem.removeClass('active');
  $(`[data-category=${category}]`).addClass('active');
  getNewsList(category);
}

async function getNewsList(type) {
  $('#newsList').html(skeleton);
  const response = await service('queryNews', {
    crudType: 'retrieve',
    type,
    current:1,
    size:10,
    status:'P'
  });
  if(!response.success) return;
  const data = response.data.recordList;
  $('#newsList').html(newsListTpl({data}))
}