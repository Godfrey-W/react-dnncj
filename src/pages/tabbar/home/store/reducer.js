import { fromJS } from 'immutable'
import * as constants from './constants'

const defaultState = fromJS({
  broadcastList: [],
  noticeList: [],
  advertList: [],
  newsTypes: [],
  newsList: [],
  loadingStatus: 'more',  // more更多 noMore暂无更多 loading加载中
  page: 1
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.GET_HOME_BROADCAST:
      return state.set('broadcastList', action.data)
    case constants.GET_HOME_NOTICE:
      return state.set('noticeList', action.data)
    case constants.GET_HOME_ADVERT_INFO:
      return state.set('advertList', action.data)
    case constants.GET_HOME_NEWS_TYPES:
      return state.set('newsTypes', action.data)
    case constants.GET_HOME_NEWS_LIST:
      const newsList = state.get('newsList')
      return state.set('newsList', action.append ? newsList.concat(action.data) : action.data)
    case constants.GET_HOME_LOADING_STATUS:
      return state.set('loadingStatus', action.status)
    case constants.GET_HOME_NEWS_PAGE:
      return state.set('page', action.page)
    default:
      return state
  }
}
