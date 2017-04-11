import React, { Component } from 'react';
import {
  Text,
  View,
  MapView
} from 'react-native';
import styles from '../styles/StyleMain'

export default class Request extends Component {

    constructor(props){
        super(props)
        this.state = {

        }
    }

    render() {

// User sends a request, it is posted to database.
// user sees the request in his request tab
// barber recieves a notification to open his phone
// once open he sees a request in his request tab
// the barber can set isSchedeuled to 'true' or 'false'
        const requests = [
            {
                _id: 1,
                user_id: 24,
                user_barber_id: 12,
                date: 1491892290341,
                ammount: 50,
                lat: 39.722240,
                lng: -104.945698,
                services: {
                    haircut: 1,
                    beardTrim: 0,
                    clipperCut: 0
                },
                isSchedeuled: false,
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
                imageUrl: 'http://i.telegraph.co.uk/multimedia/archive/03046/hipster-tash_3046941b.jpg',
                lat: 39.722240,
                lng: -104.945698,
                countryCode: 1,
                phone: 7209873868,
                email: 'kerbie@email.com',
                isWorking: true
            }
        ]

        return (
            <View style={styles.greetingScreen}>
                <View style={styles.tabContent}>
                    <Text style={styles.tabTitle}>Nomad</Text>
                </View>
            </View>
        );
    }
}




