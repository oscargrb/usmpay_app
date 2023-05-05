import { View, StyleSheet, Image,  BackHandler} from 'react-native'
import {useEffect} from 'react'
import { Text } from 'react-native-paper'
import globalStyles from '../common/globalStyles'

const styles = StyleSheet.create({
    wrappper:{
        flex:1,
        alignItems: 'center',
        justifyContent:"center",
        backgroundColor: globalStyles.colors.white
    },  
    logo: {
        width: 250,
        height: 250,
        resizeMode: "contain",
        borderWidth: 2
    },
    registerTextContainer: {
        margin: 20,
        alignItems:"center",
        
    },
    registerTextTitle: {
        textAlign:"center",
        fontWeight:"bold",
        color: globalStyles.colors.black,
        fontSize:20
    },
    registerTextInfo: {
        marginTop:20,
        textAlign:"justify",
        color: globalStyles.colors.black
    },
    logoTitle:{
        color:globalStyles.colors.blue,
        fontSize: 50,
        fontWeight:"bold",
        fontFamily:"roboto",
    }
})

const SorryScreen = props=>{

    useEffect(()=>{
        const backAction = ()=>{
            
            BackHandler.exitApp()
            return true
        }

        const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction)

        return () => backHandler.remove();
    }, [])
    
    return(
        <View
            style={styles.wrappper} 
        >
            <Image
                style={styles.logo}
                source={require('../assets/sorry.png')}
            />
            
            <View
                style={styles.registerTextContainer}
                
            >
                <Text
                    style={styles.logoTitle}
                >
                    Lo sentimos
                </Text>
                <Text
                    style={styles.registerTextTitle}
                >
                    Tu dispositivo no cuenta con tecnologia NFC!
                </Text>

                <Text
                    style={styles.registerTextInfo}
                >
                    NFC te permite realizar transacciones de forma agil y rapida,
                    no te preocupes la mayoria de empresas de smartphones estan
                    incluyendo esta tecnologia. para mas informacion comunicate con
                    los desarrolladores de esta app. 
                    usmpay_support@gmail.com 
                </Text>
                
            </View>
        </View>
    )
}

export default SorryScreen