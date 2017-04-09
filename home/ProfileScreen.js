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
            <Text style={styles.tabTitle}>{this.props.page}</Text>
            <Image 
              style={styles.image}
              source={{uri: 'https://placehold.it/150x150'}} />
              <Text style={[styles.tabText, styles.profileName]}>Hello {this.props.userProfile.name}</Text>

              <View style={styles.profileForm}>
                <View>
                  <Text style={[styles.tabText, styles.tabSubTitle]}>Name: </Text>
                  <Text style={styles.tabText}>{this.props.userProfile.name}</Text>
                </View>
                <TouchableOpacity onPress={() => this.setState({open: true})}>
                  <Text style={styles.edit}>Edit</Text>
                </TouchableOpacity>
              </View>

             <View style={styles.profileForm}>
                <View>
                  <Text style={[styles.tabText, styles.tabSubTitle]}>Email: </Text>
                  <Text style={styles.tabText}>{this.props.userProfile.email}</Text>
                </View>
                <TouchableOpacity onPress={() => this.setState({open: true})}>
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
                    <Icon name="md-close" size={30} color={this.state.loading ? 'white' : '#744BAC'} />
                  </TouchableOpacity>
                  <View style={styles.modalUpdateUser}>
                    <Text style={styles.modalText}>hey</Text>
                    <View style={{justifyContent: 'space-between', flexDirection: 'row', paddingBottom: 5}}>
                      <TouchableOpacity
                        style={ styles.modalSave }
                        onPress={() => this._navigate(ShopLayout, this.state)} >
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



