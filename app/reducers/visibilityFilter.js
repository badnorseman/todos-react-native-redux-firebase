// @flow
import * as actionTypes from '../constants/actionTypes'
import * as visibilityFilters from '../constants/visibilityFilters'
import { createReducer } from '../utils/createReducer'

const visibilityFilterHandler = {
  [actionTypes.SET_VISIBILITY_FILTER](state: string, action: { filter: string }) {
    return action.filter
  }
}

const visibilityFilter = createReducer(visibilityFilters.SHOW_ALL, visibilityFilterHandler)

export default visibilityFilter
