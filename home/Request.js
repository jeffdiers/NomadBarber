import React, { Component } from 'react';
import {
  Text,
  View,
  MapView,
  Image,
  TouchableOpacity,
  TextInput
} from 'react-native';
import styles from '../styles/StyleMain'
import Hr from 'react-native-hr'
import TimeAgo from 'react-native-timeago'
import Modal from 'react-native-simple-modal'
import Ionicon from 'react-native-vector-icons/Ionicons'
import Form from 'react-native-form'

export default class Request extends Component {

    constructor(props){
        super(props)
        this.state = {
            user_id: null,
            user_barber_id: null,
            date: null,
            subtotal: null,
            lat: null,
            lng: null,
            open: false
        }
    }

    render() {

// User sends a request, it is posted to database.
// user sees the request in his request tab
// barber recieves a notification to open his phone
// once open he sees a request in his request tab
// the barber can set isSchedeuled to 'true' or 'false'
// add barber_id and isWorking to User schema
// :)
        const requests = [
            {
                _id: 1,
                user_id: 24,
                user_barber_id: 12,
                date: 1492028517414,
                lat: 39.722240,
                lng: -104.945698,
                subtotal: 50,
                service: "Haircut",
                isSchedeuled: false,
                barber: {
                    _id: 69,
                    barber_id: 12,
                    name: 'Kerbie',
                    imageUrl: 'https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2015/9/29/1443543690216/ffb6f502-5e59-4cb7-8f06-273bd20908b7-2060x1236.jpeg?w=300&q=55&auto=format&usm=12&fit=max&s=f7fa0ec35ade25b3de181bde2a3b5baa',
                    lat: 39.722240,
                    lng: -104.945698,
                    countryCode: 1,
                    phone: 7209873868,
                    email: 'kerbie@email.com',
                    isWorking: true
                },
                user: {
                    _id: 24,
                    barber_id: null,
                    name: 'Jobin',
                    imageUrl: 'https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2015/9/29/1443543690216/ffb6f502-5e59-4cb7-8f06-273bd20908b7-2060x1236.jpeg?w=300&q=55&auto=format&usm=12&fit=max&s=f7fa0ec35ade25b3de181bde2a3b5baa',
                    lat: 39.722240,
                    lng: -104.945698,
                    countryCode: 1,
                    phone: 7209873868,
                    email: 'jobin@email.com',
                }
            }
        ]


// I get these two objects bassed on the request send by the user
// I use this data to fill out request objects
        const user = [
            {
                _id: 24,
                barber_id: null,
                name: 'Jobin',
                imageUrl: 'https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2015/9/29/1443543690216/ffb6f502-5e59-4cb7-8f06-273bd20908b7-2060x1236.jpeg?w=300&q=55&auto=format&usm=12&fit=max&s=f7fa0ec35ade25b3de181bde2a3b5baa',
                lat: 39.722240,
                lng: -104.945698,
                countryCode: 1,
                phone: 7209873868,
                email: 'jobin@email.com',
            }
        ]

        const barber = [
            {
                _id: 69,
                barber_id: 12,
                name: 'Kerbie',
                imageUrl: 'https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2015/9/29/1443543690216/ffb6f502-5e59-4cb7-8f06-273bd20908b7-2060x1236.jpeg?w=300&q=55&auto=format&usm=12&fit=max&s=f7fa0ec35ade25b3de181bde2a3b5baa',
                lat: 39.722240,
                lng: -104.945698,
                countryCode: 1,
                phone: 7209873868,
                email: 'kerbie@email.com',
                isWorking: true
            }
        ]

        const requestList = requests.map((request) => 
                    <View key={request._id} style={{flexDirection: 'column', justifyContent: 'space-around'}}>

                        <View style={styles.requestCard}>
                            <View style={styles.requestCardImage}>
                                <Image 
                                    style={styles.requestCardImage}
                                    source={{uri: request.barber.imageUrl}}/>
                            </View>
                            <View style={styles.requestCardInfo}>
                                <Text style={styles.requestCardInfoContent}>
                                    Barber: <Text style={{color: '#1D3557'}}>{request.barber.name}</Text>
                                </Text>
                                <Text style={styles.requestCardInfoContent}>
                                    Service: <Text style={{color: '#1D3557'}}>{request.service}</Text>
                                </Text>
                                <Text style={styles.requestCardInfoContent}>
                                    Total: <Text style={{color: '#1D3557'}}>${request.subtotal}</Text>
                                </Text>
                                <Text style={styles.requestCardInfoContent}>
                                    Time: <Text style={{color: '#1D3557'}}>3:15 PM</Text>
                                </Text>
                                <Text style={styles.requestCardInfoContent}>
                                    <Text style={{color: '#1D3557'}}>Requested a few seconds ago</Text>
                                </Text>
                            </View>                        
                        </View>

                        <TouchableOpacity style={styles.contactButton} onPress={() => this.setState({open: true})}>
                            <Text style={styles.contactButtonText}>Contact barber</Text>
                        </TouchableOpacity>

                        <View style={{paddingTop: 20}}>
                            <Hr lineColor='#C33C54' />
                        </View>
                    </View>

        )

        return (
            <View style={styles.greetingScreen}>
                <View style={styles.tabContent}>
                    <Text style={styles.tabTitle}>Nomad</Text>
                            <Hr lineColor='#C33C54' />

                    <View style={styles.requestList}>

                    {requestList}
                    
                    </View>
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
                        <Hr lineColor='#465C69' text='send Kerbie a message' textColor='#363457' />
                        <View style={styles.modalUpdateUser}>
                        <View style={{justifyContent: 'space-between', flexDirection: 'row', paddingBottom: 5, flex: 1, paddingTop: 5}}>
                            <Form ref={'form'}>
                                <TextInput
                                    ref={'textInput'}
                                    name={'message'}
                                    type={'TextInput'}
                                    style={styles.textInputModal}
                                />
                            </Form>
                            <TouchableOpacity
                                style={styles.modalSave}
                                onPress={this._editUserProfile} >
                            <Text style={styles.modalButton}>Send</Text>
                            </TouchableOpacity>
                        </View>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}




