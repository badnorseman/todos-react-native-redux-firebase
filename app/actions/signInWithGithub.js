import { Linking } from 'react-native'
import {
  getItemFromLocalStorage,
  setItemToLocalStorage
} from './localStorage'

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
        code,
        state: Math.random().toString(36)
      })
    }
  )

  return fetch(request)
  .then(result => result.json())
  .then(resultJson => resultJson.access_token)
  .catch(error => {
    throw new Error(error)
  })
}

function handleUrl(event) {
  const code = event.url.slice(event.url.lastIndexOf('=') + 1)

  if (code) {
    fetchTokenFromGithub(code)
    .then(token => setItemToLocalStorage({ token }))
    .catch(error => {
      throw new Error(error)
    })
  }

  Linking.removeEventListener('url', handleUrl)
}

export default function signInWithGithub() {
  getItemFromLocalStorage().then(item => {
    console.log('ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ')
    console.log('Item', item)
    console.log('ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ')
  })

  Linking.addEventListener('url', handleUrl)

  const url = githubConfig.url+
    'authorize?client_id='+githubConfig.clientId+
    '&redirect_uri='+githubConfig.redirectUri

  Linking.openURL(url).catch(error => {
    throw new Error(error)
  })
}
