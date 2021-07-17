import {SAVE_USER,DELETE_USER} from '../action_types'

let user=JSON.parse(localStorage.getItem('user')) //用于将一个 JSON 字符串转换为 JavaScript 对象。

let token=localStorage.getItem('token')
console.log(user,token)
let initState={
    user:user||'',
    token:token||'',
    isLogin:user&&token?true:false
}
export default function test(preState=initState,action) {
    const {type,data}=action
    let newState=preState
    switch (type) {
        case SAVE_USER:
            console.log('-----',data)
            newState={user:data.user,token:data.token,isLogin:true}
            return newState
        case DELETE_USER:
            newState={user:'',token:'',isLogin:false}
            return newState
        default:
            return newState
    }
 }