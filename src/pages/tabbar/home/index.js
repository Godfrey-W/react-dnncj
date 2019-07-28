import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { actionCreators } from './store'
import TopBroadcast from './components/TopBanner'
import NoticeBar from './components/NoticeBar'
import Advert from './components/Advert'
import NewsTabs from './components/NewsTabs'
import NewsItem from './components/NewsItem'
import TabBar from 'common/tabbar'
import styles from './Home.module.scss'

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      newsType: 1
    }

    this.onScroll = this.onScroll.bind(this)
  }
  componentDidMount() {
    this.props.getHomeInfo()
    this.props.getHomeNewsInfo()

    document.addEventListener('scroll', this.onScroll, false)
  }
  componentWillUnmount() {
    document.removeEventListener('scroll', this.onScroll, false)
  }
  onTabChange(index) {
    const { newsTypes, setNewsPage, getHomeNewsInfo, updateLoadingSatus } = this.props
    const type = newsTypes[index].type
    this.setState({ newsType: type })
    setNewsPage(1)
    updateLoadingSatus('more')
    getHomeNewsInfo({ type })
  }
  onScroll() {
    const { loadingStatus, getHomeNewsInfo, page } = this.props
    const docEl = document.documentElement
    const scrollTop = docEl.scrollTop
    const scrollHeight = docEl.scrollHeight
    const clientHeight = docEl.clientHeight
    if (scrollHeight - scrollTop - clientHeight > 0) return
    if (loadingStatus === 'loading' || loadingStatus === 'noMore') return
    getHomeNewsInfo({ type: this.state.newsType, pageNo: page }, true)
  }
  render() {
    const { broadcastList, noticeList, advertList, newsTypes, newsList, loadingStatus } = this.props
    return (
      <Fragment>
        {broadcastList.length > 0 && <TopBroadcast broadcastList={broadcastList} />}
        {noticeList.length > 0 && <NoticeBar noticeList={noticeList} />}
        {advertList.length > 0 && <Advert advertList={advertList} />}
        {newsTypes.length > 0 && <NewsTabs newsTypes={newsTypes} onClick={index => this.onTabChange(index)} />}
        {newsList.length > 0 && newsList.map(data => <NewsItem data={data} key={data.id} />)}
        <div className={styles.loadmore}>
          <span>
            {loadingStatus === 'loading' ? '正在加载...' : (loadingStatus === 'more' ? '上拉加载更多' : '暂无更多数据')}
          </span>
        </div>
        <TabBar />
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  broadcastList: state.getIn(['home', 'broadcastList']),
  noticeList: state.getIn(['home', 'noticeList']),
  advertList: state.getIn(['home', 'advertList']),
  newsTypes: state.getIn(['home', 'newsTypes']),
  newsList: state.getIn(['home', 'newsList']),
  page: state.getIn(['home', 'page']),
  loadingStatus: state.getIn(['home', 'loadingStatus'])
})

const mapDispatchToProps = dispatch => ({
  getHomeInfo() {
    dispatch(actionCreators.getBroadcastAsync())
    dispatch(actionCreators.getNoticeAsync())
    dispatch(actionCreators.getAdvertInfoAsync())
  },
  getHomeNewsInfo(newsParams, append) {
    dispatch(actionCreators.getNewsInfoAsync(newsParams, append))
  },
  setNewsPage(page) {
    dispatch(actionCreators.getNewsPage(page))
  },
  updateLoadingSatus(status) {
    dispatch(actionCreators.updateLoadingSatus(status))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
