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

    const {infoProfile = userInfo, updateUserInfo} = useContext(UserInfoContext)

    const [loader, setLoader] = useState(false)

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
        setLoader(true)
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
                        setUserInfo(data)
                        updateUserInfo(data)
                        setLoader(false)
                    }).catch(e=>{
                        console.log(e, "error")
                        setLoader(false)
                    })
                }).catch(e=>{
                    console.log(e)
                    setLoader(false)
                })


                
            }
        }

        sendNxu()
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
                    <DisplayTickets balance={userInfo.balance} tickets={userInfo.tickets} />
                    <ActionPayTicket nav={nav} />
                    <PaymentsHistoric />
                    
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