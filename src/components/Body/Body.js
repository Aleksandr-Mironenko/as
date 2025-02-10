import React from 'react'
import { connect } from 'react-redux'

import Filter from '../Filter'
import GeneralPage from '../GeneralPage'
import actions from '../actions'

import styles from './index.module.scss'

const Body = ({ store }) => (
  <div className={styles.body}>
    {store.sizeMonitor > 716 ? <Filter /> : <></>}
    <GeneralPage />
  </div>
)
const mapStateToProps = (state) => ({ store: state })

export default connect(mapStateToProps, actions)(Body)
