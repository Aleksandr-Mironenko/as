import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import AppData from '../AppData'
import Tabs from '../Tabs/Tabs'
import ZeroTickets from '../ZeroTickets'
import actions from '../actions'
import Loading from '../Loading'
import Filter from '../Filter'

import styles from './index.module.scss'

const GeneralPage = ({ store, addAmountRenderTicket, sizeMonitor }) => {
  const { chooseTransfer, load } = store

  const content = load ? <Loading /> : <AppData />
  const addButton = load ? (
    <></>
  ) : chooseTransfer.length > 0 ? (
    <button className={styles.buttonBottom} onClick={addAmountRenderTicket}>
      ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ!
    </button>
  ) : (
    <ZeroTickets />
  )

  useEffect(
    () => {
      const handleResize = () => {
        sizeMonitor(window.innerWidth)
      }

      window.addEventListener('resize', handleResize)

      return () => {
        window.removeEventListener('resize', handleResize)
      }
    },
    [
      // sizeMonitor
    ]
  )

  return (
    <div className={styles.generalPage}>
      <Tabs />
      {store.sizeMonitor > 716 ? <></> : <Filter />}
      {content}
      {addButton}
    </div>
  )
}

const mapStateToProps = (state) => ({ store: state })

export default connect(mapStateToProps, actions)(GeneralPage)
