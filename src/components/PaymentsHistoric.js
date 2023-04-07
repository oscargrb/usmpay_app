import {FlatList, View, StyleSheet, Dimensions, TouchableHighlight} from "react-native"
import { IconButton, Text } from "react-native-paper"

const data = [
    {
        id:0,
        date: new Date().toLocaleString(),
        type: "Recarga",
        amount: 30
    },
    {
        id:1,
        date: new Date().toLocaleString(),
        type: "Pago",
        amount: 30
    },
    {
        id:2,
        date: new Date().toLocaleString(),
        type: "Recarga",
        amount: 30
    },
    {
        id:3,
        date: new Date().toLocaleString(),
        type: "Recarga",
        amount: 30
    }
    ,
    {
        id:4,
        date: new Date().toLocaleString(),
        type: "Pago",
        amount: 30
    }
    ,
    {
        id:5,
        date: new Date().toLocaleString(),
        type: "Pago",
        amount: 30
    }
    ,
    {
        id:6,
        date: new Date().toLocaleString(),
        type: "Recarga",
        amount: 30
    }
]

const PaymentsHistoric = props =>{

    

    const styles = StyleSheet.create({
        constainer:{
            backgroundColor: "#333",
            borderTopStartRadius: 20,
            borderTopEndRadius: 20,
            height:330,
            
        },
        header:{
            flexDirection:"row",
            justifyContent:"space-between",
            padding:20
        },
        headerText:{
            color:"#fff"
        },
        itemContainer:{
            flexDirection:"row",
            justifyContent:"space-between",
            paddingRight:20,
            paddingBottom:15,
            paddingTop: 15
        },
        iconTextContainer:{
            flexDirection:"row",
            alignItems:"center",
            justifyContent:"flex-start"
        },
        amountDateContainer:{
            alignItems:"flex-end",
            justifyContent:"center"
        },
        icon:{
            color:"#fff"
        },
        text:{
            color:"#fff"
        }
    })

    return(
        <View
            style={styles.constainer}
        >
            <View
                style={styles.header}
            >
                <View>
                    <Text
                        style={styles.headerText}
                    >
                        Historico
                    </Text>
                </View>
                <View>
                    <Text
                        style={styles.headerText}
                    >
                        Actualizar
                    </Text>
                </View>
            </View>
            <FlatList
                data={data}
                scrollEnabled={true}
                
                renderItem={({item})=> 
                    <View
                        style={styles.itemContainer}
                    >
                        <View
                            style={styles.iconTextContainer}
                        >
                            <IconButton
                                style={styles.icon}
                                iconColor="#777" 
                                icon={
                                    item.type == "Recarga"?
                                        "ticket":
                                        "bus"
                                }
                            />
                            <Text
                                style={styles.text} 
                            >
                                {item.type}
                            </Text>
                        </View>
                        <View
                            style={styles.amountDateContainer}
                        >
                            <Text
                                style={styles.text}
                            >
                                {item.amount} Bs</Text>
                            <Text
                                style={styles.text}
                            >
                                {item.date}
                            </Text>
                        </View>
                    </View>
                }
                keyExtractor={item => item.id}
            />
        </View>
    )
}

export default PaymentsHistoric