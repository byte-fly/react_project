import {SAVE_TITLE} from '../action_types'
let initState=""
export default function test(preState=initState,action) {
    const {type,data}=action
    let newState=preState
    switch (type) {
        case SAVE_TITLE:
            newState=data
            return newState
        default:
            return newState
    }
 }