import React, { Component } from 'react';
import {
  Text,
  View,
  MapView
} from 'react-native';
import styles from '../styles/StyleMain'

export default class MapScreen extends Component {
  render() {
    return (
        <MapView
            style={styles.map}
            showsUserLocation={true}
        />
    );
  }
}



