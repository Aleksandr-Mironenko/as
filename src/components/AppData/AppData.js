import React from 'react'
import { connect } from 'react-redux'

import Ticket from '../Ticket'
import actions from '../actions'
import Offline from '../Offline'

const AppData = ({ store }) => {
  const { filterTickets, offline, amountRenderTicket } = store

  const firstFive = filterTickets.filter((item, index) => {
    item.index = index
    return item.index < amountRenderTicket
  })
  const elements = firstFive.map((item, index) => {
    return <Ticket key={index} {...item} />
  })

  return <div>{offline ? <Offline /> : elements}</div>
}

const mapStateToProps = (state) => ({ store: state })

export default connect(mapStateToProps, actions)(AppData)
