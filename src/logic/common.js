import 'bootstrap';
import 'bootstrap-hover-dropdown';
import 'bootstrap-select';
import 'bootstrap-select/dist/css/bootstrap-select';
/* import 'layui-src/dist/layui.all';
import 'layui-src/dist/css/layui.css';
import 'layui-src/dist/css/modules/layer/default/layer.css';
import { parse } from 'qs';
import { login, logout, queryCurrentUser } from '@/api'; */

_.templateSettings = {
  evaluate    : /\{(.+?)\}/g,
  interpolate : /\{\{(.+?)\}\}/g,
  escape      : /\{\-(.+?)\}/g
};
/* const layer = layui.layer;
const userTmp = '您好，{{userId}} <a href="javascript:;" id="logout">退出</a> | <a href="/jgteport/member/myeport.html">我的嘉港通</a>';
const loginTmp = '<a href="javascript:;" data-toggle="modal" data-target="#loginModal"><i class="iconfont icon-user"></i> 登录</a>'
const userCompild = _.template(userTmp);
const loginCompild = _.template(loginTmp);
const fieldMap = ['uid', 'password', 'yzm'];
const flagMap = ['用户名或密码错误！', '验证码输入错误！'];
const loginArea = $('.login-area');
//getCurrentUser();
const formRest = function(){
  _.each(fieldMap, v => {
    $(`#${v}`).val('');
  });
  $('#login-button').button('reset');
}
const handleLogin = async function(e) {
  e.preventDefault();
  const values = parse($('#login-form').serialize());
  if(!values['uid'] || !values['password'] || !values['yzm']) {
    return layer.msg('请输入完整信息');
  }
  $('#login-button').button('loading');
  const response = await login(values);
  $('#login-button').button('reset');
  const { flag } = response;
  if(flagMap[flag]) {
    return layer.msg(flagMap[flag]);
  } else {
    loginArea.html(userCompild({userId: response.userId}));
    //window.location.href='/jgteport/member/myeport.html';
    $('#loginModal').modal('hide');
  }
}

const handleLogout = async function() {
  const response = await logout();
  loginArea.html(loginCompild());
}

async function getCurrentUser() {
  const response = await queryCurrentUser();
  const { status='' } = response;
  if(status === 'y') {
    loginArea.html(userCompild({userId: response.userId}));
  } else {
    loginArea.html(loginCompild());
  }
}

$("#checkImageButton").on("click",function(){ 
  const newsrc=`/jgt/index/createCheckImages.action?t=${Date.now()}`;
  $(this).attr("src",newsrc);
})

$('#login-form').on('submit', handleLogin);
$('#login-button').on('click', handleLogin);
$(document).on('click', '#logout', handleLogout);
$('.init-selectpicker').selectpicker();
$('#loginModal').on('hidden.bs.modal', function(){
  formRest();
}); */