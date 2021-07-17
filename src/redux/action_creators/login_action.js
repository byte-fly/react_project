import { SAVE_USER,DELETE_USER } from "../action_types";

export const creatSaveUserInfoAction=(value)=>{
    //localStorage.setItem存储时对象要转换为JSON 字符串
    localStorage.setItem('user',JSON.stringify(value.user))//用于将 JavaScript 值转换为 JSON 字符串。
    localStorage.setItem('token',value.token)
    return {type:SAVE_USER,data:value}
}

export const createDeleteUserInfoAction=()=>{
    //localStorage.setItem存储时对象要转换为JSON 字符串
    localStorage.removeItem('user')//用于将 JavaScript 值转换为 JSON 字符串。
    localStorage.removeItem('token')
    return {type:DELETE_USER}
}