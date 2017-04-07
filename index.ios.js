import React, { Component } from 'react';
import {
  AppRegistry,
  View
} from 'react-native';
import App from './App.js'

export default class NomadBarber extends Component {
  render() {
    return (
        <App />
    );
  }
}


AppRegistry.registerComponent('NomadBarber', () => NomadBarber);
