import React from 'react'
import ReactDOM from 'react-dom'
import store from './redux/store'
import App from './App.jsx'

ReactDOM.render(<App store={store}/>,document.getElementById('root'))

store.subscribe(()=>{
    ReactDOM.render(<App store={store}/>,document.getElementById('root'))
})