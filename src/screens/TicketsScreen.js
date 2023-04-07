import { View  } from "react-native"
import { Provider } from "react-native-paper"
import Header from "../components/Header"
import AddTickets from "../components/AddTickets"

const TicketScreen = props =>{

    const nav = screen =>{
        props.navigation.navigate(screen)
    }

    return(
        <Provider>
            <View>
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
                    <AddTickets nav={nav} />
                </View>
                
            </View>
        </Provider>
    )
}

export default TicketScreen