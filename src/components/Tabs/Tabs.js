import React from 'react'
import { connect } from 'react-redux'

import actions from '../actions'

import styles from './index.module.scss'

const Tabs = ({ handleTabsClick, store }) => {
  return (
    <div className={styles.tabs}>
      <div
        className={`${styles['tabs-part']} ${store.chooseTabs === 1 ? styles.active : ''}`}
        onClick={() => handleTabsClick(1)}
      >
        САМЫЙ ДЕШЕВЫЙ
      </div>
      <div
        className={`${styles['tabs-part']} ${store.chooseTabs === 2 ? styles.active : ''}`}
        onClick={() => handleTabsClick(2)}
      >
        САМЫЙ БЫСТРЫЙ
      </div>
      <div
        className={`${styles['tabs-part']} ${store.chooseTabs === 3 ? styles.active : ''}`}
        onClick={() => handleTabsClick(3)}
      >
        ОПТИМАЛЬНЫЙ
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({ store: state })

export default connect(mapStateToProps, actions)(Tabs)
