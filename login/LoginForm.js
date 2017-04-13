import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Switch,
  TouchableOpacity,
  Alert,
  Platform,
  AsyncStorage,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  StatusBar
} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons'
import Form from 'react-native-form';
import styles from '../styles/StyleMain'
import Frisbee from 'frisbee';
import SocketIOClient from 'socket.io-client';
import Home from '../home/Home'
import App from '../App'
import baseApi from '../api.js'
import LinearGradient from 'react-native-linear-gradient'

const api = new Frisbee({
    baseURI: baseApi,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
})

export default class LoginForm extends Component {

    constructor(props) {
        super(props)
        this.state = { 
            loading: false,
            verified: false,
            enterCode: false,
            messages: [],
            country: {
                cca2: 'US',
                callingCode: '1'
            }
        }
        // this.socket = SocketIOClient('http://localhost:3000');
        // this.socket.on('connection', function (socket) {
        //     console.log('We have a connection')
        // });
    }

    componentDidMount() {
        this.setState({isBarber: false})
    }

    _getCode = async () => {

        this.setState({ loading: true })

            try {  
                const res = await api.post('/users/create', {
                    body: {
                        ...this.refs.form.getValues(),
                        ...this.state.country
                    }
                })

                if (res.err) throw res.err

                setTimeout( async () => {
                    this.setState({
                        loading: false,
                        enterCode: true,
                        userID: res.body._id,
                        phone: ''
                    })
    
                    
                    Alert.alert('Sent!', "We've sent you a verification code");
                }, 6000)
            } catch (err) {
                this.setState({loading: false})
                Alert.alert('Make sure all forms are filled', err.message);
            }

        
    }

    _verifyCode = async () => {

        this.setState({ loading: true })

        let _id = this.state.userID
        const route = [
            {title: 'App', component: App, index: 0}
        ]

        try {
            const res = await api.post('/users/'+_id+'/verify', {
                body: {
                    ...this.refs.form.getValues()
                }
            })

            if (res.err) throw res.err;

            // Save the user profile to disk after logging in
            try {
                await AsyncStorage.setItem('userProfile', JSON.stringify(res.body))
            } catch (err) {
                console.log('err saving the userId')
            }

            // this.refs.form.refs.textInput.blur();

            this.setState({ 
                loading: false,
                verified: true 
            })
            Alert.alert('Great success! you are verified :)')
            const routes = this.props.navigator.getCurrentRoutes()
            this.props.navigator.immediatelyResetRouteStack(route)

        } catch (err) {
            this.setState({ loading: false })
            Alert.alert('Oops! didnt work', err.message)
        }
    }

    _login = async () => {

        this.setState({ loading: true })

        const route = [
            {title: 'App', component: App, index: 0}
        ]

        try {
            const res = await api.post('/users/find', {
                body: {
                    ...this.refs.form.getValues()
                }
            })

            if (res.err) throw res.err;

            // Save the user profile to disk after logging in
            try {
                await AsyncStorage.setItem('userProfile', JSON.stringify(res.body))
            } catch (err) {
                console.log('err saving the userId')
            }

            this.refs.form.refs.textInput.blur();

            this.setState({ 
                loading: false,
                verified: true 
            })

            Alert.alert('Great success! you are logged in :)')
            const routes = this.props.navigator.getCurrentRoutes()
            this.props.navigator.immediatelyResetRouteStack(route)
            
        } catch (err) {
            this.setState({ loading: false })
            Alert.alert('Oops! didnt work', err.message)
        }
    }

    _tryAgain = () => {
        // this.refs.form.refs.textInput.setNativeProps({ text: '' })
        // this.refs.form.refs.textInput.focus();
        this.setState({ enterCode: false, phone: ''});
    }
  
    _getSubmitAction = () => {
        this.state.enterCode ? this._verifyCode() : this._getCode();
    }

    // Use for debugging with socket.io
    _appendMessage = (message) => {
        this.setState({messages: this.state.messages.concat(message)});
    }
  
    _renderFooter = () => {

        if (this.state.enterCode)
            return (
                <View>
                    <Text style={styles.wrongNumberText} onPress={this._tryAgain}>
                        Enter the wrong number or need a <Text style={styles.selectText}>new code?</Text>
                    </Text>
                </View>
            )

        else if(this.state.loading)

            return <View />

            return (
                <View>
                    <Text style={styles.disclaimerText}>By tapping "Send confirmation code" above, we will send you an SMS to confirm your phone number. Message &amp; data rates may apply.</Text>
                </View>
            )

    }

