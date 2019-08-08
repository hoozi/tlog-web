import './common';
import { getQueryStringByName } from '../utils';
import service from '../api';
import { typeMap } from '../utils';

const id = getQueryStringByName('id');
const newsDetailTpl = _.template($('#news-tpl').html());
async function getNewsContent() {
  if(!id) return;
  const response = await service('queryNews', {
    crudType:'selectById',
    id
  });
  if(!response.success) return;
  const { details, title, createDate, type, createUserName } = response.data[0];
  $('#newsDetail').html(
    newsDetailTpl({
      details,
      title,
      createDate,
      createUserName,
      typeName: typeMap[type]
    })
  )
}

getNewsContent();