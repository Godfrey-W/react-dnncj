import * as constants from './constants'
import {fromJS} from 'immutable'

const defaultState = fromJS({
  loadingStatus: 'more'
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.SET_LOADING_STATUS:
      return state.set('loadingStatus', action.status)
    default:
      return state
  }
}
