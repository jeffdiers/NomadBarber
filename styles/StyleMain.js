
import {
  StyleSheet,
  Dimensions
} from 'react-native';

const brandColor = '#744BAC';
const brandColorDark = '#363457'
const brandColorLight = '#465C69'
const brandColorContrast = '#C33C54'
const brandColorBackground = '#F5FCFF'
const brandFont = 'AppleSDGothicNeo-Regular'
const fullWidth = Dimensions.get('window').width; //full width
const fullHeight = Dimensions.get('window').height; //full height

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: brandColorBackground,
  },
  loadingContainer: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    opacity: 0.75,
    backgroundColor: brandColor,
    height: fullHeight,
    width: fullWidth
  },
  logo: {
      alignItems: 'center',
      marginTop: 40
  },
  welcome: {
    fontSize: 24,
    textAlign: 'center',
    marginTop: 10,
    margin: 20,
    color: brandColor
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  form: {
    margin: 10
  },
  textInput: {
      height: 40, 
      borderWidth: 1,
      borderRadius: 4,
      borderColor: brandColor,
    //   fontFamily: brandFont,
      padding: 10,
      marginBottom: 20,
  },
  button: {
      height: 50,
      backgroundColor: brandColor,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 5
  },
  buttonText: {
    color: brandColorBackground,
    fontFamily: brandFont,
    fontSize: 16,
    fontWeight: 'bold'
  },
  switch: {
    marginBottom: 20,
  },
  switchText: {
    paddingTop: 0,
    fontSize: 24,
    color: brandColor,
    fontFamily: brandFont
  },
  wrongNumberText: {
    marginTop: 20,
    margin: 10,
    fontSize: 14,
    textAlign: 'center',
    fontFamily: brandFont
  },
  disclaimerText: {
    marginTop: 30,
    fontSize: 12,
    color: 'grey'
  },

  // Home Screen styles
  greetingScreen: {
    backgroundColor: '#F5FCFF',
    flex: 1
  },
  tabContent: {
    flex: 1,
    marginTop: 30,
    marginLeft: 10,
    marginRight: 10,
  },
  tabTitle: {
    textAlign: 'center',
    marginBottom: 12,
    fontFamily: brandFont,
    fontSize: 15,
  },
  tabText: {
      fontSize: 17,
      fontFamily: brandFont,
      margin: 3,
      color: brandColorDark,

  },
  profileName: {
    marginBottom: 40,
    fontSize: 24,
    color: brandColorDark
  },
  tabSubTitle: {
    color: brandColor
  },
  image: {
      width: 150, 
      height: 150,
      marginTop: 6,
      marginBottom: 10,
    },
    profileForm: {
        flexDirection: 'row', 
        justifyContent: "space-between",
        marginTop: 10,
        marginBottom: 10
    },
    edit: {
        fontSize: 17,
        color: brandColor,
        marginTop: 6
    },
    logOut: {
        top: 35 
    },
    buttonLogout: {
        height: 50,
        backgroundColor: brandColorBackground,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
        borderRadius: 5,
        borderColor: brandColorContrast
    },
    buttonTextLogout: {
        color: brandColorContrast,
        fontFamily: brandFont,
        fontSize: 16,
        fontWeight: 'bold'
    },

    // Modal 
    modalView: {
        // alignItems: 'center', 
        backgroundColor: brandColorBackground,
    },
    modalText: {
        fontSize: 20, 
        marginBottom: 10, 
        textAlign: 'center', 
        color: brandColorDark
    },
    modalButton: {
        fontSize: 20, 
        fontFamily: brandFont, 
        color: brandColorLight
    },
    modalUpdateUser: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
    },
    modalSave: {
        marginLeft: 20,
        paddingLeft:20,
        paddingRight:20,
        paddingTop: 6,
        paddingBottom: 2,
        borderWidth: 3,
        borderRadius: 5,
        borderColor: brandColor
    },
    modalCancel: {
        marginLeft: 5
    },
  
  // Map page styles
  map: {
    height: fullHeight,
    width: fullWidth
  }
  
});

module.exports = styles