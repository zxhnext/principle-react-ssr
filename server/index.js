import express from 'express'
import proxy from 'express-http-proxy' // node 变成代理服务器 (易于代码纠错)
import { matchRoutes } from 'react-router-config'
import cookieParser from 'cookie-parser'
import { render } from './utils'
import { getStore } from '../src/store/index'
import routes from '../src/Routes'
import { ok } from 'assert'

const app = express()
app.use(express.static('public'))
app.use(cookieParser())

// 当访问 /api 路由时代理到指定服务器地址
// app.use('/api', proxy('http://47.95.113.63', {
//     proxyReqPathResolver: function(req) {
//         // console.log(req.url) // /news.json?secret=PP87ANTIPIRATE
//         return '/ssr/api' + req.url
//     }
// }))

app.get('/api/newslist', (req, res) => {
    let data = [
        {
            id: 0,
            title: 'oneoneoneoneoneone'
        },
        {
            id: 1,
            title: 'twotwotwotwotwotwo'
        },
        {
            id: 2,
            title: 'threethreethreethreethreethree'
        },
        {
            id: 3,
            title: 'fourfourfourfourfourfour'
        },
        {
            id: 4,
            title: 'fivefivefivefivefivefive'
        },
        {
            id: 5,
            title: 'sixsixsixsixsixsix'
        },
    ]
    res.end(JSON.stringify({status: 200, message: 'ok', data}));
})

app.get('/api/login', (req, res) => {
    let data = {login: true}
    res.cookie('name', 'zxhnext', {maxAge: 60 * 1000, httpOnly: true})
    res.end(JSON.stringify({status: 200, message: 'ok', data}));
})

app.get('/api/logout', (req, res) => {
    let data = {login: false}
    res.cookie('name', '', { expires: new Date(0)})
    res.end(JSON.stringify({status: 200, message: 'ok', data}));
})

app.get('/api/isLogin', (req, res) => {
    let data;
    if(req.cookies.name) {
        data = {login: true}
    } else {
        data = {login: false}
    }
    
    res.end(JSON.stringify({status: 200, message: 'ok', data}));
})

app.get('/api/translation', (req, res) => {
    let params;
    if(req.cookies.name) {
        params = {
            status: 200,
            message: 'ok',
            data: [
                {
                    id: 1,
                    title: '111111'
                },
                {
                    id: 2,
                    title: '222222'
                },
                {
                    id: 3,
                    title: '333333'
                },
                {
                    id: 4,
                    title: '444444'
                },
                {
                    id: 5,
                    title: '555555'
                },
                {
                    id: 0,
                    title: '666666'
                },
            ]
        }
    } else {
        params = {
            status: 1,
            message: 'fail',
            data: {}
        }
    }
    res.end(JSON.stringify(params));
})

// 做ssr时root里不要有空格，即<div id="root">${content}</div>这里携程一行，不要折行
app.get('*', (req, res) => {
    const store = getStore(req)
    // 拿到异步数据，填充到store中,根据用户访问路径，拿取对应页面的store
    // 根据路由，向store中加数据

    // 只能匹配单级路由
    // const matchedRoutes = []
    // routes.some(route => { // some，遍历
    //     const match = matchPath(req.path, route)
    //     if (match) { // 如果请求路径与路由匹配
    //         matchedRoutes.push(route)
    //     }
    // })

    const matchedRoutes = matchRoutes(routes, req.path)
    
    const promises = []
    matchedRoutes.forEach(item => {
        if (item.route.loadData) {
            const promise = new Promise((resolve, reject) => {
              item.route
                .loadData(store)
                .then(resolve)
                .catch(resolve)
            })
            // promises.push(item.route.loadData(store))
            promises.push(promise)
        }
    })
    Promise.all(promises).then(() => {
        const context = {
            css: []
        }
        const html = render(store, routes, req, context)
        // console.log(context)
        if (context.action === 'REPLACE') { // 301 重定向, StaticRouter 发现有 Redict 就会注入 context 301 重定向内容
            res.redirect(301, context.url)
        }
        if (context.NOT_FOUND) {
            res.status(404)
            res.send(html)
        } else {
            res.send(html)
        }
    })
})

var server = app.listen(3000)