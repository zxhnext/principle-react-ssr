import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { reducer as homeReducter } from '../containers/Home/store/'
import { reducer as headerReducter } from '../components/Header/store/'
import { reducer as translationReducter } from '../containers/Translation/store/'
import clientAxios from '../../client/request'
import serverAxios from '../../server/request'

const reducer = combineReducers({
    home: homeReducter,
    header: headerReducter,
    translation: translationReducter
  })
  

export const getStore = (req) => {
    // withExtraArgument 支持传入额外的参数，这里用来判断是客户端还是服务端
    return createStore(reducer, applyMiddleware(thunk.withExtraArgument(serverAxios(req))))
}

export const getClientStore = (req) => {
  const defaultState = window.context.state // 数据脱水
  return createStore(reducer, defaultState, applyMiddleware(thunk.withExtraArgument(clientAxios)))
}

export default {getStore, getClientStore}