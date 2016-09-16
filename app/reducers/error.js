// @flow
import * as actionTypes from '../constants/actionTypes'
import { createReducer } from '../utils/createReducer'

const errorHandlers = {
  [actionTypes.GET_ERROR](state: {}, action: {}) {
    return action.error
  }
}

const error = createReducer([], errorHandlers)

export default error
