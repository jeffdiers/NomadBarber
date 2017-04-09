import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';
import styles from '../styles/StyleMain'

export default class CutScreen extends Component {
  render() {
    return (
        <View style={styles.tabContent}>
            <Text style={styles.tabTitle}>{this.props.page}</Text>
        </View>
    );
  }
}



