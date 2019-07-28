import React from 'react'
import PropTypes from 'prop-types'
import { ReactComponent as WriterSvg } from 'assets/svg/writer.svg'
import { ReactComponent as InfoSvg } from 'assets/svg/info.svg'
import { ReactComponent as EyeSvg } from 'assets/svg/eye_solid.svg'
import styles from '../Writer.module.scss'

const WriterInfo = ({ data }) => (
  <div className={styles.writerInfo}>
    <div className={styles.writerInfoContent}>
      <div className={styles.writerCover}>
        <img src={data.imUrl} alt={data.nickname} />
      </div>
      <div className={styles.writerInfoBody}>
        <div className={styles.nickname}>
          <WriterSvg />
          <span>{data.nickname}</span>
        </div>
        <p className={styles.signature}>{data.signature}</p>
      </div>
    </div>
    <div className={styles.writerInfoRow}>
      <div className={styles.writerInfoRowItem}>
        <InfoSvg />
        <span>发表文章总数</span>
        <em>{data.articleNumber}</em>
      </div>
      <div className={styles.writerInfoRowItem}>
        <EyeSvg />
        <span>文章总浏览量</span>
        <em>{data.browseNumber}</em>
      </div>
    </div>
  </div>
)

WriterInfo.propTypes = {
  data: PropTypes.object
}

WriterInfo.defaultProps = {
  data: {}
}

export default WriterInfo
