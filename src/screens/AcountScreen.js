import {useEffect} from "react"
import {View, Dimensions} from 'react-native'
import { Provider } from 'react-native-paper'

import DisplayTickets from '../components/DisplayTickets'
import Header from '../components/Header'
import MenuAcount from '../components/MenuAcount'
import PaymentsHistoric from '../components/PaymentsHistoric'
import ActionPayTicket from '../components/ActionPayTicket'
import nxu from "../context/Nxu"

const AcountScreen = props =>{

    const nav = screen =>{
        props.navigation.navigate(screen)
    }

    useEffect(()=>{
        const sendNxu = async ()=>{
            const result = await nxu.gnxut()
            if(result.ok){
                //fetch get data account
            }
        }

        

        sendNxu()
    }, []) 

    return(
        <Provider
            
        >
            <View
                style={{
                    
                    flex:1
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
                        zIndex: 1
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