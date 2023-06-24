import { Text, View, StyleSheet, Image, Alert} from "react-native"
import React, { useState, useEffect, useContext } from "react"
import {  Button, IconButton } from "react-native-paper"
import globalStyles from "../../common/globalStyles"
import UserInfoContext from "../../context/UserInfoContext"
import nfcManager, { Ndef, NfcEvents, NfcTech } from "react-native-nfc-manager"


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

const NFCUserScreen = props =>{
    
    const {userInfo} = useContext(UserInfoContext)

    useEffect(()=>{
        nfcManager.start()
        return ()=>{
            nfcManager.cancelTechnologyRequest()
        }
    },[])

    const onTagDiscovered = async tag => {
        try {
          let messages = [
            Ndef.textRecord('Hello, world!')
          ];
          await nfcManager.writeNdefMessage(messages);
          console.log('Message written to tag:', messages);
          nfcManager.unregisterTagEvent();
        } catch (ex) {
          console.warn('Error writing to tag', ex);
        }
    }

    const onPress = async () => {
        try {
          await nfcManager.registerTagEvent(onTagDiscovered);
        } catch (ex) {
          console.warn('Error while registering tag event', ex);
        }
      }

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
                    onPress={async ()=> {
                        await nfcManager.cancelTechnologyRequest()
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
                    Pagando Ticket para {userInfo.selectRuta}...
                </Text>
                <Text
                    style={styles.logoSubTitle}
                >
                    Para realizar la transaccion acerque los dispositivos a una distancia de 30cm aprox.
                </Text>
                <Button
                    onPress={onPress}
                >Escribir</Button>
            </View>
        </View>
    )
}

export default NFCUserScreen