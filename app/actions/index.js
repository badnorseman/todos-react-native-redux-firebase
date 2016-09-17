import firebaseApp from '../firebaseApp'
import * as actionTypes from '../constants/actionTypes'
import { makeActionCreator } from '../utils/makeActionCreator'

const instagramConfig = require('../../instagramconfig.json')

const Todo = firebaseApp.database().ref()

export function fetchTodos() {
  authorize()
  return dispatch => {
    Todo.orderByChild('text').on('value', function (snapshot) {
      let todos = []
      snapshot.forEach(function (child) {
        todos.push({
          id: child.key,
          text: child.val().text,
          completed: child.val().completed
        })
      })
      dispatch({
        type: actionTypes.FETCH_TODOS_SUCCESS,
        todos
      })
    }, function (error) {
      dispatch({
        type: actionTypes.FETCH_TODOS_FAILURE,
        error
      })
    })
  }
}

export function addTodo(text) {
  authorize()
  return dispatch => {
    Todo.push({
      text,
      completed: false
    }).catch(error => {
      dispatch({
        type: actionTypes.GET_ERROR,
        error
      })
    })
  }
}

export function toggleTodo(todo) {
  authorize()
  return dispatch => {
    Todo.child(todo.id).update({
      completed: !todo.completed
    }).catch(error => {
      dispatch({
        type: actionTypes.GET_ERROR,
        error
      })
    })
  }
}

export function deleteTodo(id) {
  authorize()
  return dispatch => {
    Todo.child(id).remove().catch(error => {
      dispatch({
        type: actionTypes.GET_ERROR,
        error
      })
    })
  }
}

function authorize() {
  signInWithInstagram()
}

// function signInAnonymously() {
//   firebaseApp.auth().signInAnonymously().then(function (result) {
//     return result
//   }).catch(error => {
//     throw new Error(error)
//   })
// }

function signInWithInstagram() {
  const headers = new Headers ({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  })
  const url = `https://api.instagram.com/oauth/authorize/?client_id=${instagramConfig.clientId}&redirect_uri=my-to-dos.firebaseapp.com&response_type=token`

  return fetch(url, {
    method: 'GET',
    headers
  }).then(result => {
    const cookieInfo = result.headers.get('Set-Cookie')
    const accessToken = result.headers.get('Content-Length')
    console.log('ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ')
    console.log('cookieInfo/accessToken', cookieInfo, '/', accessToken)
    console.log('ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ')
    const url = `https://api.instagram.com/v1/users/self/?access_token=${accessToken}`
    return fetch(url, {
      method: 'GET',
      credentials: 'include',
      headers
    })
  }).then(result => {
    console.log('ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ')
    console.log('result', result)
    console.log('ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ')
    return result
  }).catch(error => {
    throw new Error(error)
  })
}

export const setVisibilityFilter = makeActionCreator(actionTypes.SET_VISIBILITY_FILTER, 'filter')
