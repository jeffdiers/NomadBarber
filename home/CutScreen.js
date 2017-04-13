import React, { Component } from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  TextInput
} from 'react-native'
import Hr from 'react-native-hr'
import styles from '../styles/StyleMain'
import DatePicker from 'react-native-datepicker'
import Ionicon from 'react-native-vector-icons/Ionicons'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import Form from 'react-native-form'
import Modal from 'react-native-simple-modal'

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

  static defaultProps = {
      userProfile: {}
  }

  constructor(props){
    super(props)
    this.state = {
      time: 'now',
      haircut: haircutCount,
      clipperCut: clipperCutCount,
      beardTrim: beardTrimCount,
      subtotal: 0,
      open: false,
      user_id: this.props.userProfile._id,
      user_barber_id: null,
      initialPosition: 'unknown',
      lastPosition: 'unknown',
    }
  }

  watchID: ?number = null;

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var initialPosition = JSON.stringify(position);
        this.setState({initialPosition});
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    this.watchID = navigator.geolocation.watchPosition((position) => {
      var lastPosition = JSON.stringify(position);
      this.setState({lastPosition});
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }
  
  render() {
    console.log(this.state)

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
              <Hr lineColor='#C33C54' />

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
                          borderWidth: 2,
                          borderRadius: 6,
                          borderColor: '#FCFCFB'
                        },
                        placeholderText: {
                          color: '#744BAC',
                          fontFamily: 'AppleSDGothicNeo-Regular',
                          fontSize: 18
                        }
                        }}
                      onDateChange={(time) => {this.setState({time})}}
                    />
                  </View>
                </View>

                <TouchableOpacity style={[styles.buttonLogout, styles.logOut]} onPress={() => this.setState({open: true})}>
                    <Text style={styles.buttonTextLogout}>Order for your location</Text>
                </TouchableOpacity>
        </View>
                <Modal
                    offset={0}
                    open={this.state.open}
                    modalDidOpen={() => console.log('modal did open')}
                    modalDidClose={() => this.setState({open: false})}
                    modalStyle={{
                        borderRadius: 5,
                        margin: 20,
                        padding: 10,
                        backgroundColor: '#F5FCFF'
                    }}
                    animationDuration={300}>
                    <View style={styles.modalView}>
                        <TouchableOpacity
                          style={ styles.modalCancel }
                          onPress={() => this.setState({open: false})}>
                        <Ionicon name="md-close" size={25} color={this.state.loading ? 'white' : '#C33C54'} />
                        </TouchableOpacity>
                        <Hr lineColor='#465C69' text='select a barber' textColor='#363457' />
                        <View style={styles.modalBarberList}>
                            <TouchableOpacity onPress={() => this.setState({open: false})} style={{justifyContent: 'space-between', flexDirection: 'row', paddingBottom: 10, paddingTop: 5}}>
                                    <Text style={styles.requestCardInfoContent}>
                                      Kerbie
                                    </Text>
                                    <Text style={styles.requestCardInfoContent}>
                                      2.4 miles away
                                    </Text>               
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.setState({open: false})} style={{justifyContent: 'space-between', flexDirection: 'row', paddingBottom: 10, paddingTop: 5}}>
                                    <Text style={styles.requestCardInfoContent}>
                                      Josh
                                    </Text>
                                    <Text style={styles.requestCardInfoContent}>
                                      3.1 miles away
                                    </Text>               
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
      </View>
    );
  }
}