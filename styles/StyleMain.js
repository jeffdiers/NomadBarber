
import {
  StyleSheet,
  Dimensions
} from 'react-native';

const brandColor = '#744BAC'
const brandColorDark = '#1D3557'
const brandColorLight = '#465C69'
const brandColorContrast = '#C33C54'
const brandColorBackground = '#FCFCFB'
const brandFont = 'AppleSDGothicNeo-Regular'
const brandFontBold = 'AppleSDGothicNeo-Bold'
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
    selectText : {
        textDecorationLine: 'underline',
        marginTop: 10,
        fontSize: 14,
        color: 'grey'
    },
    switch: {
        marginBottom: 20,
    },
    switchText: {
        paddingTop: 0,
        fontSize: 24,
        color: brandColorContrast,
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
        fontSize: 12,
        color: 'grey',
        margin: 10
    },


// Home Screen styles
    greetingScreen: {
        backgroundColor: brandColorBackground,
        flex: 1
    },
    tabContent: {
        flex: 1,
        marginTop: 30,
        marginLeft: 10,
        marginRight: 10,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    profileHead: {
        alignItems: 'center'
    },
    tabTitle: {
        textAlign: 'center',
        marginBottom: 12,
        fontFamily: 'Arial Rounded MT Bold',
        fontSize: 24,
        color: brandColor,
    },
    tabText: {
        fontSize: 19,
        fontFamily: brandFont,
        color: brandColorDark,
    },
    profileName: {
        marginBottom: 2,
        fontSize: 24,
        color: brandColorDark
    },
    tabSubTitle: {
        color: brandColor
    },
    image: {
        width: 150, 
        height: 150,
        marginTop: 10,
        marginBottom: 8,
        borderRadius: 5,
    },
    timeAgo: {
        color: brandColorLight,
        fontSize: 12,
        fontFamily: 'Helvetica',
        fontStyle: 'italic',
        marginBottom: 24,
    },
    profileForm: {
        flexDirection: 'row', 
        justifyContent: "space-between",
        marginTop: 10,
    },
    edit: {
        fontSize: 17,
        color: brandColorContrast
    },
    buttonLogout: {
        height: 50,
        backgroundColor: brandColorContrast,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 60,
        borderColor: brandColorContrast
    },
    buttonTextLogout: {
        color: brandColorBackground,
        fontFamily: brandFont,
        fontSize: 16,
        fontWeight: 'bold'
    },


// Modal 
    modalView: {
        backgroundColor: brandColorBackground,
    },
    modalText: {
        fontSize: 20, 
        marginBottom: 10, 
        textAlign: 'center', 
        color: brandColorBackground
    },
    modalButton: {
        fontSize: 20, 
        fontFamily: brandFont, 
        color: brandColorBackground
    },
    modalUpdateUser: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
        marginTop: 10
    },
    modalSave: {
        marginLeft: 20,
        paddingLeft:20,
        paddingRight:20,
        paddingTop: 6,
        paddingBottom: 2,
        borderRadius: 5,
        backgroundColor: brandColor,
    },
    modalCancel: {
        marginLeft: 5
    },
    textInputModal: {
        height: 35, 
        borderWidth: 1,
        borderRadius: 4,
        borderColor: brandColor,
        padding: 10,
        width: 215
    },


// Cut page styles 
    menuContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    menuItemTime: {
        flexDirection: 'row', 
        justifyContent: 'space-around',
        alignItems: 'center',
        marginLeft: 30,
        marginRight: 30
    },
    menuItemCounter: {
        flexDirection: 'row', 
        justifyContent: 'space-around',
        alignItems: 'center',
        marginLeft: 100,
        marginRight: 100,
        marginTop: 10
    },
    menuItemTitle: {
        textAlign: 'center',
        fontSize: 24,
        fontFamily: brandFont,
        margin: 3,
        color: brandColorDark,
    },
    menuItemSubtitle: {
        textAlign: 'center',
        fontSize: 13,
        marginLeft: 50,
        marginRight: 50,
        fontFamily: brandFont
    },
    buttonOrder: {
        height: 50,
        backgroundColor: brandColorContrast,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 60,
        borderColor: brandColorContrast
    },
    counterIcon: {
        padding: 5
    },
    counterButton: {
        borderWidth: 1,
        borderRadius: 2,
        borderColor: brandColor
    },
  

// Map page styles
    map: {
        height: fullHeight,
        width: fullWidth
    }
  
});

module.exports = styles