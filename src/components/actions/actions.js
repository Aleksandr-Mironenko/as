export const all = () => ({ type: 'CHOICE_ALL', meta: { delayMs: 1000 } })
export const transfer0 = () => ({ type: 'CHOICE_TRANSFER0', meta: { delayMs: 1000 } })
export const transfer1 = () => ({ type: 'CHOICE_TRANSFER1', meta: { delayMs: 1000 } })
export const transfer2 = () => ({ type: 'CHOICE_TRANSFER2', meta: { delayMs: 1000 } })
export const transfer3 = () => ({ type: 'CHOICE_TRANSFER3', meta: { delayMs: 1000 } })
// export const load = () => ({ type: 'LOAD' })
export const pushTickets = (id, tickets) => ({ type: 'PUSH_TICKETS', id, tickets, meta: { findEnd: true } })
export const errorFetch = () => ({ type: 'ERROR_FETCH' })
export const offline = (bool) => ({ type: 'OFFLINE', bool })
export const addAmountRenderTicket = () => ({ type: 'ADD_AMOUNT_RENDER_TICKET', meta: { delayMs: 1000 } })
export const sizeMonitor = (size = window.innerWidth) => ({ type: 'SIZE_MONITOR', size })
export const loadStart = () => ({ type: 'LOAD_START' })
export const loadEnd = () => ({ type: 'LOAD_END' })
export const listenerOnline = () => {
  return (dispatch) =>
    window.addEventListener('offline', () => {
      dispatch(offline(true))
    })
}

export const listenerOffline = () => {
  return (dispatch) =>
    window.addEventListener('online', () => {
      dispatch(offline(false))
    })
}

export const handleTabsClick = (chooseTabs) => ({ type: 'CHOICE_TABS', chooseTabs, meta: { delayMs: 1000 } })

export const getTickets = (searchId, accumulatedTickets = []) => {
  return async (dispatch) => {
    try {
      const searchContent = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`)

      if (!searchContent.ok) {
        dispatch(getTickets(searchId, accumulatedTickets))
      } else {
        const content = await searchContent.json()

        const newAccumulatedTickets = [...accumulatedTickets, ...content.tickets]
        if (!content.stop) {
          dispatch(getTickets(searchId, newAccumulatedTickets))
        } else {
          dispatch(pushTickets(searchId, newAccumulatedTickets))
          console.log('билеты загружены')
          // dispatch(loadEnd())
        }
      }
    } catch (error) {
      dispatch(getTickets(searchId, accumulatedTickets))
    }
  }
}
//
export const getId = (retries = 5) => {
  return async (dispatch) => {
    // dispatch(loadStart())
    try {
      const searchIdServer = await fetch('https://aviasales-test-api.kata.academy/search')

      if (!searchIdServer.ok) {
        throw new Error()
      }
      const searchId = await searchIdServer.json()
      dispatch({ meta: { findStart: true } })
      dispatch(getTickets(searchId.searchId))
    } catch (error) {
      if (retries > 0) {
        // dispatch({ meta: { findStart: true } })
        dispatch(getId(retries - 1))
      } else {
        dispatch({ meta: { findStart: false } })
        dispatch(errorFetch())
      }
    }
  }
}
