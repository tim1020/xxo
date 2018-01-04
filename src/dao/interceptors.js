import axios from 'axios'
import Vue from 'vue'
import router from '../router'
import config from "../config"

axios.defaults.baseURL = config.API_HOST
axios.defaults.timeout = config.API_TIMEOUT
axios.defaults.retry = 4;
axios.defaults.retryDelay = 1000;


axios.interceptors.request.use(conf => {
    Vue.$vux.loading.show({
      text: 'Loading'
    })
    return conf;
}, error => {
    return Promise.reject(error);
});

//todo:使用缓存，减少短时间的重复访问

axios.interceptors.response.use(res => {
    Vue.$vux.loading.hide()
    let code = res.data.code || 0
    if(code != config.API_RESCODE.OK){ //业务响应是不OK
      if(code == config.API_RESCODE.NOT_LOGINED){ 
        Vue.$vux.alert.show({
          title: '请求失败',
          content: "登录状态失效，请重新登录",
          onHide(){
            router.replace('/login')
          }
        }) 
      }else{ //其它错误处理,
        Vue.$vux.alert.show({
          title: '请求失败',
          content: res.data.error || '服务器无正常响应'
        })
      }
      return;
    }
    return res.data;
}, error => {
    Vue.$vux.loading.hide()
    let msg =  error
    if(error.response){
      msg = 'HTTP '+ error.response.status + ' '+ error.response.statusText
    }else if(error.code){
      msg = error.code;
    }
    Vue.$vux.alert.show({
        title: '请求失败',
        content: msg
      })
     
    return Promise.reject(error);
});