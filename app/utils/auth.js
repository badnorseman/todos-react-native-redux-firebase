export function auth(firebaseApp) {
  const auth = firebaseApp.auth()
  return auth.signInAnonymously()
    .then(res => res)
    .catch(err => {
      throw new Error(err)
    })
}
