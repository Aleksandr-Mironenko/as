import actions from '../actions'
export const delayMiddleware = (store) => (next) => (action) => {
  const { loadStart, loadEnd } = actions
  const delayMs = action?.meta?.delayMs
  if (!delayMs) {
    return next(action)
  }
  store.dispatch(loadStart())
  console.log('работает delayMiddleware вызов loadStart, по окончанию  loadEnd')
  next(action)
  const timerId = setTimeout(() => {
    store.dispatch(loadEnd())
  }, delayMs)
  return () => {
    clearTimeout(timerId)
  }
}
