import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';
import styles from '../styles/StyleMain'
import DatePicker from 'react-native-datepicker'
import Icon from 'react-native-vector-icons/Ionicons';

  var d = new Date(),
      h = (d.getHours()<10?'':'') + d.getHours(),
      m = (d.getMinutes()<10?'0':'') + d.getMinutes();
      d = h + ':' + m;

export default class CutScreen extends Component {

  constructor(props){
    super(props)
    this.state = {
      time: d.toString()
    }
  }
  
  render() {
    return (
      <View style={styles.greetingScreen}>
        <View style={styles.tabContent}>
            <Text style={styles.tabTitle}>Nomad</Text>
              <View style={styles.datePicker}>
                <Icon name="ios-time" size={35} color="#900" />
                <DatePicker
                  style={{width: 200}}
                  date={this.state.date}
                  mode="time"
                  placeholder={this.state.time}
                  format="HH:mm"
                  minuteInterval={10}
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  showIcon={false}
                  is24Hour={false}
                  customStyles={{
                    dateInput: {borderRadius: 6}
                    }}
                  onDateChange={(time) => {this.setState({time})}}
              />
            </View>
      </View>
      </View>
    );
  }
}



