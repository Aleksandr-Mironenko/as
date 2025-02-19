import actions from '../actions'

export const delayMiddlewareFetch = (store) => (next) => (action) => {
  const { loadStart, loadEnd } = actions
  const find = action?.meta?.findStart || action?.meta?.findEnd

  if (!find) {
    //&& !store.getState().tickets.length && !store.getState().errorFetch
    next(action)
  }
  if (action?.meta?.findStart) {
    store.dispatch(loadStart())
    console.log('запуск лоадера из delayMiddlewareFetch')
  }
  if (action?.meta?.findEnd) {
    store.dispatch(loadEnd())
    console.log('остановка лоадера из delayMiddlewareFetch')
  }
}
