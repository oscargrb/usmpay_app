import {View} from "react-native"
import { Text } from "react-native-paper"
import Header from "../components/Header"
import SelectRuta from "../components/SelectRuta"

const PayTicket = props =>{

    const nav = (ruta)=>{
        props.navigation.navigate(ruta)
    }

    return(
        <View
            style={{
                flex:1,
                
            }}
        >
            
            <SelectRuta nav={nav} />
        </View>
    )
}

export default PayTicket