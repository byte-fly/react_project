import {createStore,applyMiddleware} from 'redux'
import reducers  from './reducers'
import thunk from 'redux-thunk'
//引入redux-devtools-extension,用于支持redux开发者调试工具的运行
import { composeWithDevTools } from 'redux-devtools-extension'

export default createStore(reducers,composeWithDevTools(applyMiddleware(thunk)))