import { Text, View, StyleSheet, Image} from "react-native"
import React from "react"
import {  Button } from "react-native-paper"
import MenuAcount from "../components/MenuAcount"
import globalStyles from "../common/globalStyles"

const styles = StyleSheet.create({
    wrappper:{
        flex:1,
        alignItems: 'center',
        justifyContent:"space-evenly",
        backgroundColor: globalStyles.colors.blue 
    },  
    logo: {
        width: 200,
        height: 200,
        resizeMode: "contain",
        borderWidth: 2
    },
    registerTextContainer: {
        margin: 20
    },
    registerTextTitle: {
        textAlign:"center",
        color: globalStyles.colors.white
    },
    registerTextLink:{
        textAlign:"center",
        color:globalStyles.colors.white
    },
    logoTitle:{
        color:globalStyles.colors.white,
        fontSize: 50,
        fontWeight:"bold",
        fontFamily:"roboto",
        fontStyle:"italic"
    }
})

const HomeScreen = props =>{

    return(
        <View
            style={styles.wrappper} 
        >
            <Image
                style={styles.logo}
                source={require('../assets/logo_white.png')}
            />
            <Text
                style={styles.logoTitle}
            >
                USMPAY
            </Text>
            <View>
                <Button
                    buttonColor= {globalStyles.colors.white}
                    textColor={globalStyles.colors.blue}
                    mode="contained"
                    onPress={() => props.navigation.navigate('Login')}
                >
                    Iniciar Sesion
                </Button>
            </View>
            <View
                style={styles.registerTextContainer}
            >
                <Text
                    style={styles.registerTextTitle}
                >
                    No tengo una cuenta en Usmpay
                </Text>
                <Text
                    style={styles.registerTextLink}
                    onPress={()=> props.navigation.navigate('Register')}
                >
                    Abrir cuenta
                </Text>
                
            </View>
        </View>
    )
}

export default HomeScreen