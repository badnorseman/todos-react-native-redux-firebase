import React from 'react'
import {
  Dimensions,
  Keyboard
} from 'react-native'

export default function withKeyboard(Component) {
  return class WithKeyboard extends React.Component {
    componentWillMount() {
      this.setState({ sceneHeight: Dimensions.get('window').height })
    }
    componentDidMount() {
      Keyboard.addListener('keyboardWillShow', (ev) => {
        this.setState({ sceneHeight: ev.endCoordinates.screenY })
      })
      Keyboard.addListener('keyboardWillHide', (ev) => {
        this.setState({ sceneHeight: ev.endCoordinates.screenY })
      })
    }
    componentWillUnmount() {
      this.keyboardWillHideListener.remove()
      this.keyboardWillShowListener.remove()
    }
    render() {
      return (
        <Component {...this.props} sceneHeight={this.state.sceneHeight } />
      )
    }
  }
}
