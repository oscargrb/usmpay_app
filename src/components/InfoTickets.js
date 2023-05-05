import { View, StyleSheet } from "react-native"
import { Button, IconButton, Modal, Portal, Text } from "react-native-paper"
import globalStyles from "../common/globalStyles"

const tickets = [
    {
        id:0,
        ruta:"La California",
        color: "#b00"
    },
    {
        id:1,
        ruta:"Plaza Venezuela",
        color: "#0b0"
    },
    {
        id:2,
        ruta:"Guatire / Guarenas",
        color: "#00b"
    },
    {
        id:3,
        ruta:"Los Teques",
        color: "#bb0"
    },
]

const InfoTickets = props =>{

    const styles = StyleSheet.create({
        
        modal:{
            backgroundColor: globalStyles.colors.white,
            padding:30,
            marginTop: 100,
            marginBottom:100,
            margin:50,
            justifyContent:"flex-start",
            flex:1,
            height:500,
            borderRadius: 10
        },
        title:{
            fontSize:18,
            fontWeight:"bold",
            color:globalStyles.colors.black
        },
        subtitle:{
            fontSize: 14,
            color:globalStyles.colors.black
        },
        buttonContainer:{
            marginTop:120,
            justifyContent:"center"
        }
    })

    return(
        <Portal
            style={styles.portal}
            
        >
            <Modal
                visible={true}
                style={styles.modal}
            >
                <Text style={styles.title}>Información</Text>

                <Text style={styles.subtitle}>El color de cada Ticket indica la ruta</Text>

                <View
                    style={{
                        marginTop:20,
                        justifyContent:"center"
                    }}
                >
                    {
                        tickets.map(i=>{
                            return(
                                <View
                                    style={{
                                        flexDirection:"row",
                                        alignItems:"center",
                                        justifyContent:"flex-start",

                                    }}
                                    key={i.id}
                                >
                                    <IconButton 
                                        icon={"ticket"}
                                        mode="contained"
                                        containerColor={i.color}
                                        iconColor='#fff'
                                        size={20}
                                        style={{
                                            alignSelf:"center"
                                        }}
                                    />
                                    <Text
                                        style={{
                                            color:globalStyles.colors.black
                                        }}
                                    >
                                        {i.ruta}
                                    </Text>
                                </View>
                            )
                        })
                    }
                </View>

                <View
                    style={styles.buttonContainer}
                >
                    <Button
                        style={styles.button}
                        mode="contained"
                        contentStyle={{
                            backgroundColor:globalStyles.colors.blue
                        }}
                        textColor={globalStyles.colors.white}
                        onPress={props.closeInfoTicket}
                    >
                        Aceptar
                    </Button>
                </View>
            </Modal>
        </Portal>
    )
}

export default InfoTickets