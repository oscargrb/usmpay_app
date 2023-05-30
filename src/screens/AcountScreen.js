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
import Loader from "../components/Loader"
import UserService from "../common/UserService"

const AcountScreen = props =>{

    const [loader, setLoader] = useState(false)

    const nav = screen =>{
        props.navigation.navigate(screen)
    }

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
                        elevation: 1,
                        zIndex: 1,
                        flex:1,
                        justifyContent:"center",
                        
                    }}
                >
                    <DisplayTickets nav={nav} />
                    <ActionPayTicket nav={nav} />
                    <PaymentsHistoric nav={nav} />
                    
                </View>
                
            </View>
            {
                loader?
                    <Loader />:
                    <></>
            }
        </Provider>
    )
}

export default AcountScreen