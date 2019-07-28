import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { ReactComponent as EyeSvg } from 'assets/svg/eye.svg'
import { ReactComponent as CommentSvg } from 'assets/svg/comment.svg'
import { ReactComponent as FireSvg } from 'assets/svg/fire.svg'
import styles from '../Home.module.scss'

const NewsTag = ({ type }) => {
  let tagCls, tagName
  switch (type) {
    case 0:
      tagCls = styles.newsLatestTag
      tagName = '最新'
      break;
    case 1:
      tagCls = styles.newsChoiceTag
      tagName = '精荐'
      break;
    case 2:
      tagCls = styles.newsHotTag
      tagName = '热门'
      break;
    case 3:
      tagCls = styles.newsRecommendTag
      tagName = '推荐'
      break;
    default:
      tagCls = ''
      tagName = ''
      break;
  }
  return (
    <span className={[styles.newsTag, tagCls].join(' ')}>{tagName}</span>
  )
}

const NewsItem = ({ data }) => (
  <section className={styles.news}>
    <Link className={styles.newsLink} to={`/article/${data.id}`}>
      <div className={styles.newsCover}>
        <img src={data.coverUrl} alt={data.name} />
      </div>
      <div className={styles.newsBody}>
        <h3 className={styles.newsTitle}>
          {[0, 1, 2, 3].includes(data.articleType) && <NewsTag type={data.articleType} />}
          {data.name}
        </h3>
        <div className={styles.newsInfo}>
          <span>{data.nickname}</span>
          <span>{data.createDate.split(' ')[0]}</span>
        </div>
        <div className={styles.newsRow}>
          <span>
            <EyeSvg />{data.browseNumber}
          </span>
          <span>
            <CommentSvg />{data.evaluateNumber}
          </span>
          <span>
            <FireSvg />{data.onlineNum}
          </span>
        </div>
      </div>
    </Link>
  </section>
)

NewsItem.propTypes = {
  data: PropTypes.object
}

export default NewsItem
