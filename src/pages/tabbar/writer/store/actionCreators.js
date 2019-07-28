import * as constants from './constants'
import { findWriterList } from 'service/api'

export const getWriterList = (list, total, append) => ({
  type: constants.GET_WRITER_LIST,
  list,
  total,
  append
})
export const setLoadingStatus = status => ({
  type: constants.GET_LOADING_STATUS,
  status
})
export const setPage = page => ({
  type: constants.GET_WRITER_LIST_PAGE,
  page
})
export const getWriterListAsync = (params, append = false) => dispatch => {
  dispatch(setLoadingStatus('loading'))
  findWriterList(params).then(({ success, body }) => {
    if (success) {
      const { writerList, pageTotal, isLastPage, nextPage } = body
      dispatch(getWriterList(writerList, pageTotal, append))
      dispatch(setLoadingStatus(isLastPage ? 'noMore' : 'more'))
      if (!isLastPage) {
        dispatch(setPage(nextPage))
      }
    }
  })
}
