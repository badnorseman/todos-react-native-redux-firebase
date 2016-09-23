import { Linking } from 'react-native'
import firebaseApp from '../firebaseApp'
import * as actionTypes from '../constants/actionTypes'
import { makeActionCreator } from '../utils/makeActionCreator'

const githubConfig = require('../../githubconfig.json')

const Todo = firebaseApp.database().ref()

export const setVisibilityFilter = makeActionCreator(actionTypes.SET_VISIBILITY_FILTER, 'filter')

export function fetchTodos() {
  signInWithGithubOAuth()
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
  signInWithGithubOAuth()
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
  signInWithGithubOAuth()
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
  signInWithGithubOAuth()
  return dispatch => {
    Todo.child(id).remove().catch(error => {
      dispatch({
        type: actionTypes.GET_ERROR,
        error
      })
    })
  }
}

function signInWithGithubOAuth() {
  const url = githubConfig.url+
    '?client_id='+githubConfig.clientId+
    '&redirect_uri='+githubConfig.redirectUri+
    '&response_type=token'
  console.log('ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ')
  console.log('url', url)
  console.log('ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ')
  Linking.openURL(url).then(result => {
    console.log('ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ')
    console.log('result', result)
    console.log('ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ')
  }).catch(error => {
    throw new Error(error)
  })
}
