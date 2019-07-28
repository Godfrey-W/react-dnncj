import React from 'react'
import PropTypes from 'prop-types'
import styles from '../Home.module.scss'

const Advert = ({ advertList }) => (
  <div className={styles.advertWrapper}>
    <div className={styles.advertContent}>
      <div className={styles.advertList}>
        {advertList.map((item, index) => (
          <a href={item.hrefUrl} className={styles.advertLink} target="_blank" key={index}>
            <img src={item.imgUrl} alt={item.title} />
          </a>
        ))}
      </div>
    </div>
    <span className={styles.advertTag}>广告</span>
  </div>
)

Advert.propTypes = {
  advertList: PropTypes.arrayOf(PropTypes.object)
}

Advert.defaultProps = {
  advertList: []
}

export default Advert
