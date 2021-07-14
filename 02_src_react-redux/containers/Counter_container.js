import Counter from "../components/counter";
import { createIncreamentAction,createDecreamentAction } from "../redux/actionCreators";
import { connect } from "react-redux";


// function mapStateToProps(state){
//     return {count:state}
// }

// function mapDispatchToProps(dispatch){
//     return {
//         increment:(value)=>{dispatch(createIncreamentAction(value*1))},
//         decrement:(value)=>{dispatch(createDecreamentAction(value*1))}
//     }
// }

// export default connect(mapStateToProps,mapDispatchToProps)(Counter)


export default connect(
    state=>({count:state}),
    {
        increment:createIncreamentAction,
        decrement:createDecreamentAction
    }
)(Counter)