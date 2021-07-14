let initState=0
export default function operaCount(preState=initState,action){
    //规则:在reducer中不能改变传进来的参数
    console.log('---reducer调用了---')
    const {type,data}=action
    switch (type) {
        case 'increment':
            return preState+data
        case 'decrement':
            return preState-data
        default:
            return preState
    }
}