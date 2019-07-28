import * as constants from './constants'
import { fromJS } from 'immutable'

const defaultState = fromJS({
  writerInfo: null,
  articleList: []
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.GET_WRITER_INFO:
      return state.set('writerInfo', action.data)
    case constants.GET_WRITER_ARTICLE:
      const { list, append } = action
      const articleList = state.get('articleList')
      return state.set('articleList', append ? articleList.concat(list) : list)
    default:
      return state
  }
}
