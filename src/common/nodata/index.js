import React from 'react'
import { ReactComponent as NoDataSvg } from 'assets/svg/nodata.svg'
import styles from './NoData.module.scss'

export default () => (
  <div className={styles.nodata}>
    <NoDataSvg />
  </div>
)
