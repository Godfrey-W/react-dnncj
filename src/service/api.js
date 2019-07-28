import * as http from './http'

const paginationParams = {
  pageNum: 1,
  pageSize: 10
}

// 首页轮播
export function getHomeBroadcast() {
  return http.post('broadcastAll_y', { addressType: 1 })
}

// 首页快报
export function getHomeNotice() {
  return http.post('findWallBulletin_y', { type: 1 })
}

// 首页广告
export function getHomeAdvertInfo() {
  return http.post('advertinfoAll_y', { addressType: 1 })
}

// 首页新闻
export function getHomeNews(params = {}) {
  const defaultParams = {
    pageNo: 1,
    pageSize: 10,
    type: 1,
    titleStr: ''
  }
  return http.post('newsShow_y', { ...defaultParams, ...params })
}

// 文章详情
export function getArticleDetailsById(articleId) {
  return http.post('newsDetails_y', { articleId })
}

// 作家列表
export function findWriterList(params = {}) {
  const defaultParams = {
    ...paginationParams,
    nickname: ''
  }
  return http.post('findWriterList_x', { ...defaultParams, ...params })
}

// 作家信息
export function findWriterInfo(writerId) {
  return http.post('findWriterInfo_x', { writerId })
}

// 作家文章
export function findWriterArticle(params = {}) {
  const defaultParams = {
    ...paginationParams,
    writerId: ''
  }
  return http.post('writerArticleList_x', { ...defaultParams, ...params })
}
