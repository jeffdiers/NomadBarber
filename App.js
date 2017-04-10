import React, { Component } from 'react';
import {
  View,
  AsyncStorage,
  Navigator
} from 'react-native';
import LoginForm from './login/LoginForm.js'
import Home from './home/Home'
import styles from './styles/StyleMain'

const routes = [
    {title: 'Home', component: Home, index: 0},
    {title: 'LoginForm', component: LoginForm, index: 1},
]

export default class App extends Component {

    constructor(props) {
        super(props) 
        this.state = {
            loading: true,
            messages: [],
        }
    }

    componentDidMount() {   
        this._loadAsnycStorage()
    }

    _loadAsnycStorage = async () => {

        try {
            let user = await AsyncStorage.getItem('userProfile')
            if (user !== null) {
                console.log('User Profile found')
                this.setState({
                    loading: false,
                    userProfile: JSON.parse(user),
                    verified: true,
                    initialRoute: routes[0],
                    statusBar: false
                })
            } else {
                console.log('No user profile in storage.')
                this.setState({
                    loading: false,
                    verified: false,
                    initialRoute: routes[1],
                    statusBar: true
                })
            }
        } catch (err) {
                 console.log('AsyncStorage error: ')
        }
    }

  render() {

    if(this.state.loading)    

        return <View />

        return (
            <Navigator
                style={styles.navigator}
                initialRoute={this.state.initialRoute}
                initialRouteStack={routes}
                renderScene={(route, navigator) =>
                    <route.component userProfile={this.state.userProfile} route={route} statusBar={this.state.statusBar} navigator={navigator} {...route.passProps} />
                } />
        );
  }

}

