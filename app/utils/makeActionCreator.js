// @flow
export function makeActionCreator(type: string, ...argNames: Array<string>) {
  return function (...args: Array<any>) {
    let action = { type }
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index]
    })
    return action
  }
}
