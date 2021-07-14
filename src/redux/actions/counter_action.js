export const createIncreamentAction = value => ({type:'increment',data:value})

export const createDecreamentAction = value => ({type:'decrement',data:value})

export const createIncreamentAsyncAction = (value,delay)=>{
    return (dispatch)=>{
        setTimeout(()=>{
            dispatch(createIncreamentAction(value))
        },delay)
    }
}