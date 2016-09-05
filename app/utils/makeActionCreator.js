export function makeActionCreator(type, ...argNames) {
  return function (...args) {
    let action = { type }
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index]
    })
    return action
  }
}

// @flow
// import _ from 'lodash/fp';
// export const makeActionCreator =
//   (type: string, ...argNames: Array<string>) =>
//     (...args: Array<any>) => _.merge({ type }, _.zipObject(argNames, args));
