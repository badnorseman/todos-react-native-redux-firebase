import firebaseApp from '../firebaseApp'

function auth(firebaseApp) {
  const auth = firebaseApp.auth()
  return auth.signInAnonymously()
    .then(res => res)
    .catch(err => {
      throw new Error(err)
    })
}

export function authFirebase() {
  auth(firebaseApp)
    .then(res => {
      console.log('--------------------------------------------------------------')
      console.log('uid', res.uid)
      console.log('emailVerified', res.emailVerified)
      console.log('refreshToken', res.refreshToken)
      console.log('accessToken', res.accessToken)
      console.log('--------------------------------------------------------------')
    })
    .catch(error => console.log('error', error))
}
