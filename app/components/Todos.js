import React from 'react'
import {
  StyleSheet,
  View
} from 'react-native'
import AddTodo from '../containers/AddTodo'
import FilterButton from '../containers/FilterButton'
import VisibleTodoList from '../containers/VisibleTodoList'
import withKeyboard from '../containers/withKeyboard'
import paddingTop from '../constants/paddingTop'

function Todos({
  sceneHeight,
  navigator
}) {
  return (
    <View style={[ styles.container, { paddingTop }, { height: sceneHeight } ]}>
      <FilterButton />
      <VisibleTodoList navigator={navigator} />
      <AddTodo />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(66,66,66)',
    flexDirection: 'column'
  }
})

export default withKeyboard(Todos)
