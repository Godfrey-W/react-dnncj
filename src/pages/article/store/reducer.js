import { fromJS } from 'immutable'
import * as constants from './constants'

const defaultState = fromJS({
  articleDetails: null
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.GET_ARTICLE_DETAILS:
      return state.set('articleDetails', action.data)
    default:
      return state
  }
}
