import {TEST1,TEST2} from '../action_types'
let initState='hello'
export default function test(preState=initState,action) {
    const {type,data}=action
    let newState=preState
    switch (type) {
        case TEST1:
            newState+=data
            return newState
    
            case TEST2:
                newState=newState+data+'!'
                return newState
        
        default:
            return newState
    }
 }