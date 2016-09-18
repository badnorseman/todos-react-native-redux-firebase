import Firebase from 'firebase'

const firebaseConfig = require('../../firebaseconfig.json')

const firebaseApp = Firebase.initializeApp(firebaseConfig)

export default firebaseApp
