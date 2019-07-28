import * as constants from './constants'

export const setPageNum = pageNum => ({
  type: constants.GET_PAGINATION_PAGE,
  pageNum
})
