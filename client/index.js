import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom' // 浏览器端用BrowserRouter
import { renderRoutes } from 'react-router-config'
import routes from '../src/Routes'
import { Provider } from 'react-redux'
import { getClientStore } from '../src/store/index'

const store = getClientStore()

const App = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <div>
                    {/* {
                        routes.map(route => (
                            <Route key={route.key} {...route}/>
                        ))
                    } */}
                    {/* {
                        renderRoutes(routes)
                    } */}
                    {/* {Routes} */}
                    {
                        renderRoutes(routes)
                    }
                </div>
            </BrowserRouter>
        </Provider>
    )
}

// 如果做同构，这里不要用render,用hydrate
ReactDom.hydrate(<App />, document.getElementById('root'))