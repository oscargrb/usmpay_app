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
                    <DisplayTicketsReader  />
                    <OptionsReader nav={nav} />
                    <PaymentsHistoricReader />
                    
                </View>
                {/* <TokenTimeout /> */}
            </View>
        </Provider>
    )
}

export default AcountReaderScreen