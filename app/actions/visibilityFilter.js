import * as actionTypes from '../constants/actionTypes'
import { makeActionCreator } from '../utils/makeActionCreator'

const setVisibilityFilter = makeActionCreator(actionTypes.SET_VISIBILITY_FILTER, 'filter')

export { setVisibilityFilter }
