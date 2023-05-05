import {useContext, useEffect, useState} from "react"
import {View, Dimensions, BackHandler, Alert} from 'react-native'
import { Provider, Text } from 'react-native-paper'

import DisplayTickets from '../components/DisplayTickets'
import Header from '../components/Header'
import MenuAcount from '../components/MenuAcount'
import PaymentsHistoric from '../components/PaymentsHistoric'
import ActionPayTicket from '../components/ActionPayTicket'
import nxu from "../context/Nxu"
import Ucred from "../context/Ucred"
import ModalFingerPref from "../components/ModalFingerPref"
import ApiService from "../common/ApiService"
import TokenTimeout from "../components/tokenTimeout"
import UserInfoContext from "../context/UserInfoContext"
import DisplayTicketsReader from "../components/Reader/DisplayTicketsReader"
import OptionsReader from "../components/Reader/OptionsReader"
import PaymentsHistoricReader from "../components/Reader/PaymentsHistoricReader"


const AcountReaderScreen = props =>{

    const {infoProfile = userInfo, updateUserInfo} = useContext(UserInfoContext)

    const [userInfo, setUserInfo] = useState({
        name:"",
        balance:"0.00",
        email:"",
        tickets:[]
    })

    const nav = screen =>{
        props.navigation.navigate(screen)
    }

    useEffect(()=>{

        const sendNxu = async ()=>{
            const auth = await nxu.gnxut()
            const ucred = await Ucred.gUcred()

            if(auth.ok){ 
                fetch(`${ApiService.url}/info`, {
                    method:"POST",
                    headers:{
                        "Authorization": `Bearer ${auth.result.tkn}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        user: ucred.result.data.user
                    })
                }).then(response=>{
                    
                    response.json().then(data=>{
                        data.rutaActual = "La California"
                        setUserInfo(data)
                        updateUserInfo(data)
                    }).catch(e=>{
                        console.log(e, "error")
                    })
                }).catch(e=>{
                    console.log(e)
                })

                /* setTimeout(()=>{

                }, ) */
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
                {/* <View
                    style={{
                        elevation: 2,
                        zIndex: 2
                    }}
                >
                    <Header nav={nav}  />
                </View> */}
                <View
                    style={{
                        elevation: 1,
                        zIndex: 1,
                        flex:1,
                        justifyContent:"center",
                        
                    }}
                >
                    <DisplayTicketsReader  rutaActual={userInfo.rutaActual} tickets={userInfo.tickets} />
                    <OptionsReader nav={nav} />
                    <PaymentsHistoricReader />
                    
                </View>
                {/* <TokenTimeout /> */}
            </View>
        </Provider>
    )
}

export default AcountReaderScreen