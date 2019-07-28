import { combineReducers } from 'redux-immutable'

import { reducer as paginationReducer } from './pagination'
import { reducer as loadmoreReducer } from './loadmore'

import { reducer as homeReducer } from 'pages/tabbar/home/store'
import { reducer as writerReducer } from 'pages/tabbar/writer/store'
import { reducer as articleReducer } from 'pages/article/store'
import { reducer as writerInfoReducer } from 'pages/writer/store'

const reducer = combineReducers({
  pagination: paginationReducer,
  loadmore: loadmoreReducer,
  home: homeReducer,
  writer: writerReducer,
  article: articleReducer,
  writerInfo: writerInfoReducer
})

export default reducer
