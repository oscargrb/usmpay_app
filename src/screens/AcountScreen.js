import {View, Dimensions} from 'react-native'
import { Provider } from 'react-native-paper'

import DisplayTickets from '../components/DisplayTickets'
import Header from '../components/Header'
import MenuAcount from '../components/MenuAcount'
import PaymentsHistoric from '../components/PaymentsHistoric'
import ActionPayTicket from '../components/ActionPayTicket'

const AcountScreen = props =>{

    const nav = screen =>{
        props.navigation.navigate(screen)
    }

    return(
        <Provider>
            <View
                
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