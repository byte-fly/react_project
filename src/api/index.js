//项目中所有请求由这个文件发出

import axios from "axios";
import myAxios from "./myAxios";
import { BASE_URL,A_MAP_URL,A_MAP_KEY,CITY_CODE } from "../config";


// 发起登录请求
export const reqLogin= (username,password)=>  myAxios.post(`${BASE_URL}/login`,{username:username,password:password})

// 发起获取商品分类列表请求
export const reqCategoryList= ()=>  myAxios.get(`${BASE_URL}/manage/category/list`)

// //获取天气信息
// export const reqWeather=()=>{
//     jsonp('https://restapi.amap.com/v3/weather/weatherInfo?key=af82b3912a23a1e25ddd23ff99fab065&city=320500&output=JSON&extensions=base',(err,data)=>{
//             if(err){
//                 message.error('请求天气失败，请联系管理员')
//                 return new Promise(()=>{})
//             }else{
//                 console.log(data)
//             }
//         })
//     // return new Promise((resolve,reject)=>{
//     // })
// }

// 发送获取高德地图天气的请求
// export const reqWeather = () => (axios.get(`${A_MAP_URL}/v3/weather/weatherInfo`, {
//     params: {
//         key: A_MAP_KEY,
//         city: CITY_CODE,
//         output: 'JSON',
//         extensions: 'base'
//     }
// }))
export const reqWeather= ()=>  axios.get(`${A_MAP_URL}/v3/weather/weatherInfo?key=${A_MAP_KEY}&city=${CITY_CODE}&output=JSON&extensions=base`)

//新增商品分类
export const reqAddCategory= (categoryName)=>  myAxios.post(`${BASE_URL}/manage/category/add`,{categoryName:categoryName})

//更新一个商品分类
export const reqUpdateCategory= (categoryId,categoryName)=>  myAxios.post(`${BASE_URL}/manage/category/update`,{categoryId:categoryId,categoryName:categoryName})

//请求商品分页列表
export const reqProductList= (pageNum,pageSize)=>  myAxios.get(`${BASE_URL}/manage/product/list`,{params:{pageNum:pageNum,pageSize:pageSize}})

//请求更新商品状态
export const reqUpdateProdStatus= (productId,status)=>  myAxios.post(`${BASE_URL}/manage/product/updateStatus`,{productId:productId,status:status})

//搜索商品
export const reqSearchProduct= (pageNum,pageSize,searchType,keyWord)=>  myAxios.get(`${BASE_URL}/manage/product/search`,{params:{pageNum,pageSize,[searchType]:keyWord}})

//根据商品id获取商品信息
export const reqProdById=(productId)=>myAxios.get(`${BASE_URL}/manage/product/info`,{params:{productId}})

//请求删除图片（根据图片唯一名字）
export const reqDeletePic= (name)=>  myAxios.post(`${BASE_URL}/manage/img/delete`,{name})

//请求添加商品
export const reqAddProduct= (productObj)=>  myAxios.post(`${BASE_URL}/manage/product/add`,{...productObj})