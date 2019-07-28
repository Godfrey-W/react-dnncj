import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { NavBar, Icon } from 'antd-mobile'
import { actionCreators as paginationActionCreators } from 'store/pagination'
import { actionCreators as loadMoreActionCreators } from 'store/loadmore'
import { actionCreators as writerInfoActionCreators } from './store'
import WriterInfo from './components/WriterInfo'

class Writer extends Component {
  componentDidMount() {
    const { match, getWriterInfo, getWriterArticle, setLoadingStatus, setPageNum } = this.props
    const writerId = match.params.writerId
    getWriterInfo(writerId)

    setPageNum(1)
    setLoadingStatus('loading')
    getWriterArticle({ writerId }).then(({ isLastPage }) => {
      if (isLastPage) {
        setLoadingStatus('noMore')
      } else {
        setLoadingStatus('more')
        setPageNum(2)
      }
    })
  }
  render() {
    const { writerInfo } = this.props
    return (
      <Fragment>
        <NavBar mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.goBack()}
        >作者详细</NavBar>
        {writerInfo && <WriterInfo data={writerInfo} />}
      </Fragment>
    )
  }
}

const mapSateToProps = state => ({
  pageNum: state.getIn(['pagination', 'pageNum']),
  loadingStatus: state.getIn(['loadmore', 'loadingStatus']),
  writerInfo: state.getIn(['writerInfo', 'writerInfo']),
  articleList: state.getIn(['writerInfo', 'articleList'])
})

const mapDispatchToProps = dispatch => ({
  setPageNum(pageNum) {
    dispatch(paginationActionCreators.setPageNum(pageNum))
  },
  setLoadingStatus(status) {
    dispatch(loadMoreActionCreators.setLoadingStatus(status))
  },
  getWriterInfo(writerId) {
    dispatch(writerInfoActionCreators.getWriterInfoAsync(writerId))
  },
  getWriterArticle(params, append) {
    return dispatch(writerInfoActionCreators.getWriterArticleAsync(params, append)).then(res => {
      return Promise.resolve(res)
    })
  }
})

export default connect(mapSateToProps, mapDispatchToProps)(Writer)
