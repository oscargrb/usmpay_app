import {View, Text, Dimensions} from "react-native"
import React, { createContext, useContext } from "react"
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


const Stack = createNativeStackNavigator()

const App = props=>{    

    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen}
                    options={{
                        headerShown:false
                    }}
                />
                <Stack.Screen name="About" component={AboutScreen}/>
                <Stack.Screen name="Register" component={RegisterScreen}
                    options={{
                        title:"",
                        headerShadowVisible:false,
                        
                    }}
                />
                <Stack.Screen name="Login" component={LoginScreen}
                    options={{
                        title:"",
                        headerShadowVisible:false,
                        
                    }}
                />
                <Stack.Screen 
                    name="Acount" 
                    component={AcountScreen}
                    options={{
                        headerShown:false
                    }}
                />
                <Stack.Screen 
                    name="Wallet" 
                    component={WalletScreen}
                    options={{
                        headerShown:false
                    }}
                />
                <Stack.Screen 
                    name="Ticket" 
                    component={TicketScreen}
                    options={{
                        headerShown:false
                    }}
                />
                <Stack.Screen 
                    name="PayTicket" 
                    component={PayTicket}
                    options={{
                        headerShown:false
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
        
    )
}

export default App