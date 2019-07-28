import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from '../Home.module.scss'

class NewsTabs extends Component {
  static propsTypes = {
    newsTypes: PropTypes.arrayOf(PropTypes.object),
    onClick: PropTypes.func
  }
  static defaultProps = {
    newsTypes: [],
    onClick: (index) => {}
  }
  constructor(props) {
    super(props)
    this.state = {
      tabActiveIndex: 0,
      translateX: 0,
      needTransition: false,
      triangleWidth: 0,
      triangleTranslateX: 0
    }
    this.wrapperRef = React.createRef()
    this.listRef = React.createRef()

    this.onTouchStart = this.onTouchStart.bind(this)
    this.onTouchMove = this.onTouchMove.bind(this)
    this.onTouchEnd = this.onTouchEnd.bind(this)
  }
  _startX = 0
  _offsetX = 0
  _tabItems = null
  _wrapperWidth = 0
  _scrollWidth = 0
  componentDidMount() {
    const { wrapperRef, listRef } = this
    this._wrapperWidth = wrapperRef.current.offsetWidth
    this._tabItems = Array.from(listRef.current.children)
    this._tabItems.forEach((tab, index) => {
      if (this.state.tabActiveIndex === index) {
        this.setState({triangleWidth: tab.offsetWidth})
      }
      this._scrollWidth += tab.offsetWidth
    })
  }
  componentWillMount() {
    this.removeEvent()
  }
  onTouchStart(ev) {
    ev.persist()
    const touch = ev.changedTouches[0]
    this._startX = touch.clientX
    this.setState({ needTransition: false })
    document.addEventListener('touchmove', this.onTouchMove, false)
    document.addEventListener('touchend', this.onTouchEnd, false)
  }
  onTouchMove(ev) {
    const touch = ev.changedTouches[0]
    const diffX = touch.clientX - this._startX
    this.setState({ translateX: this._offsetX + diffX })
  }
  onTouchEnd(ev) {
    const touch = ev.changedTouches[0]
    const diffX = touch.clientX - this._startX
    this._offsetX += diffX

    const { _offsetX, _scrollWidth, _wrapperWidth } = this
    if (_offsetX > 0) {
      this._offsetX = 0
      this.setState({
        needTransition: true,
        translateX: this._offsetX
      })
    }
    if (_scrollWidth - _wrapperWidth < - _offsetX) {
      this._offsetX = -(_scrollWidth - _wrapperWidth)
      this.setState({
        needTransition: true,
        translateX: this._offsetX
      })
    }

    this.removeEvent()
  }
  tabItemClick(index) {
    let leftWidth = 0
    for (let i = 0; i < this._tabItems.length; i++) {
      if (i >= index) break
      leftWidth += this._tabItems[i].offsetWidth
    }
    const { _wrapperWidth, _scrollWidth, _tabItems, _offsetX } = this
    const distance = _wrapperWidth / 2 - (leftWidth + _offsetX + _tabItems[index].offsetWidth / 2)
    let offset = _offsetX + distance
    if (offset > 0) {
      offset = 0
    }
    if (_scrollWidth - leftWidth < _wrapperWidth / 2) {
      offset = -(_scrollWidth - _wrapperWidth)
    }
    this._offsetX = offset
    this.setState({
      tabActiveIndex: index,
      translateX: offset,
      needTransition: true,
      triangleWidth: _tabItems[this.state.tabActiveIndex].offsetWidth,
      triangleTranslateX: leftWidth
    })
    this.props.onClick(index)
  }
  removeEvent() {
    document.removeEventListener('touchmove', this.onTouchMove, false)
    document.removeEventListener('touchend', this.onTouchEnd, false)
  }
  render() {
    const { tabActiveIndex, translateX, needTransition, triangleWidth, triangleTranslateX } = this.state
    const { newsTypes } = this.props
    const contentStyles = {
      transition: needTransition ? 'transform 200ms' : '',
      transform: `translate3d(${translateX}px, 0, 0)`
    }
    const triangleStyles = {
      width: `${triangleWidth}px`,
      transform: `translate3d(${triangleTranslateX}px, 0, 0)`
    }
    return (
      <div className={styles.newsTabs} ref={this.wrapperRef} onTouchStart={this.onTouchStart}>
        <div className={styles.newsTabList} style={contentStyles} ref={this.listRef}>
          {newsTypes.map((item, index) => (
            <div
              className={[styles.newsTabItem, tabActiveIndex === index ? styles.newsTabItemActive : ''].join(' ')}
              onClick={() => this.tabItemClick(index)}
              key={item.type}>{item.label}</div>
          ))}
          <span className={styles.newsTabTriangle} style={triangleStyles}></span>
        </div>
      </div>
    )
  }
}

export default NewsTabs
