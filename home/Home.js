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
import Icon from 'react-native-vector-icons/Ionicons'
import Modal from 'react-native-simple-modal'
import styles from '../styles/StyleMain'
import Frisbee from 'frisbee';
import CutScreen from './CutScreen'
import MapScreen from './MapScreen'
import ProfileScreen from './ProfileScreen'
import App from '../App'

const api = new Frisbee({
    // baseURI: 'https://cryptic-sea-14253.herokuapp.com',
    baseURI: 'http://localhost:3000',
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

    _editUserProfile = async () => {

        let _id = this.props.userProfile._id
        console.log(_id)

        try {
            const res = await api.put('/users/'+_id+'/update', {
                body: {
                    ...this.refs.form.getValues(),
                }
            })

            if (res.err) throw res.err

            this.setState({
                name: res.body.name,
                email: res.body.email,
                open: false
            })

            // Save the user profile to disk after edit in
            try {
                await AsyncStorage.setItem('userProfile', JSON.stringify(res.body))
            } catch (err) {
                console.log('err saving the userId')
            }

            
        } catch (err) {
            Alert.alert('Oops!', err.message);
        }
    }

    _renderContent = (page, userProfile) => {

    if(page === 'Profile Tab')

        return (
            <View style={styles.greetingScreen}>
                <View style={styles.tabContent}>
                <Text style={styles.tabTitle}>Nomad</Text>
                
                    <View style={styles.profileHead}>
                        <Image 
                        style={styles.image}
                        source={{uri: 'https://placehold.it/150x150'}} />
                        <Text style={[styles.tabText, styles.profileName]}>Hello {this.state.name}</Text>
                    </View>
                    
                    <Hr lineColor='#C33C54' />

                    <View style={styles.profileForm}>
                        <View>
                            <Text style={[styles.tabText, styles.tabSubTitle]}>Name: </Text>
                            <Text style={styles.tabText}>{this.state.name}</Text>
                        </View>
                        <TouchableOpacity onPress={() => this.setState({open: true, edit: 'name'})}>
                            <Text style={styles.edit}>Edit</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.profileForm}>
                        <View>
                            <Text style={[styles.tabText, styles.tabSubTitle]}>Email: </Text>
                            <Text style={styles.tabText}>{this.state.email}</Text>
                        </View>
                        <TouchableOpacity onPress={() => this.setState({open: true, edit: 'email'})}>
                            <Text style={styles.edit}>Edit</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.profileForm}>
                        <View>
                            <Text style={[styles.tabText, styles.tabSubTitle]}>Phone: </Text>
                            <Text style={styles.tabText}>{this.props.userProfile.phone}</Text>
                        </View>
                    </View>

                    <TouchableOpacity style={[styles.buttonLogout, styles.logOut]} onPress={this._clearAsyncStorage}>
                        <Text style={styles.buttonTextLogout}>Log out</Text>
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
                        <Icon name="md-close" size={25} color={this.state.loading ? 'white' : '#C33C54'} />
                        </TouchableOpacity>
                        <Hr lineColor='#465C69' text={this.state.edit === 'email' ? 'edit email' : 'edit name'} textColor='#363457' />
                        <View style={styles.modalUpdateUser}>
                        <View style={{justifyContent: 'space-between', flexDirection: 'row', paddingBottom: 5, flex: 1, paddingTop: 5}}>
                            <Form ref={'form'}>
                                <TextInput
                                    ref={'textInput'}
                                    name={this.state.edit === 'email' ? 'email' : 'name'}
                                    type={'TextInput'}
                                    style={styles.textInputModal}
                                    value={this.state.edit === 'email' ? this.state.email : this.state.name}
                                    placeholder={this.state.edit === 'email' ? 'Email' : 'Name'}
                                />
                            </Form>
                            <TouchableOpacity
                            style={ styles.modalSave }
                            onPress={this._editUserProfile} >
                            <Text style={styles.modalButton}>Save</Text>
                            </TouchableOpacity>
                        </View>
                        </View>
                    </View>
                </Modal>
                </View>
        )
        
        else if(page === 'Cut Tab')

        return (
            <View style={styles.greetingScreen}>
                <View style={styles.tabContent}>
                    <Text style={styles.tabTitle}>Nomad</Text>
                </View>
            </View>
        )

        else if(page === 'Map Tab')

            return <MapScreen page={page} />

    }


  render() {
    return (
    <TabBarIOS
        tintColor="#744BAC">
        <Icon.TabBarItem
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
        </Icon.TabBarItem>
        <Icon.TabBarItem
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
        </Icon.TabBarItem>
        <Icon.TabBarItem
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
        </Icon.TabBarItem>
      </TabBarIOS>
    );
  }
}