    _renderEmail = () => {

        let loadingText = this.state.loading ? {
            color: '#744BAC'
        } : {}

        if (this.state.enterCode)

            return <View />

            return (
                <View>

                    <TextInput
                        ref={'textInput'}
                        name={'name'}
                        type={'TextInput'}
                        returnKeyType="next"
                        onSubmitEditing={() => this.emailInput.focus()}
                        autoCorrect={false}
                        style={[styles.textInput, loadingText]}
                        onChangeText={(name) => this.setState({name})}
                        placeholder={'Name'}
                    />

                    <TextInput
                        ref={(textInput) => this.emailInput = textInput}
                        name={'email'}
                        type={'TextInput'}
                        keyboardType="email-address"
                        autoCorrect={false}
                        autoCapitalize="none"
                        returnKeyType="next"
                        onSubmitEditing={() => this.phoneInput.focus()}
                        style={[styles.textInput, loadingText]}
                        onChangeText={ (email) => this.setState({email}) }
                        placeholder={'Email(must be unique)'}
                    />

                </View>
            )
    }

    _renderLoginButton = () => {

        let loadingText = this.state.loading ? {
            color: '#744BAC'
        } : {}
        
        if(this.state.enterCode) 

            return <View />

            return (
                <TouchableOpacity onPress={this._login}>
                    <Text style={[styles.selectText, loadingText]}>login with email</Text>
                </TouchableOpacity>
            )
    }

    _renderButton = () => {

        let switchText = this.state.isBarber ? "Sign me up as a barber!" : "I am not a barber"
        let loadingText = this.state.loading ? {
            color: '#744BAC'
        } : {}

        if (this.state.enterCode)

            return <View />

        else 

            return  (
                <View style={{flexDirection: 'row', justifyContent: "space-between"}}>               
                    <Switch
                        ref={'switch'}
                        type={'Switch'}
                        name={'isBarber'}
                        style={styles.switch}
                        value={this.state.isBarber}
                        onValueChange={(value) => this.setState({ isBarber: value})}
                        onTintColor="#744BAC"
                        thumbTintColor="#744BAC"
                        tintColor="#744BAC"
                    />
                    <Text style={[styles.switchText, loadingText]}>{switchText}</Text>
                </View>
            )
    }

    render() {

    let buttonText = this.state.enterCode ? 'Verify confirmation code' : this.state.loading ? '"I only get my haircut with Nomad." -Drake' : 'Send confirmation code';
    let textStyle = this.state.enterCode ? {
        height: 50,
        textAlign: 'center',
        fontSize: 40,
        fontWeight: 'bold',
        fontFamily: 'Courier',
        borderWidth: 0
    } : {}
    let loadingText = this.state.loading ? {
        color: '#744BAC'
    } : {}

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={this.state.loading ? styles.loadingContainer : styles.container}> 
                <StatusBar hidden={this.props.statusBar} />
                <KeyboardAvoidingView behavior="position">
                    <View style={styles.logo}>
                        <Ionicon name="ios-cut-outline" size={100} color={this.state.loading ? 'white' : '#744BAC'} />
                    </View>
                    <Text style={styles.welcome}>
                        Welcome to Nomad
                    </Text>
                    <Form ref={'form'} style={styles.form}>

                        {this._renderEmail()}
                        <TextInput
                            ref={(textInput) => this.phoneInput = textInput}
                            name={this.state.enterCode ? 'code' : 'phoneNumber' }
                            type={'TextInput'}
                            autoCapitalize={'none'}
                            autoCorrect={false}
                            onChangeText={this._onChangeText}
                            keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
                            style={[styles.textInput, textStyle, loadingText]}
                            onChangeText={(phone) => this.setState({phone})}
                            placeholder={this.state.enterCode ? '_ _ _ _ _ _' : 'Phone Number'}
                            autoCorrect={false}
                            value={this.state.phone}
                        />

                        {this._renderButton()}

                    <TouchableOpacity style={[styles.button]} onPress={this._getSubmitAction}>
                        <Text style={styles.buttonText}>{ buttonText }</Text>
                    </TouchableOpacity>

                    {this._renderLoginButton()}                    
                    </Form>
                </KeyboardAvoidingView>
                {this._renderFooter()}
            </View> 
        </TouchableWithoutFeedback> 
    )
  }
}