import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { ListView } from 'antd-mobile'
import { actionCreators } from './store'
import SearchBar from 'common/searchbar'
import TabBar from 'common/tabbar'
import LoadMore from 'common/loadmore'
import NoData from 'common/nodata'
import { ReactComponent as WriterSvg } from 'assets/svg/writer.svg'
import styles from './Writer.module.scss'

function renderRow(data) {
  return (
    <div className={styles.writerItem} key={data.writerId}>
      <Link to={`/writerinfo/${data.writerId}`} className={styles.writerLink}>
        <div className={styles.writerCover}>
          <img src={data.imUrl} alt={data.nickname} />
        </div>
        <div className={styles.writerBody}>
          <h3 className={styles.nickname}>{data.nickname}</h3>
          <div className={styles.browseNumber}>文章总浏览量<span>{data.browseNumber}</span></div>
          <p className={styles.signature}>{data.signature}</p>
        </div>
      </Link>
    </div>
  )
}

class Writer extends Component {
  constructor(props) {
    super(props)

    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    })

    this.state = {
      dataSource,
      keyword: ''
    }

    this.onEndReached = this.onEndReached.bind(this)
    this.onSearch = this.onSearch.bind(this)
  }
  componentDidMount() {
    this.props.getWriterList()
  }
  onSearch() {
    this.props.resetWhenSearch().then(() => {
      this.loadMore()
    })
  }
  onEndReached() {
    this.loadMore(true)
  }
  loadMore(append) {
    const { loadingStatus, page, getWriterList } = this.props
    if (loadingStatus === 'loading' || loadingStatus === 'noMore') return
    getWriterList({ pageNum: page, nickname: this.state.keyword }, append)
  }
  render() {
    const { total, writerList, loadingStatus } = this.props
    const { dataSource, keyword } = this.state
    return (
      <Fragment>
        <SearchBar value={keyword}
          onChange={keyword => this.setState({ keyword })}
          onSubmit={this.onSearch}
        />
        <div className={styles.writerTotal}>
          <WriterSvg />全部作者<span>{total}</span>位
        </div>
        <div className={styles.writerList}>
          {writerList.length > 0 ? (
            <ListView
              dataSource={dataSource.cloneWithRows(writerList)}
              renderRow={rowData => renderRow(rowData)}
              initialListSize={10}
              pageSize={10}
              useBodyScroll
              onEndReached={this.onEndReached}
              onEndReachedThreshold={10}
              renderFooter={() => <LoadMore loadingStatus={loadingStatus} />}
            />
          ) : null}
        </div>
        {writerList.length === 0 && loadingStatus === 'noMore' && <NoData />}
        <TabBar />
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  writerList: state.getIn(['writer', 'writerList']),
  total: state.getIn(['writer', 'total']),
  page: state.getIn(['writer', 'page']),
  loadingStatus: state.getIn(['writer', 'loadingStatus'])
})

const mapDispatchToProps = dispatch => ({
  getWriterList(params, append) {
    dispatch(actionCreators.getWriterListAsync(params, append))
  },
  resetWhenSearch() {
    return new Promise((resolve, reject) => {
      try {
        dispatch(actionCreators.setPage(1))
        dispatch(actionCreators.setLoadingStatus('more'))
        resolve()
      } catch (error) {
        reject()
      }
    })
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Writer)
