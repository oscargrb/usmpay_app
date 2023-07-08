import { Text, View, StyleSheet, Image, Alert} from "react-native"
import React, { useState, useEffect, useContext } from "react"
import {  Button, IconButton } from "react-native-paper"
import globalStyles from "../../common/globalStyles"
import UserInfoContext from "../../context/UserInfoContext"
import nfcManager, { Ndef, NfcEvents ,NfcTech  } from "react-native-nfc-manager"



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
    const [timer, setTimer] = useState(20)
    const [intervalId, setIntervalId] = useState(null) 

    const init = ()=>{
        let timeAux = timer
        
        const timing = ()=>{
            if(timeAux <= 0){
                clearInterval(intervalID)
                props.navigation.goBack()
            }

            setTimer(timeAux--)
        }

        const intervalID = setInterval(timing, 1000)
        setIntervalId(intervalID)
    }

    useEffect(()=>{
        init()
    },[])

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
                        clearInterval(intervalId)
                        props.navigation.goBack()
                    }}
                    
                />
            </View>
            <View
                style={styles.wrappper} 
            >
                <View>
                    <Text
                        style={{
                            fontSize:16,
                            color:globalStyles.colors.blue
                        }}
                    >
                        {timer}s
                    </Text>
                </View>
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
                
            </View>
        </View>
    )
}

export default NFCUserScreen