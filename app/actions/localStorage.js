import { AsyncStorage } from 'react-native'

const STORAGE_KEY = '@TodosReduxFirebase'

export async function getItemFromLocalStorage() {
  try {
    const item = await AsyncStorage.getItem(STORAGE_KEY)
    return JSON.parse(item)
  } catch (error) {
    throw new Error(error)
  }
}

export async function setItemToLocalStorage(item) {
  try {
    await AsyncStorage.setItem(STORAGE_KEY,
      JSON.stringify(item)
    )
  } catch (error) {
    throw new Error(error)
  }
}
