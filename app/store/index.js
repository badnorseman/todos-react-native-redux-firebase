import { applyMiddleware, createStore } from 'redux'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import todoApp from '../reducers'

const logger = createLogger()

let createStoreWithMiddleware

if (__DEV__) {
  createStoreWithMiddleware = applyMiddleware(logger, thunk)(createStore)
} else {
  createStoreWithMiddleware = applyMiddleware(thunk)(createStore)
}

const store = createStoreWithMiddleware(todoApp)

export default store
