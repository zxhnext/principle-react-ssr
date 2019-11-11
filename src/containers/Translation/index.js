import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { getTranslationList } from './store/action'
import { Redirect } from 'react-router-dom' // 限于客户端重定向
import { Helmet } from 'react-helmet' // 定制页面 title & description
import styles from './style.css'
import withStyle from './../../WithStyle'

class Translation extends Component {
    render() {
        return this.props.login
            ?
            <Fragment>
                <Helmet>
                    <title>gan react-ssr</title>
                    <meta name='description' content='gan react-ssr' />
                </Helmet>
                <div>
                    {this.getList()}
                </div>
            </Fragment> :
            <Redirect to='/' />
    }

    // 服务端不会执行
    componentDidMount() { // 只在客户端渲染
        if (!this.props.list.length) {
          this.props.getTranslationList()
        }
    }

    getList() {
        const {list} = this.props
        return list.map(item => <div key={item.id}>{item.title}</div>)
    }
    
}

// 服务器端渲染前把这个路由需要的数据提前加载好
// Translation.loadData = (store) => {
//     return store.dispatch(getTranslationList(true))
// }

const mapStateToProps = state => ({
    list: state.translation.translationList,
    login: state.header.login
})

const mapDispathToProps = dispatch => ({
    getTranslationList() {
      dispatch(getTranslationList())
    }
})

// export default connect(mapStateToProps, mapDispathToProps)(withStyle(Translation, styles));

// loadData 潜在问题修复
const ExportTranslation = connect(mapStateToProps, mapDispathToProps)(withStyle(Translation, styles))
ExportTranslation.loadData = (store) => {
    return store.dispatch(getTranslationList())
}

export default ExportTranslation