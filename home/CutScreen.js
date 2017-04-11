import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import styles from '../styles/StyleMain'
import DatePicker from 'react-native-datepicker'
import Ionicon from 'react-native-vector-icons/Ionicons'
import EntypoIcon from 'react-native-vector-icons/Entypo'

function getCurrentTime(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

const haircutCount = 0
const clipperCutCount = 0
const beardTrimCount = 0
const subtotalCount = 0


export default class CutScreen extends Component {

  constructor(props){
    super(props)
    this.state = {
      time: 'now',
      haircut: haircutCount,
      clipperCut: clipperCutCount,
      beardTrim: beardTrimCount,
      subtotal: 0
    }
  }
  
  render() {

  const services = [
      {
        id: 1,
        name: 'Haircut',
        description: 'Haircut and styling from one of our master barbers.',
        counter: haircutCount,
        stateObj: this.state.haircut,
        price: 50,
        countMinus: () => {
                      subtotalCount > 0 ? subtotalCount -= 50 : subtotalCount = 0
                      haircutCount > 0 ? haircutCount -= 1 : haircutCount = 0
                      this.setState({
                        haircut: haircutCount,
                        subtotal: subtotalCount
                      })
                    },
        countAdd: () => {
                      subtotalCount += 50
                      haircutCount += 1
                      this.setState({
                        haircut: haircutCount,
                        subtotal: subtotalCount
                      })
                    }
      },
      {
        id: 2,
        name: 'Clipper Cut',
        description: 'Hold the scissors. Detailed clipper work for the perfect fade or quick cleanup.',
        counter: clipperCutCount,
        stateObj: this.state.clipperCut,
        price: 30,
        countMinus: () => {
                      subtotalCount > 0 ? subtotalCount -= 30 : subtotalCount = 0
                      clipperCutCount > 0 ? clipperCutCount -= 1 : clipperCutCount = 0
                      this.setState({
                        clipperCut: clipperCutCount,
                        subtotal: subtotalCount
                      })
                    },
        countAdd: () => {
                      subtotalCount += 30
                      clipperCutCount += 1
                      this.setState({
                        clipperCut: clipperCutCount,
                        subtotal: subtotalCount
                      })
                    }
      },
      {
        id: 3,
        name: 'Beard Trim',
        description: 'Keep it looking tight. Artful full face hair shaping and edging.',
        stateObj: this.state.beardTrim,
        counter: beardTrimCount,
        price: 30,
        countMinus: () => {
                      subtotalCount > 0 ? subtotalCount -= 30 : subtotalCount = 0
                      beardTrimCount > 0 ? beardTrimCount -= 1 : beardTrimCount = 0
                      this.setState({
                        beardTrim: beardTrimCount,
                        subtotal: subtotalCount
                      })
                    },
        countAdd: () => {
                      subtotalCount += 30
                      beardTrimCount += 1
                      this.setState({
                        beardTrim: beardTrimCount,
                        subtotal: subtotalCount
                      })
                    }
      }
 
    ]

    const menuItemsMapped = services.map((service) =>
            <View key={service.id}>
              <Text style={[styles.menuItemTitle, styles.tabText]}>{service.name}</Text>
              <Text style={styles.menuItemSubtitle}>{service.description}</Text>
                <View style ={styles.menuItemCounter}>
                  <TouchableOpacity 
                    style={styles.counterButton} 
                    onPress={service.countMinus}>
                    <EntypoIcon style={styles.counterIcon} name="minus" size={15} color='#C33C54' />
                  </TouchableOpacity>
                  <Text style={styles.tabText}>{service.stateObj}</Text>
                  <TouchableOpacity 
                    style={styles.counterButton} 
                    onPress={service.countAdd} >
                    <EntypoIcon style={styles.counterIcon} name="plus" size={15} color='#C33C54' />
                  </TouchableOpacity>
                </View>
              </View>
      )

    return (
      <View style={styles.greetingScreen}>
        <View style={styles.tabContent}>
            <Text style={styles.tabTitle}>Nomad</Text>

              <View style={styles.menuContainer}>

              {menuItemsMapped}
              <Text style={[styles.menuItemTitle, styles.tabText]}>Subtotal: ${this.state.subtotal}</Text>

                  <View style={styles.menuItemTime}>
                    <DatePicker
                      style={{width: 200}}
                      date={this.state.date}
                      mode="time"
                      placeholder={'schedeule for ' + this.state.time}
                      format="HH:mm"
                      minuteInterval={10}
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      showIcon={false}
                      is24Hour={false}
                      customStyles={{
                        dateInput: {
                          borderRadius: 6,
                          borderColor: '#744BAC'
                        },
                        placeholderText: {
                          color: '#744BAC',
                          fontFamily: 'AppleSDGothicNeo-Regular'
                        }
                        }}
                      onDateChange={(time) => {this.setState({time})}}
                    />
                  </View>
                </View>

                <TouchableOpacity style={[styles.buttonLogout, styles.logOut]} onPress={this.props._clearAsyncStorage}>
                    <Text style={styles.buttonTextLogout}>Order</Text>
                </TouchableOpacity>
        </View>
      </View>
    );
  }
}