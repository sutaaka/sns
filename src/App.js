import React, { Component } from 'react';
import AppFrame from './components/AppFrame'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'

const store = configureStore()

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppFrame />
      </Provider>
    );
  }
}

export default App;
