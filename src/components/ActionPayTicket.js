import { View, StyleSheet, Dimensions } from "react-native"
import { IconButton, SegmentedButtons } from "react-native-paper"

const ActionPayTicket = props =>{

    const styles = StyleSheet.create({
        container:{
            margin:10,
            marginTop:0
        }
    })

    return (
        <View
            style={styles.container}
        >
            {/* <IconButton

                size={60}
                iconColor="#fff"
                containerColor="#33a" 
                mode="contained"
                icon={"bus"}
            /> */}

            <SegmentedButtons
                density="small"
                onValueChange={()=> console.log("sad")} 
                buttons={[
                    {
                        style:{backgroundColor:"#fff"},
                        checkedColor:"#b00",
                        uncheckedColor:"#00b",
                        icon:"bus",
                        value:"Abordar",
                        label:"Pagar Pasaje",
                        onPress: ()=> props.nav("PayTicket")
                    },
                    {
                        icon:"ticket",
                        value:"Mis Tickets",
                        label:"Mis Tickets",
                        onPress: ()=> props.nav("Ticket")
                    },
                    {
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