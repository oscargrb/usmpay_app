import { Text, View, StyleSheet, Image, Platform} from "react-native"
import React, { useState, useEffect, useContext } from "react"
import {  Button, IconButton } from "react-native-paper"
import globalStyles from "../../common/globalStyles"
import UserInfoContext from "../../context/UserInfoContext"
import nfcManager, { NfcEvents } from "react-native-nfc-manager"


const styles = StyleSheet.create({
    wrappper:{
        flex:1,
        alignItems: 'center',
        justifyContent:"flex-start",
        backgroundColor: globalStyles.colors.grey,
        padding:30 
    },  
    logo: {
        width: 300,
        height: 300,
        resizeMode: "contain",
        borderWidth: 2
    },
    
    logoTitle:{
        color:globalStyles.colors.black,
        fontSize: 30,
        fontWeight:"bold",
        textAlign:"center"
    },
    logoSubTitle:{
        color:globalStyles.colors.blue,
        fontSize: 14,
        margin:20
    }
})

const NFCReadScreen = props =>{

    const {userInfo} = useContext(UserInfoContext)

    useEffect(()=>{
        
        const initNFC = async ()=>{
            if(nfcManager.isEnabled()){
                nfcManager.start().then(()=>{
                    if(Platform.OS == "android"){
                        Alert.alert("Escaneo activado")
                        nfcManager.setEventListener(NfcEvents.DiscoverTag, (tag=>{
                            console.log(tag)
                            nfcManager.unregisterTagEvent().catch(()=> 0)
                        }))
                    }else{
                        Alert.alert("Esta aplicacion todavia no soporta IOS")
                        
                    }
                })
            }else{
                Alert.alert("NFC esta desabilitado en este dispositivo")
                
            }
            
        }

        initNFC()

        

    }, [])

    return(
        <View
            style={{
                flex:1,
                backgroundColor:globalStyles.colors.grey
            }}
        >
            <View>
                <IconButton 
                    icon={"keyboard-backspace"}
                    iconColor={globalStyles.colors.black}
                    onPress={()=> {
                        nfcManager.unregisterTagEvent().catch(()=> 0)
                        props.navigation.goBack()
                    }}
                    
                />
            </View>
            <View
                style={styles.wrappper} 
            >
                
                <Image 
                    source={require('../../assets/gif/nfcTrns.gif')}
                    style={styles.logo}
                />
                <Text
                    style={styles.logoTitle}
                >
                    Esperando Ticket para {userInfo.rutaActual.nbRuta}...
                </Text>
                <Text
                    style={styles.logoSubTitle}
                >
                    Para realizar la transaccion acerque los dispositivos a una distancia de 30cm aprox.
                </Text>
                
            </View>
        </View>
    )
}

export default NFCReadScreen