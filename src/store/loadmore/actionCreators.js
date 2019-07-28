import * as constants from './constants'

export const setLoadingStatus = status => ({
  type: constants.SET_LOADING_STATUS,
  status
})
