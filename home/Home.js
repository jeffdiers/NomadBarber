import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  AsyncStorage,
  TouchableOpacity,
  TabBarIOS,
} from 'react-native'
import styles from '../styles/StyleMain'
import Icon from 'react-native-vector-icons/Ionicons'
import CutScreen from './CutScreen'
import MapScreen from './MapScreen'
import Modal from 'react-native-simple-modal'
import ProfileScreen from './ProfileScreen'


export default class WelcomeScreen extends Component {

    // Fixed the 'cannot reand property 'user' of undefined by setting a default value to user Profile
    static defaultProps = {
        userProfile: {}
    }

    constructor(props) {
        super(props) 
        this.state = {
            open: false,
            messages: [],
            selectedTab: 'profileTab'
        }
        
    }

    _clearAsyncStorage = async () => {

      console.log('logout pressed')
        try {
            await AsyncStorage.removeItem('userProfile')
            const routes = this.props.navigator.getCurrentRoutes()
            this.props.navigator.jumpTo(routes[0])
        } catch (err) {
            console.log('error removing user')
        }
    }

    _renderContent = (page, userProfile) => {

    console.log(this.props.userProfile)
    if(page === 'Profile Tab')

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
                        onPress={() => console.log('save pressed')} >
                        <Text style={styles.modalButton}>Save</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
              </View>
            </Modal>
          </View>
      )
        
        else if(page === 'Cut Tab')

            return <CutScreen page={page} />

        else if(page === 'Map Tab')

            return <MapScreen page={page} />

    }


  render() {
    return (
    <TabBarIOS
        tintColor="#744BAC">
        <Icon.TabBarItem
            title="Profile"
            iconName="ios-person-outline"
            selectedIconName="ios-person-outline"
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
            iconName="ios-cut-outline"
            selectedIconName="ios-cut-outline"
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
            iconName="ios-map-outline"
            selectedIconName="ios-map-outline"
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



