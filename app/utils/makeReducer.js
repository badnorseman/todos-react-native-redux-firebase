export function makeReducer(initialState: {}, handlers: {}) {
  return function reducer(state: {} = initialState, action: {type: string}) {
    return handlers.hasOwnProperty(action.type) ? handlers[action.type](state, action) : state
  }
}

// @flow
// import _ from 'lodash/fp';
// export const createReducer = (initialState: {}, handlers: {}) =>
//   // eslint-disable-next-line space-infix-ops
//   (state: {} = initialState, action: { type: string }) =>
//     action && _.has(action.type, handlers) ? handlers[action.type](state, action) : state;
