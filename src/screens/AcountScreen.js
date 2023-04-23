import {useEffect, useState} from "react"
import {View, Dimensions, BackHandler, Alert} from 'react-native'
import { Provider } from 'react-native-paper'

import DisplayTickets from '../components/DisplayTickets'
import Header from '../components/Header'
import MenuAcount from '../components/MenuAcount'
import PaymentsHistoric from '../components/PaymentsHistoric'
import ActionPayTicket from '../components/ActionPayTicket'
import nxu from "../context/Nxu"
import Ucred from "../context/Ucred"
import ModalFingerPref from "../components/ModalFingerPref"
import ApiService from "../common/ApiService"

const AcountScreen = props =>{

    const nav = screen =>{
        props.navigation.navigate(screen)
    }

    useEffect(()=>{
        const sendNxu = async ()=>{
            const result = await nxu.gnxut()
            const ucred = await Ucred.gUcred()

            if(result.ok){
                fetch(`${ApiService.url}/info`, {
                    method:"GET",
                    headers:{
                        "Authorization": `Bearer ${result.val}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        user: ucred.result.data.user
                    })
                }).then(response=>{
                    console.log(response)
                    response.json().then(data=>{
                        console.log(data, "here")
                    }).catch(e=>{
                        console.log(e, "asd")
                    })
                }).catch(e=>{
                    console.log(e)
                })
            }
        }

        const backAction = ()=>{
            Alert.alert(
                'Espera!',
                'Estas seguro que desea salir?',
                [
                    {
                        text:"Cancelar",
                        onPress: ()=> null
                    },
                    {
                        text: "Aceptar",
                        onPress: ()=>nav('Home')
                        
                    }
                ]
            )

            return true
        }

        const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction)

        sendNxu()

        return ()=> backHandler.remove()
    }, []) 

    return(
        <Provider
            
        >
            <View
                style={{

                    justifyContent:"flex-start",
                    height:Dimensions.get("window").height,
                    overflow:"scroll"
                }}
            >
                <View
                    style={{
                        elevation: 2,
                        zIndex: 2
                    }}
                >
                    <Header nav={nav} />
                </View>
                <View
                    style={{
                        elevation: 1,
                        zIndex: 1,
                        flex:1,
                        justifyContent:"center",
                        
                    }}
                >
                    <DisplayTickets />
                    <ActionPayTicket nav={nav} />
                    <PaymentsHistoric />
                    
                </View>
                
            </View>
        </Provider>
    )
}

export default AcountScreen