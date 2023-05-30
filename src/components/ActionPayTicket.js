import { View, StyleSheet, Dimensions } from "react-native"
import { IconButton, SegmentedButtons } from "react-native-paper"
import globalStyles from "../common/globalStyles"

const ActionPayTicket = props =>{

    const styles = StyleSheet.create({
        container:{
            margin:10,
            marginTop:0
        },
        segButtons:{
            backgroundColor:"transparent"
        },
        buttons:{
            color:globalStyles.colors.blue
        }
    })

    return (
        <View
            style={styles.container}
        >

            <SegmentedButtons
                style={styles.segButtons}
                density="small" 
                onValueChange={()=>true}
                buttons={[
                    {
                        style:styles.buttons,
                        checkedColor:globalStyles.colors.black,
                        uncheckedColor:globalStyles.colors.blue,
                        icon:"bus",
                        value:"Abordar",
                        label:"Pagar Pasaje",
                        onPress: ()=> props.nav("PayTicket")
                    },
                    {
                        style:styles.buttons,
                        checkedColor:globalStyles.colors.black,
                        uncheckedColor:globalStyles.colors.blue,
                        icon:"ticket",
                        value:"Mis Tickets",
                        label:"Mis Tickets",
                        onPress: ()=> props.nav("Ticket")
                    },
                    {
                        style:styles.buttons,
                        checkedColor:globalStyles.colors.black,
                        uncheckedColor:globalStyles.colors.blue,
                        icon:"wallet",
                        value:"Mi Billetera",
                        label:"Mi Billetera",
                        onPress: ()=> props.nav("Wallet"),
                        
                    }
                ]}
            />
        </View>
    )
}

export default ActionPayTicket