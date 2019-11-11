import React, { Component, Fragment } from 'react'
import { Helmet } from 'react-helmet' // 定制页面 title & description
import { connect } from 'react-redux'
import { getHomeList } from './store/action'
import styles from './style.css'
import withStyle from './../../WithStyle'

class Home extends Component {
    render() {
        return (
            <Fragment>
                <Helmet>
                    <title>gan react-ssr</title>
                    <meta name='description' content='gan react-ssr' />
                </Helmet>
                <div className={styles.container}>
                    <div>Home, {this.props.name}</div>
                    {this.getList()}
                    <button onClick={() => {alert('click1')}}>click</button>
                </div>
            </Fragment>
        )
    }

    // 服务端不会执行
    componentDidMount() { // 只在客户端渲染
        if (!this.props.list.length) {
          this.props.getHomeList(false)
        }
    }

    getList() {
        const {list} = this.props
        return list.map(item => <div key={item.id}>{item.title}</div>)
    }
    
}

// 服务器端渲染前把这个路由需要的数据提前加载好
// Home.loadData = (store) => {
//     return store.dispatch(getHomeList(true)) // return promises result, because getHomeList() return promise result
// }

const mapStateToProps = state => ({
    list: state.home.list,
    name: state.home.name
})

const mapDispatchToProps = dispatch => ({
    getHomeList() {
        dispatch(getHomeList())
    }
})

// export default connect(mapStateToProps, mapDisPatchToProps)(withStyle(Home, styles));

// 这样写将loadData方法挂载在导出的组件上，上面的写法没有挂载到导出的组件上
const ExportHome = connect(mapStateToProps, mapDispatchToProps)(withStyle(Home, styles))
ExportHome.loadData = (store) => {
    return store.dispatch(getHomeList())
}

export default ExportHome