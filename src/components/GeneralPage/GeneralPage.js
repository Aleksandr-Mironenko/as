import React, { useEffect, useCallback } from 'react'
import { connect } from 'react-redux'

import AppData from '../AppData'
import Tabs from '../Tabs/Tabs'
import ZeroTickets from '../ZeroTickets'
import actions from '../actions'
import Loading from '../Loading'
import Filter from '../Filter'

import styles from './index.module.scss'

const GeneralPage = ({ store, addAmountRenderTicket, sizeMonitor, getId, listenerOnline, listenerOffline }) => {
  const { chooseTransfer, load, stop } = store

  const content = load ? <Loading /> : <AppData />
  const stopLoadFeth = !stop ? <Loading /> : content
  const addButton =
    !stop || load ? (
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

  const fetchIdTickets = useCallback(() => {
    getId()
  }, [getId])

  useEffect(() => {
    fetchIdTickets()
  }, [fetchIdTickets]) //, chooseTabs, all, transfer0, transfer1, transfer2, transfer3

  useEffect(() => {
    listenerOnline()
    listenerOffline()
  }),
    [
      // listenerOnline, listenerOffline
    ]

  return (
    <div className={styles.generalPage}>
      <Tabs />
      {store.sizeMonitor > 716 ? <></> : <Filter />}
      {stopLoadFeth}
      {addButton}
    </div>
  )
}

const mapStateToProps = (state) => ({ store: state })

export default connect(mapStateToProps, actions)(GeneralPage)
