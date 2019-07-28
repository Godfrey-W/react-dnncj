import * as constants from './constants'
import { getArticleDetailsById } from '../../../service/api'

export const getArticleDetails = data => ({
  type: constants.GET_ARTICLE_DETAILS,
  data
})

export const getArticleDetailsAsync = articleId => disaptch => {
  getArticleDetailsById(articleId).then(({success, body}) => {
    if (success) {
      disaptch(getArticleDetails(body.newsDetails))
    }
  })
}
