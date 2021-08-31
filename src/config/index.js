//该文件为项目的配置文件，保存着通用性的配置和变量

//BASE_URL：发送请求基本路径，当前在开发环境，给自己的代理服务器发请求，若项目上线，配置成真正的服务器地址
export const BASE_URL='http://localhost:3000' 
//或写成export const BASE_URL=''  因为是给自己的代理服务器发，地址相同

//高德地图的地址
export const A_MAP_URL = 'https://restapi.amap.com';
//高德地图的key
export const A_MAP_KEY = 'af82b3912a23a1e25ddd23ff99fab065';
//城市编码
export const CITY_CODE = '510100'
//表格每页展示条数
export const PAGE_SIZE=5
