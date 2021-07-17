//项目中所有请求由这个文件发出

import myAxios from "./myAxios";
import { BASE_URL } from "../config";
// 发起登录请求

export const reqLogin= (username,password)=>  myAxios.post(`${BASE_URL}/login`,{username,password})
