//最核心的管理者

import {createStore,applyMiddleware} from 'redux'
import reducers  from './reducers/index'
import thunk from 'redux-thunk'
//引入redux-devtools-extension,用于支持redux开发者调试工具的运行
import { composeWithDevTools } from 'redux-devtools-extension'

export default createStore(reducers,composeWithDevTools(applyMiddleware(thunk)))