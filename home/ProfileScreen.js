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
  StatusBar,
  Switch,
} from 'react-native'
import Hr from 'react-native-hr'
import Form from 'react-native-form'
import Icon from 'react-native-vector-icons/Ionicons'
import Modal from 'react-native-simple-modal'
import styles from '../styles/StyleMain'
import Frisbee from 'frisbee'
import App from '../App'
import LinearGradient from 'react-native-linear-gradient'
import baseApi from '../api.js'
import TimeAgo from 'react-native-timeago'

const api = new Frisbee({
    baseURI: baseApi,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
})

export default class ProfileScreen extends Component {

    static defaultProps = {
        userProfile: {}
    }

    constructor(props) {
        super(props) 

        this.state = {
            name: this.props.userProfile.name,
            email: this.props.userProfile.email,
            open: false,
            isWorking: false
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

    render() {
      return (
            <View style={styles.greetingScreen}>
                <View style={styles.tabContent}>
                <Text style={styles.tabTitle}>Nomad</Text>
                
                    <View style={styles.profileHead}>
                        <Image 
                        style={styles.image}
                        source={require('../img/grumpy.jpg')} />
                        <Text style={[styles.tabText, styles.profileName]}>Hello {this.state.name}</Text>
                        <Text style={[styles.tabText, styles.timeAgo]}>joined <TimeAgo time={this.props.userProfile.dateJoined} /></Text>
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

                    <TouchableOpacity style={[styles.buttonLogout, styles.logOut]} onPress={this.props._clearAsyncStorage}>
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
                                    placeholder={this.state.edit === 'email' ? this.state.email : this.state.name}
                                />
                            </Form>
                            <TouchableOpacity
                                style={styles.modalSave}
                                onPress={this._editUserProfile} >
                            <Text style={styles.modalButton}>Save</Text>
                            </TouchableOpacity>
                        </View>
                        </View>
                    </View>
                </Modal>
            </View>
      );
    }
}



