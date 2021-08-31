import {SAVE_PROD_LISt} from '../action_types'
let initState=[]
export default function test(preState=initState,action) {
    const {type,data}=action
    let newState=preState
    switch (type) {
        case SAVE_PROD_LISt:
            newState=[...data]
            return newState
        default:
            return newState
    }
 }