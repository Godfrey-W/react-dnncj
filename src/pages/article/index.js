import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { NavBar, Icon } from 'antd-mobile'
import { actionCreators } from './store'

import styles from './Article.module.scss'

class Article extends Component {
  componentDidMount() {
    const { match, getArticleDetails } = this.props
    const artilce = match.params.articleId
    getArticleDetails(artilce)
  }
  getSnapshotBeforeUpdate(prevProps, prevState) {
    return prevProps.match.params.articleId
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    const { match, getArticleDetails } = this.props
    const artilceId = match.params.articleId
    if (snapshot !== artilceId) {
      window.scrollTo(0, 0)
      getArticleDetails(artilceId)
    }
  }
  render() {
    const { article } = this.props
    return (
      <Fragment>
        <NavBar mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.goBack()}
        >文章详情</NavBar>
        {article && (
          <div className={styles.articleWrapper}>
            <h3 className={styles.articleTitle}>{article.name}</h3>
            <div className={styles.articleRow}>
              <span>{article.createDate.split(' ')[0]}</span>
              <span>浏览量 {article.browseNumber}</span>
              <span>评论次 {article.reviewContent}</span>
            </div>
            <div className={styles.articleLabel}>{article.articleLabelName}</div>
            <div className={styles.articleContent}
              dangerouslySetInnerHTML={{ __html: article.articleDetails }}
            ></div>
            <div className={styles.articlePagination}>
              <div className={styles.articlePrevPage}>
                {article.uid && (
                  <Link className={styles.articleLink} replace to={`/article/${article.uid}`}>上一条</Link>
                )}
              </div>
              <div className={styles.articleNextPage}>
                {article.did && (
                  <Link className={styles.articleLink} replace to={`/article/${article.did}`}>下一条</Link>
                )}
              </div>
            </div>
          </div>
        )}
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  article: state.getIn(['article', 'articleDetails'])
})

const mapDispatchToProps = dispatch => ({
  getArticleDetails(articleId) {
    dispatch(actionCreators.getArticleDetailsAsync(articleId))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Article)
