export function getQueryString() {
  const result = location.search.match(new RegExp("[\?\&][^\?\&]+=[^\?\&]+","g")); 
  if(!result) return '';
  for(let i = 0; i < result.length; i++){
    result[i] = result[i].substring(1);
  }
  return result;
}

export function getQueryStringByName(name) {
  const result = location.search.match(new RegExp("[\?\&]" + name+ "=([^\&]+)","i"));
  if(result == null || result.length < 1) return '';
  return result[1];
}

export function getQueryStringByIndex(index) {
  let result;
  if(index === null) return '';
  const queryStringList = getQueryString();
  if(index >= queryStringList.length) return '';
  result = queryStringList[index];
  const startIndex = result.indexOf("=") + 1;
  result = result.substring(startIndex);
  return result;
}

export const typeMap = {
  "X": "公司新闻",
  "G": "通知公告", 
  "Z": "行业资讯"
}
