import { Text, View, StyleSheet, Image, Platform, Alert, VirtualizedList} from "react-native"
import React, { useState, useEffect, useContext } from "react"
import {  Button, IconButton, Modal, Portal } from "react-native-paper"
import globalStyles from "../../common/globalStyles"
import UserInfoContext from "../../context/UserInfoContext"
import nfcManager, { NfcEvents,NfcTech } from "react-native-nfc-manager"


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
    const [timer, setTimer] = useState(20)
    const [intervalId, setIntervalId] = useState(null) 
    const [modal, setModal] = useState(false)

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
        nfcManager.start()
            .then(()=>{
                read()
            })
        init()
    },[])

    const read = async ()=>{
        let tag = null

        try{
            await nfcManager.requestTechnology([NfcTech.Ndef]);
            tag = await nfcManager.getTag()
            tag.ndefStatus = await nfcManager.ndefHandler.getNdefStatus()

        }catch(e){
            console.log(e)
        }finally{
            nfcManager.cancelTechnologyRequest()
        }

        if(tag){
            setModal(true)
        }
    }

    return(
        <View
            style={{
                flex:1,
                backgroundColor:globalStyles.colors.grey
            }}
        >
            <Portal>
                <Modal visible={modal} 
                    style={{
                        backgroundColor:globalStyles.colors.white,
                        marginHorizontal: 50,
                        marginTop:200,
                        marginBottom:200,
                        padding:20,
                        borderRadius:20
                    }}
                >
                    <View
                        style={{
                            
                            flexDirection:"column",
                            justifyContent:"center",
                            alignItems:"center"
                        }}
                    >
                        <IconButton icon={"check-circle"} 
                            iconColor={globalStyles.colors.green}
                            size={150}
                        />
                        <Text
                            style={{
                                fontSize:20,
                                color:globalStyles.colors.black
                            }}
                        >
                            Pago realizado con exito
                        </Text>
                        <Button
                            textColor={globalStyles.colors.white}
                            style={{
                                margin:30,
                                backgroundColor:globalStyles.colors.blue,
                            }}
                            onPress={async ()=>{
                                await nfcManager.cancelTechnologyRequest()
                                clearInterval(intervalId)
                                props.navigation.goBack()
                            }}
                        >
                            Continuar
                        </Button>
                    </View>
                    
                </Modal>
            </Portal>
            <View>
                <IconButton 
                    icon={"keyboard-backspace"}
                    iconColor={globalStyles.colors.black}
                    onPress={async ()=> {
                        
                        await nfcManager.cancelTechnologyRequest()
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