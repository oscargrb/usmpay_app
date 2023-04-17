import {View} from "react-native"
import { Text } from "react-native-paper"
import Header from "../components/Header"
import SelectRuta from "../components/SelectRuta"

const PayTicket = props =>{

    return(
        <View
            style={{
                flex:1,
                
            }}
        >
            <Header />
            <SelectRuta />
        </View>
    )
}

export default PayTicket