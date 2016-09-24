import Firebase from 'firebase'
import { Linking } from 'react-native'
import {
  getItemFromLocalStorage,
  setItemToLocalStorage
} from './localStorage'
import firebaseApp from '../firebaseApp'

const githubConfig = require('../../githubconfig.json')

function fetchTokenFromGithub(code) {
  const request = new Request(
    githubConfig.url+'access_token', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        client_id: githubConfig.clientId,
        client_secret: githubConfig.clientSecret,
        code
      })
    }
  )

  return fetch(request)
  .then(result => result.json())
  .then(resultJson => resultJson.access_token)
  .then(token => setItemToLocalStorage({ token }))
  .catch(error => {
    throw new Error(error)
  })
}

export default function signInWithGithub() {
  const requestState = Math.random().toString(36)
  const url = githubConfig.url+
    'authorize?client_id='+githubConfig.clientId+
    '&redirect_uri='+githubConfig.redirectUri+
    '&state='+requestState

  function handleUrl(event) {
    const code = event.url.slice(event.url.indexOf('=') + 1, event.url.indexOf('&'))
    const resultState = event.url.slice(event.url.lastIndexOf('=') + 1)

    if (code && requestState === resultState) {
      fetchTokenFromGithub(code).catch(error => {
        throw new Error(error)
      })
    }

    Linking.removeEventListener('url', handleUrl)
  }

  Linking.addEventListener('url', handleUrl)

  Linking.openURL(url).catch(error => {
    throw new Error(error)
  })

  getItemFromLocalStorage().then(item => {
    const credential = new Firebase.auth.GithubAuthProvider.credential(item.token)
    firebaseApp.auth().signInWithCredential(credential).catch(error => {
      throw new Error(error)
    })
  })
}
