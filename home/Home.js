import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  AsyncStorage,
  TouchableOpacity,
  TabBarIOS,
  TextInput,
  Alert,
  StatusBar
} from 'react-native'
import Hr from 'react-native-hr'
import Form from 'react-native-form'
import Ionicon from 'react-native-vector-icons/Ionicons'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import Modal from 'react-native-simple-modal'
import styles from '../styles/StyleMain'
import Frisbee from 'frisbee';
import CutScreen from './CutScreen'
import MapScreen from './MapScreen'
import Request from './Request'
import ProfileScreen from './ProfileScreen'
import App from '../App'
import baseApi from '../api.js'

const api = new Frisbee({
    baseURI: baseApi,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
})

export default class WelcomeScreen extends Component {

    // Fixed the 'cannot reand property 'user' of undefined by setting a default value to user Profile
    static defaultProps = {
        userProfile: {}
    }

    constructor(props) {
        super(props) 
        this.state = {
            name: this.props.userProfile.name,
            email: this.props.userProfile.email,
            open: false,
            messages: [],
            selectedTab: 'cutTab'
        }
        
    }

    _clearAsyncStorage = async () => {

        const route = [
            {title: 'Home', component: App, index: 0}
        ]

        console.log('logout pressed')
            try {
                await AsyncStorage.removeItem('userProfile')
                const routes = this.props.navigator.getCurrentRoutes()
                this.props.navigator.immediatelyResetRouteStack(route)
            } catch (err) {
                console.log('error removing user')
            }
    }

    _renderContent = (page, userProfile) => {

    if(page === 'Profile Tab')

        return <ProfileScreen userProfile={this.props.userProfile} _clearAsyncStorage={this._clearAsyncStorage} />
        
    else if(page === 'Cut Tab')

        return <CutScreen userProfile={this.props.userProfile} />

    else if(page === 'Map Tab')

            return <MapScreen page={page} />

    else if(page == 'Request Tab')

            return <Request userProfile={this.props.userProfile} />

    }


  render() {
    return (
    <TabBarIOS
        tintColor="#744BAC">
        <Ionicon.TabBarItem
            title="Profile"
            iconName="ios-person"
            selectedIconName="ios-person"
            selected={this.state.selectedTab === 'profileTab'}
            onPress={() => {
                this.setState({
                    selectedTab: 'profileTab',
                });
                }}>
                {this._renderContent('Profile Tab', this.state.userProfile)}
        </Ionicon.TabBarItem>
        <EntypoIcon.TabBarItem
            title="Requests"
            iconName="menu"
            selectedIconName="menu"
            selected={this.state.selectedTab === 'requestTab'}
            onPress={() => {
                this.setState({
                    selectedTab: 'requestTab',
                });
                }}>
                {this._renderContent('Request Tab', this.state.userProfile)}
        </EntypoIcon.TabBarItem>
        <Ionicon.TabBarItem
            title="Cut"
            iconName="ios-cut"
            selectedIconName="ios-cut"
            selected={this.state.selectedTab === 'cutTab'}
            onPress={() => {
                this.setState({
                selectedTab: 'cutTab',
                });
            }}>
            {this._renderContent('Cut Tab')}
        </Ionicon.TabBarItem>
        <Ionicon.TabBarItem
            title="Map"
            iconName="ios-map"
            selectedIconName="ios-map"
            selected={this.state.selectedTab === 'mapTab'}
            onPress={() => {
                this.setState({
                selectedTab: 'mapTab',
                });
            }}>
            {this._renderContent('Map Tab')}
        </Ionicon.TabBarItem>
      </TabBarIOS>
    );
  }
}

 