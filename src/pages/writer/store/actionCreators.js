import * as constants from './constants'
import { findWriterInfo, findWriterArticle } from 'service/api'

export const getWriterInfo = data => ({
  type: constants.GET_WRITER_INFO,
  data
})

export const getWriterArticle = (list, append) => ({
  type: constants.GET_WRITER_ARTICLE,
  list,
  append
})

export const getWriterInfoAsync = writerId => dispatch => {
  findWriterInfo(writerId).then(({ success, body }) => {
    if (success) {
      dispatch(getWriterInfo(body.writerInfo))
    }
  })
}

export const getWriterArticleAsync = (params = {}, append) => dispatch => {
  return findWriterArticle(params).then(({ success, body }) => {
    if (success) {
      const { writerArticleList } = body
      dispatch(getWriterArticle(writerArticleList, append))
      return Promise.resolve(body)
    }
  })
}

