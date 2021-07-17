import {SAVE_USER} from '../action_types'
let initState={
    user:{},
    token:'',
    isLogin:false
}
export default function test(preState=initState,action) {
    const {type,data}=action
    let newState=preState
    switch (type) {
        case SAVE_USER:
            console.log('-----',data)
            newState={user:data.user,token:data.token,isLogin:true}
            return newState
    
            // case TEST2:
            //     newState=newState+data+'!'
            //     return newState
        
        default:
            return newState
    }
 }