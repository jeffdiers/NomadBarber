import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  AsyncStorage
} from 'react-native'
import Hr from 'react-native-hr'
import styles from '../styles/StyleMain'
import Modal from 'react-native-simple-modal'
import Icon from 'react-native-vector-icons/Ionicons'

export default class ProfileScreen extends Component {
    constructor(props) {
        super(props) 

        this.state = {
          open: false
        }
    }

    _clearAsyncStorage = async () => {

      console.log('logout pressed')
        try {
            // await AsyncStorage.removeItem('userProfile')
            this.props.navigator.push({
                title: "LoginForm"
            })
        } catch (err) {
            console.log('error removing user')
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
      );
    }
}



