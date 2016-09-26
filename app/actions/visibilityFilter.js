import * as actionTypes from '../constants/actionTypes'
import { makeActionCreator } from '../utils/makeActionCreator'

export function setVisibilityFilter() {
  return makeActionCreator(actionTypes.SET_VISIBILITY_FILTER, 'filter')
}
