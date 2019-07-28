import * as constants from './constants'
import { fromJS } from 'immutable'

const defaultState = fromJS({
  writerList: [],
  total: 0,
  page: 1,
  loadingStatus: 'more'
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.GET_WRITER_LIST:
      const { list, total, append } = action
      return state.merge({
        writerList: append ? state.get('writerList').concat(list) : list,
        total
      })
    case constants.GET_LOADING_STATUS:
      return state.set('loadingStatus', action.status)
    case constants.GET_WRITER_LIST_PAGE:
      return state.set('page', action.page)
    default:
      return state
  }
}
