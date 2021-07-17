import axios from "axios";
import qs from 'querystring'
import { message } from "antd";
import nProgress from "nprogress";
import 'nprogress/nprogress.css'

const instance=axios.create({
    timeout:3000,
})
//请求拦截器
instance.interceptors.request.use(function (config) {
    nProgress.start()
    const {method,data}=config
    //若是post请求
    if(method.toLowerCase()==='post'){
        if (data instanceof Object) {
            config.data=qs.stringify(data)
        }
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
  });
//响应拦截器
instance.interceptors.response.use(
    //请求成功走这里
    function (response) {
        nProgress.done()
        return response.data;
    }, 
    //请求失败走这里
    function (error) {
        nProgress.done()
        message.error(error.message,3)
        return new Promise(()=>{})//中断失败请求    处理请求时不用写.catch了
        

    }
);

export default instance