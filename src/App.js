import {View, Text, Dimensions} from "react-native"
import React, { createContext, useContext, useEffect } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import HomeScreen from "./screens/HomeScreen"
import AboutScreen from "./screens/AboutScreen"
import RegisterScreen from "./screens/RegisterScreen"
import LoginScreen from "./screens/LoginScreen"
import AcountScreen from "./screens/AcountScreen"
import BuyTickets from "./components/AddToWallet"
import MenuAcount from "./components/MenuAcount"
import WalletScreen from "./screens/WalletScreen"
import TicketScreen from "./screens/TicketsScreen"
import PayTicket from "./screens/PayTicket"
import nxu from "./context/Nxu"
import SorryScreen from "./screens/sorryScreen"
import ProfileScreen from "./screens/ProfileScreen"
import Header from "./components/Header"
import { Provider } from "react-native-paper"
import UserInfoContext from "./context/UserInfoContext"
import LoginCommonUser from "./screens/LoginCommonUser"
import AcountReaderScreen from "./screens/AcountReaderScreen"
import NFCReadScreen from "./screens/Reader/NFCReadScreen"
import NFCUserScreen from "./screens/User/NFCUserScreen"
import Loader from "./components/Loader"
import TokenTimeout from "./components/tokenTimeout"
import HistoricUser from "./screens/User/HistoricUser"
import Preload from "./screens/Preload"
import RutasContext from "./context/RutasContext"


const Stack = createNativeStackNavigator()

const App = props=>{
    
    const [userInfo, setUserInfo] = React.useState({})
    const [Rutas, setRutas] = React.useState([])

    const updateRutas = (data)=>{
        setRutas(data)
    }

    const updateUserInfo = (data) =>{
        
        setUserInfo(data)
    }

    const config = {
        gestureDirection: "horizontal",
        animation: 'spring',
        config: {
            stiffness: 1000,
            damping: 500,
            mass: 3,
            overshootClamping: true,
            restDisplacementThreshold: 0.01,
            restSpeedThreshold: 0.01,
        },
    };

    return(
        <RutasContext.Provider value={{Rutas, updateRutas}} >
        <UserInfoContext.Provider value={{userInfo, updateUserInfo}}>
        <Provider>
            {/* <TokenTimeout /> */}
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Home" component={HomeScreen}
                        options={{
                            headerShown:false,
                            animation:"flip",
                            gestureDirection:"vertical"
                        }}

                    />
                    <Stack.Screen name="Preload" component={Preload}
                        options={{
                            headerShown:false,
                            transitionSpec: {
                                open: config,
                                close: config,
                            },
                        }}

                    />
                    {/* <Stack.Screen name="About" component={AboutScreen}/> */}
                    <Stack.Screen name="Register" component={RegisterScreen}
                        options={{
                            title:"",
                            headerShown:false,
                            transitionSpec: {
                                open: config,
                                close: config,
                            },
                            
                        }}
                    />

                    <Stack.Screen name="Login" component={LoginScreen}
                        options={{
                            title:"",
                            headerShown:false,
                            transitionSpec: {
                                open: config,
                                close: config,
                            },
                            
                        }}
                    />
                    <Stack.Screen name="CommonLogin" component={LoginCommonUser}
                        options={{
                            title:"",
                            headerShown:false,
                            animation:"flip",
                            gestureDirection:"vertical"
                            
                        }}
                    />

                    <Stack.Screen 
                        name="Acount" 
                        component={AcountScreen}
                        options={{
                            header: (props)=> <Header nav={props.navigation.navigate} />
                        }}
                    />
                    <Stack.Screen 
                        name="AcountReader" 
                        component={AcountReaderScreen}
                        options={{
                            header: (props)=> <Header nav={props.navigation.navigate} />
                        }}
                    />
                    <Stack.Screen 
                        name="Wallet" 
                        component={WalletScreen}
                        options={{
                            header: (props)=> <Header nav={props.navigation.navigate} />
                        }}
                    />
                    <Stack.Screen 
                        name="Ticket" 
                        component={TicketScreen}
                        options={{
                            header: (props)=> <Header nav={props.navigation.navigate} />
                        }}
                    />
                    <Stack.Screen 
                        name="PayTicket" 
                        component={PayTicket}
                        options={{
                            header: (props)=> <Header nav={props.navigation.navigate} />
                        }}
                    />
                    <Stack.Screen 
                        name="Profile" 
                        component={ProfileScreen}
                        options={{
                            header: (props)=> <Header nav={props.navigation.navigate} />
                        }}
                    />
                    <Stack.Screen 
                        name="NFCRead" 
                        component={NFCReadScreen}
                        options={{
                            header: (props)=> <Header nav={props.navigation.navigate} />
                        }}
                    />
                    <Stack.Screen 
                        name="NFCUser" 
                        component={NFCUserScreen}
                        options={{
                            header: (props)=> <Header nav={props.navigation.navigate} />
                        }}
                    />
                    <Stack.Screen 
                        name="HistoricUser" 
                        component={HistoricUser}
                        options={{
                            header: (props)=> <Header nav={props.navigation.navigate} />
                        }}
                    />
                    <Stack.Screen 
                        name="Sorry" 
                        component={SorryScreen}
                        options={{
                            headerShown:false
                        }}
                    />
                    {/* <Stack.Screen 
                        name="Loader" 
                        component={Loader}
                        options={{
                            headerShown:false
                        }}
                    /> */}
                    
                    
                </Stack.Navigator>
            </NavigationContainer>
            
        </Provider>
        
        </UserInfoContext.Provider>
        </RutasContext.Provider>
    )
}

export default App