import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'antd-mobile'

import styles from './SearchBar.module.scss'

class SearchBar extends Component {
  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    onSubmit: PropTypes.func
  }
  static defaultProps = {
    value: '',
    onChange: () => { },
    onSubmit: () => { }
  }
  constructor(props) {
    super(props)

    this.state = {
      keyword: this.props.value || ''
    }

    this.onChange = this.onChange.bind(this)
    this.onKeyUp = this.onKeyUp.bind(this)
  }
  onChange(ev) {
    const keyword = ev.target.value
    this.setState({ keyword }, () => {
      this.props.onChange(keyword)
    })
  }
  onKeyUp(ev) {
    ev.persist()
    if (ev.keyCode === 13) {
      this.props.onSubmit(this.state.keyword)
    }
  }
  render() {
    const { keyword } = this.state
    const { onSubmit } = this.props
    return (
      <div className={styles.searchBarWrapper}>
        <div className={styles.searchBar}>
          <div className={styles.searchBarControl}>
            <Icon type="search" size="xs" />
            <input className={styles.searchBarInput}
              value={keyword}
              onChange={this.onChange}
              onKeyUp={this.onKeyUp}
              placeholder="关键字"
            />
          </div>
          <button type="button"
            className={styles.searchBarButton}
            onClick={() => onSubmit(keyword)}
          >搜索</button>
        </div>
      </div>
    )
  }
}

export default SearchBar
