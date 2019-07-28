import React from 'react'
import { Link } from 'react-router-dom'
import { Carousel, Icon } from 'antd-mobile'
import PropTypes from 'prop-types'
import styles from '../Home.module.scss'

const TopBroadcast = ({ broadcastList }) => {
  return (
    <div className={styles.wrapper}>
      <Carousel autoplay infinite dots={false}>
        {broadcastList.map((item, index) => (
          <img className={styles.bannerImg} src={item.img_url} alt={item.title} key={index} />
        ))}
      </Carousel>
      <div className={styles.searchBar}>
        <img className={styles.logo} src={require('assets/images/logo.png')} alt="" />
        <Link to="/" className={styles.searchLink}>
          <Icon type="search" size='sm' />
          <span>搜索</span>
        </Link>
      </div>
    </div>
  )
}

TopBroadcast.propTypes = {
  broadcastList: PropTypes.arrayOf(PropTypes.object)
}

TopBroadcast.defaultProps = {
  broadcastList: []
}

export default TopBroadcast
