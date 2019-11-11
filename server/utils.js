import React from 'react'
import { StaticRouter, Route, matchPath } from 'react-router-dom' // 服务器端用StaticRouter, matchPath只能匹配单级路由
import { renderRoutes } from 'react-router-config' // 匹配多级路由,发现有客户端重定向时会向context中注入action:'REPLACE',以及重定向的路由path: ''
import { renderToString } from 'react-dom/server'
import { Helmet } from 'react-helmet' // 定制页面 title & description
import { Provider } from 'react-redux'

export const render = (store, routes, req, context) => {

    // location路径 context 数据
    const content = renderToString((
        <Provider store={store}>
            <StaticRouter context={context} location={req.path}>
                <div>
                    {/* {
                        routes.map(route => (
                            <Route key={route.key} {...route}/>
                        ))
                    } */}
                    {/* {Routes} */}
                    {renderRoutes(routes)}
                </div>
            </StaticRouter>
        </Provider>
    ))
    const helmet = Helmet.renderStatic() // 服务器端 helmet
    const cssStr = context.css.length ? context.css.join('\n') : '' // css 服务器端渲染
    return `
        <html>
            <head>
                ${helmet.title.toString()}
                ${helmet.meta.toString()}
                <style>${cssStr}</style>
            </head>
            <body>
                <div id="root">${content}</div>
                <script>
                    // 数据注水
                    window.context = {
                        state: ${JSON.stringify(store.getState())}
                    }
                </script>
                <script src='/index.js'></script>
            </body>
        </html>
    `
}