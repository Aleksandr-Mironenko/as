export const all = () => ({ type: 'CHOICE_ALL', meta: { delayMs: 1000 } })
export const transfer0 = () => ({ type: 'CHOICE_TRANSFER0', meta: { delayMs: 1000 } })
export const transfer1 = () => ({ type: 'CHOICE_TRANSFER1', meta: { delayMs: 1000 } })
export const transfer2 = () => ({ type: 'CHOICE_TRANSFER2', meta: { delayMs: 1000 } })
export const transfer3 = () => ({ type: 'CHOICE_TRANSFER3', meta: { delayMs: 1000 } })

export const pushTickets = (id, tickets) => ({ type: 'PUSH_TICKETS', id, tickets })
export const errorFetch = () => ({ type: 'ERROR_FETCH' })
export const offline = (bool) => ({ type: 'OFFLINE', bool })
export const addAmountRenderTicket = () => ({ type: 'ADD_AMOUNT_RENDER_TICKET', meta: { delayMs: 1000 } })
export const sizeMonitor = (size = window.innerWidth) => ({ type: 'SIZE_MONITOR', size })
export const loadStart = () => ({ type: 'LOAD_START' })
export const loadEnd = () => ({ type: 'LOAD_END' })
export const isStop = () => ({ type: 'IS_STOP' })
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

export const getTickets = (searchId, retries = 5) => {
  return async (dispatch) => {
    if (retries <= 0) {
      dispatch(loadEnd())
      dispatch(errorFetch())
      return
    }

    try {
      const searchContent = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`)

      if (!searchContent.ok) {
        throw new Error()
      } else {
        const content = await searchContent.json()

        dispatch(pushTickets(searchId, content.tickets))
        if (content.stop === false) {
          dispatch(getTickets(searchId))
        }
        if (content.stop === true) {
          dispatch(isStop())
        }
      }
    } catch (error) {
      dispatch(getTickets(searchId, retries - 1))
    }
  }
}

export const getId = (retries = 5) => {
  return async (dispatch) => {
    try {
      const searchIdServer = await fetch('https://aviasales-test-api.kata.academy/search')

      if (!searchIdServer.ok) {
        throw new Error()
      }
      const searchId = await searchIdServer.json()
      dispatch(getTickets(searchId.searchId))
    } catch (error) {
      if (retries > 0) {
        dispatch(getId(retries - 1))
      } else {
        dispatch(errorFetch())
      }
    }
  }
}
