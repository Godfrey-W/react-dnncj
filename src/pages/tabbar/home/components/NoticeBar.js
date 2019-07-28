import React from 'react'
import { Link } from 'react-router-dom'
import { Carousel } from 'antd-mobile'
import PropTypes from 'prop-types'
import { ReactComponent as NoticeThumb } from 'assets/svg/notice.svg'
import styles from '../Home.module.scss'

const NoticeBar = ({ noticeList }) => (
  <div className={styles.noticeWrapper}>
    <div className={styles.noticeBar}>
      <div className={styles.noticeThumb}>
        <NoticeThumb />
      </div>
      <span className={styles.noticeLabel}>快报</span>
      <Carousel vertical
        dots={false}
        dragging={false}
        swiping={false}
        autoplay
        infinite
      >
        {noticeList.map((item, index) => (
          <Link to="/" className={styles.noticeLink} key={index}><span>{item.wbDetails}</span></Link>
        ))}
      </Carousel>
    </div>
  </div>
)

NoticeBar.propTypes = {
  noticeList: PropTypes.arrayOf(PropTypes.object)
}

NoticeBar.defaultProps = {
  noticeList: []
}

export default NoticeBar
