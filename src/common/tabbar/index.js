import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Tabbar.module.scss'

const navList = [
  { name: '新闻', path: '/' },
  { name: '项目', path: '/project' },
  { name: '交易所', path: '/exchange' },
  { name: '作者', path: '/writer' },
  { name: '个人', path: '/user' }
]

export default () => (
  <footer className={styles.tabbarWrapper}>
    <nav className={styles.tabbarNav}>
      {navList.map((nav, index) => (
        <NavLink exact to={nav.path} activeClassName={styles.tabbarNavLinkActive} key={index}>
          <i className={styles.tabbarIcon}></i>
          <span>{nav.name}</span>
        </NavLink>
      ))}
    </nav>
  </footer>
)
