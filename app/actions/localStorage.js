import { AsyncStorage } from 'react-native'

const STORAGE_KEY = '@TodosReduxFirebase'

export async function getItemFromLocalStorage(item) {
  try {
    const value = await AsyncStorage.getItem(STORAGE_KEY)
    if (value && value[item]) {
      console.log('ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ')
      console.log('Found', value)
      console.log('ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ')
    } else {
      console.log('ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ')
      console.log('Not found', value)
      console.log('ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ')
    }
  } catch (error) {
    throw new Error(error)
  }
}

export async function setItemToLocalStorage(item) {
  try {
    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(item)
    )
  } catch (error) {
    throw new Error(error)
  }
}
