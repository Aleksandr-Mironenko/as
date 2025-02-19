import { add } from 'date-fns'

const initialState = {
  tickets: [],
  filterTickets: [],
  chooseTransfer: [],
  chooseTabs: 1,
  amountRenderTicket: 5,
  offline: false,
  load: false,
  all: false,
  transfer0: false,
  transfer1: false,
  transfer2: false,
  transfer3: false,
  errorFetch: false,
  sizeMonitor: window.innerWidth,
}

const sortedForTab = (filterTickets, tab) => {
  if (tab === 1) {
    return [...filterTickets].sort((a, b) => a.price - b.price)
  }
  if (tab === 2) {
    return [...filterTickets].sort((a, b) => a.duration - b.duration)
  }
  if (tab === 3) {
    return [...filterTickets].sort((a, b) => b.coefficient - a.coefficient)
  }
  return filterTickets
}

const filtered = (tickets, arrTransfer, chooseTabs) => {
  return sortedForTab(
    tickets.filter((ticket) =>
      arrTransfer.some((transfer) => ticket.numberOfStopsThere === transfer || ticket.numberOfStopsBack === transfer)
    ),
    chooseTabs
  )
}

const toggleTransfer = (state, transferKey, choose) => {
  let newState = {
    ...state,
    [transferKey]: !state[transferKey],
    chooseTransfer: state.chooseTransfer.includes(choose)
      ? state.chooseTransfer.filter((item) => item !== choose)
      : [...state.chooseTransfer, choose],
  }
  if (newState.transfer0 && newState.transfer1 && newState.transfer2 && newState.transfer3) {
    newState.all = true
    newState.chooseTransfer = [0, 1, 2, 3]
  } else {
    newState.all = false
  }
  newState.filterTickets = filtered(state.tickets, newState.chooseTransfer, newState.chooseTabs)
  return newState
}

const inputFormatting = (data) => {
  const timeP = (time) => {
    const min = new Date(time).getMinutes()
    const minFofmat = min < 10 ? `0${min}` : min
    const hours = new Date(time).getHours()
    const hoursFofmat = hours < 10 ? `0${hours}` : hours
    return `${hoursFofmat}:${minFofmat}`
  }

  const formatTimeDuration = (time) => {
    const hours = Math.floor(time / 60)
    const hoursFormat = hours < 10 ? `0${hours}` : hours
    const min = time - hours * 60
    const minFormat = min < 10 ? `0${min}` : min
    return `${hoursFormat}:${minFormat}`
  }

  const numberOfTransfers = (direction) => {
    return direction.stops.length === 0
      ? 'БЕЗ ПЕРЕСАДОК'
      : direction.stops.length === 1
        ? `${direction.stops.length} ПЕРЕСАДКА`
        : `${direction.stops.length} ПЕРЕСАДКИ`
  }

  const formatedPrice = (price) => {
    const arrPrice = price.split('')
    const formattedPrice = `${arrPrice.slice(0, -3).join('')} ${arrPrice.slice(-3).join('')} Р`
    return formattedPrice
  }

  return data.map((ticket) => {
    const { price, carrier, segments } = ticket

    const formatPrice = formatedPrice(price.toString())

    const stopsThereString = segments[0].stops.join(', ')
    const stopsBackString = segments[1].stops.join(', ')

    const numberOfStopsThere = segments[0].stops.length
    const numberOfStopsBack = segments[1].stops.length

    const duration = segments[0].duration + segments[1].duration
    const coefficient = duration / (numberOfStopsThere + numberOfStopsBack) / price

    const routeThere = `${segments[0].origin} - ${segments[0].destination}`
    const routeBack = `${segments[1].origin} - ${segments[1].destination}`

    const departure = add(segments[0].date, { minutes: segments[0].duration })
    const arrival = add(segments[1].date, { minutes: segments[1].duration })

    const timeThere = `${timeP(segments[0].date)} - ${timeP(departure)}`
    const timeBack = `${timeP(segments[1].date)} - ${timeP(arrival)}`

    const timeDurationThere = formatTimeDuration(segments[0].duration)
    const timeDurationBack = formatTimeDuration(segments[1].duration)

    const numberOfTransfersThere = numberOfTransfers(segments[0])
    const numberOfTransfersBack = numberOfTransfers(segments[1])
    return {
      formatPrice,
      price,
      carrier,
      stopsThereString,
      stopsBackString,
      numberOfStopsThere,
      numberOfStopsBack,
      duration,
      coefficient,
      routeThere,
      routeBack,
      timeThere,
      timeBack,
      timeDurationThere,
      timeDurationBack,
      numberOfTransfersThere,
      numberOfTransfersBack,
    }
  })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHOICE_ALL': {
      let newState = {
        ...state,
        all: !state.all,
        transfer0: !state.all,
        transfer1: !state.all,
        transfer2: !state.all,
        transfer3: !state.all,
        chooseTransfer: !state.all ? [0, 1, 2, 3] : [],
      }
      newState.amountRenderTicket = newState.chooseTransfer.length ? 5 : newState.amountRenderTicket
      newState.filterTickets = filtered(state.tickets, newState.chooseTransfer, newState.chooseTabs)
      return newState
    }
    case 'CHOICE_TRANSFER0':
      return toggleTransfer(state, 'transfer0', 0)
    case 'CHOICE_TRANSFER1':
      return toggleTransfer(state, 'transfer1', 1)
    case 'CHOICE_TRANSFER2':
      return toggleTransfer(state, 'transfer2', 2)
    case 'CHOICE_TRANSFER3':
      return toggleTransfer(state, 'transfer3', 3)
    case 'CHOICE_TABS':
      return {
        ...state,
        chooseTabs: action.chooseTabs,
        filterTickets: sortedForTab(state.filterTickets, action.chooseTabs),
      }
    case 'PUSH_TICKETS':
      return {
        ...state,
        tickets: inputFormatting(action.tickets),
        filterTickets: filtered(inputFormatting(action.tickets), state.chooseTransfer, state.chooseTabs),
      }
    case 'LOAD_START':
      return {
        ...state,
        load: true,
      }
    case 'LOAD_END':
      return {
        ...state,
        load: false,
      }
    case 'ERROR_FETCH':
      return {
        ...state,
        errorFetch: !state.errorFetch,
      }
    case 'OFFLINE':
      return {
        ...state,
        offline: action.bool,
      }
    case 'ADD_AMOUNT_RENDER_TICKET':
      return {
        ...state,
        amountRenderTicket: state.amountRenderTicket + 5,
      }
    case 'SIZE_MONITOR':
      return {
        ...state,
        sizeMonitor: action.size,
      }
    default:
      return { ...state }
  }
}
export default reducer
