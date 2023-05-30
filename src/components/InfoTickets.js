import { View, StyleSheet } from "react-native"
import { Button, IconButton, Modal, Portal, Text } from "react-native-paper"
import globalStyles from "../common/globalStyles"
import {useContext, useEffect, useState} from 'react'
import RutasContext from "../context/RutasContext"

const InfoTickets = props =>{

    const [allRutas, setAllRutas] = useState([]) 

    const {Rutas} = useContext(RutasContext)

    useEffect(()=>{
        setAllRutas(Rutas)
        console.log(allRutas)
    }, [])

    const styles = StyleSheet.create({
        containerTitles:{

            height:80
        },
        container:{
            flex:1,

        },
        modal:{
            backgroundColor: globalStyles.colors.white,
            padding:30,
            marginTop: 100,
            marginBottom:100,
            margin:50,
            justifyContent:"space-around",
            alignItems:"center",
            
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
                <View
                    style={styles.containerTitles}
                >
                    <Text style={styles.title}>Información</Text>
                    <Text style={styles.subtitle}>El color de cada Ticket indica la ruta</Text>
                </View>
            
                <View
                    style={styles.container}
                >
                    {
                        allRutas.map(i=>{
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
                                        {i.nbRuta}
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