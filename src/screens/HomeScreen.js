import { Text, View, StyleSheet, Image} from "react-native"
import React from "react"
import {  Button } from "react-native-paper"
import MenuAcount from "../components/MenuAcount"


const styles = StyleSheet.create({
    wrappper:{
        flex:1,
        alignItems: 'center',
        justifyContent:"flex-start"
    },  
    logo: {
        width: 600,
        height: 400,
        resizeMode: "contain",
        borderWidth: 2
    },
    registerTextContainer: {
        margin: 20
    },
    registerTextTitle: {
        textAlign:"center"
    },
    registerTextLink:{
        textAlign:"center",
        color:"blue"
    }
})

const HomeScreen = props =>{

    return(
        <View
            style={styles.wrappper} 
        >
            <Image
                style={styles.logo}
                source={require('../assets/logo.png')}
            />
            <View>
                <Button
                    buttonColor="#00a"
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