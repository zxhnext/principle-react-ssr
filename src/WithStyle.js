import React, { Component } from 'react'

// 生成高阶组件函数
export default (DecoratedComponent, styles) => {
    // 返回的这个组件，叫高阶组件
    return class NewComponent extends Component {
      render() {
          return <DecoratedComponent {...this.props} />
      }
      componentWillMount() {
          if (this.props.staticContext) { // css 服务器端渲染
              this.props.staticContext.css.push(styles._getCss()) // isomorphic-style-loader中的方法
          }
      }
    }
}
