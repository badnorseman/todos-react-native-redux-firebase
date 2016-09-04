import React, { Component } from 'react'
import { Provider } from 'react-redux'
import firebaseApp from '../firebaseApp'
import store from '../store'
import Main from '../components/Main'

const userRef = () => firebaseApp.database().ref('users')
console.log('users', userRef)

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    )
  }
}
