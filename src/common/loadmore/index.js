import React from 'react'
import { Icon } from 'antd-mobile'
import PropTypes from 'prop-types'
import styles from './LoadMore.module.scss'

const LoadMore = ({ loadingStatus }) => {
  const loadingStatusMap = {
    'loading': '正在加载...',
    'more': '上拉加载更多',
    'noMore': '没有数据了'
  }
  return (
    <div className={styles.loadmore}>
      {loadingStatus === 'loading' && <Icon type="loading" size="xs" />}
      <span>{loadingStatusMap[loadingStatus]}</span>
    </div>
  )
}

LoadMore.propTypes = {
  loadingStatus: PropTypes.string
}

LoadMore.defaultProps = {
  loadingStatus: 'more'
}

export default LoadMore
