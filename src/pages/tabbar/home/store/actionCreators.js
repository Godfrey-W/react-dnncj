import * as constants from './constants'
import { getHomeBroadcast, getHomeNotice, getHomeAdvertInfo, getHomeNews } from 'service/api'

export const getBroadcast = data => ({
  type: constants.GET_HOME_BROADCAST,
  data
})
export const getBroadcastAsync = () => dispatch => {
  getHomeBroadcast().then(({success, body}) => {
    if (success) {
      dispatch(getBroadcast(body.broadcastMap))
    }
  })
}

export const getNotice = data => ({
  type: constants.GET_HOME_NOTICE,
  data
})
export const getNoticeAsync = () => dispatch => {
  getHomeNotice().then(({success, body}) => {
    if (success) {
      dispatch(getNotice(body.bulletinList))
    }
  })
}

export const getAdvertInfo = data => ({
  type: constants.GET_HOME_ADVERT_INFO,
  data
})
export const getAdvertInfoAsync = () => dispatch => {
  getHomeAdvertInfo().then(({success, body}) => {
    if (success) {
      dispatch(getAdvertInfo(body.advertinfoMap))
    }
  })
}

export const getNewsTypes = data => ({
  type: constants.GET_HOME_NEWS_TYPES,
  data
})
export const getNewsList = (data, append) => ({
  type: constants.GET_HOME_NEWS_LIST,
  data,
  append
})
export const updateLoadingSatus = status => ({
  type: constants.GET_HOME_LOADING_STATUS,
  status
})
export const getNewsPage = page => ({
  type: constants.GET_HOME_NEWS_PAGE,
  page
})
export const getNewsInfoAsync = (newsParams = {}, append = false) => dispatch => {
  dispatch(updateLoadingSatus('loading'))
  getHomeNews(newsParams).then(({success, body}) => {
    if (success) {
      const { newClassCount, articleList, pages } = body
      dispatch(getNewsTypes(newClassCount))
      dispatch(getNewsList(articleList, append))
      let loadingStatus
      let page = newsParams.pageNo || 1
      if (page < pages) {
        loadingStatus = 'more'
        dispatch(getNewsPage(page + 1))
      } else {
        loadingStatus = 'noMore'
      }
      dispatch(updateLoadingSatus(loadingStatus))
    }
  })
}