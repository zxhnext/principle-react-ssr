import React from 'react'
import { renderRoutes } from 'react-router-config'
import Header from './components/Header/index'
// import Routes from './Routes';
import { actions } from './components/Header/store/'

const App = (props) => {
  return (
    <div>
        {/* 向下层组件传递context */}
        <Header staticContext={props.staticContext} />
        {/* <Header /> */}
        {
            // 展示对应页面中的内容 
            renderRoutes(props.route.routes)
        }
    </div>
  )
}

App.loadData = (store) => {
    return store.dispatch(actions.getHeaderInfo())
}

export default App