import React, {
  Component
} from 'react'
import { Provider } from 'react-redux'
import firebaseApp from '../firebaseApp'
import store from '../store'
import Main from '../components/Main'
import { auth } from '../utils/auth'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.todosRef = this.getRef().child('to-dos')
  }
  componentDidMount() {
    this.showFirebaseInfo()
    // this.listenForTodos(this.todosRef)
  }
  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    )
  }
  getRef() {
    return firebaseApp.database().ref()
  }
  showFirebaseInfo() {
    auth(firebaseApp)
      .then(res => {
        console.log('auth', res)
        console.log('ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ')
        let ref = firebaseApp.database().ref()
        ref.once('value')
          .then((snapshot) => {
            console.log('data exists', snapshot.exists())
            const key = snapshot.key
            const childKey = snapshot.child
            console.log('data key', key)
            console.log('data childKey', childKey)
          })
          .catch(err => {
            throw new Error(err)
          })
      })
      .catch(error => console.log('error', error))
    console.log('ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ')
  }
  // console.log('database', ref.root.toString())
  // listenForTodos(todosRef) {
  //   todosRef.on('value', function (snapshot) {
  //     console.log('snapshot', snapshot)
  //     snapshot.forEach((child) => {
  //       console.log('todo', child)
  //     })
  //   })
  // }
}
