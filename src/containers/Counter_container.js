import Counter from "../components/counter";
import { createIncreamentAction,createDecreamentAction,createIncreamentAsyncAction } from "../redux/actions/counter_action";
import { connect } from "react-redux";

export default connect(
    state=>({count:state.count}),
    {
        increment:createIncreamentAction,
        decrement:createDecreamentAction,
        incrementAsync:createIncreamentAsyncAction
    }
)(Counter)