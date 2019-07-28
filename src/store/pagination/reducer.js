import * as constants from './constants'
import { fromJS } from 'immutable'

const defaultState = fromJS({
  pageNum: 1
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.GET_PAGINATION_PAGE:
      return state.set('pageNum', action.pageNum)
    default:
      return state
  }
}
