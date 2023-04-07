import { Card, Text, TextInput, Button, ActivityIndicator, IconButton, Provider, Dialog, Portal, RadioButton } from 'react-native-paper'
import { StyleSheet, View, Alert } from 'react-native'
import {useState} from "react"
import Loader from './Loader'

const rutaList = [
    {
        name:"La California",
        tarifa:9,
        id:1
    },
    {
        name:"Guatire / Guarenas",
        tarifa:25,
        id:2
    },
    {
        name:"Plaza Venezuela",
        tarifa:15,
        id:3
    },
    {
        name:"Los Teques",
        tarifa:30,
        id:4
    },
]


const AddTickets = props =>{

    const [loader, setLoader] = useState(false)
    const [modalSelectRuta, SetModalSelectRuta] = useState(false)
    const [checked, setChecked] = useState({});
    const [Cantidad, setCantidad] = useState(0);

    const openModal = () => SetModalSelectRuta(true)
    const closeModal = () => SetModalSelectRuta(false)

    const styles = StyleSheet.create({
        container:{
            padding:20
        },
        CardTitle:{
            textAlign: "left",
            fontWeight: "bold"
        },
        CardContentInfo: {
            
            fontWeight:"bold",
            textAlign: "left"
        },
        TextContainer:{  
            marginBottom: 10
        },  
        title:{
            fontSize: 20,
            color: "#000",
            fontWeight:"bold"
        },
        textInfo:{
            fontSize: 15,
            color: "#000"
        },
        buttonSend:{
            width:10,
            height:10
        },
        buttonSendContainer:{
            flex:0,
            margin: 30,
            justifyContent:"center",
            alignItems:"center"
        },
        registerPay: {
            padding: 10,
            marginTop: 20
        },
        inputSelectRuta:{
            backgroundColor:"#fff",
            borderWidth:1,
            borderColor:"#ccc",
            padding:15,
            height:50,
            borderRadius:5,
            flexDirection:"row",
            justifyContent:"space-between",
            alignItems:"center"
        },
        itemRuta:{
            flexDirection:"row",
            alignItems:"center"
        }
    })

    return(
        
            <View
                style= {styles.container}
            >
                
                <Card>
                    <Card.Title 
                        title="Quieres adquirir tus Tickets?"
                        subtitle="Aca puedes hacerlo"
                        titleStyle = {styles.CardTitle} 
                    />
                    <Card.Content>
                        <Text style={styles.CardContentInfo} >1. Selecciona la Ruta y la cantidad de Tickets para adquirir</Text>
                        <Text style={styles.CardContentInfo} >2. Recuerda mantener tu Billetera con fondos suficientes</Text>
                    </Card.Content>
                </Card>

                <View 
                    style={styles.registerPay}
                >
                    <View
                        style={styles.TextContainer}
                    >
                        <Text
                            style={styles.title} 
                        >
                            Adquirir Tickets
                        </Text>
                    </View>

                    <View
                        style={styles.TextContainer}
                    >
                        <Text
                            style={styles.textInfo}
                        >
                            Complete los campos
                        </Text>
                    </View>

                    <View
                        style={styles.TextContainer}
                    >
                        <TextInput
                            value="30.5 Bs."
                            disabled
                            
                            label="Saldo Disponible"
                            mode="outlined"
                            selectionColor="#00c"
                            outlineColor="#007"
                            activeOutlineColor="#007"
                        />
                        
                    </View>

                    <View
                        style={styles.TextContainer}
                    >
                        <View
                            style={styles.inputSelectRuta}
                        >
                            <Text>
                                {
                                    checked.name?
                                    checked.name + ' - ' + checked.tarifa + 'Bs.':
                                    'Selecciona una Ruta'
                                }
                            </Text>
                            <IconButton 
                                icon={"chevron-down"}
                                onPress={openModal}
                            />
                        </View>
                    </View>

                    <View
                        style={styles.TextContainer}
                    >
                        <TextInput
                            inputMode='numeric'
                            label="Cantidad *"
                            mode="outlined"
                            selectionColor="#00c"
                            outlineColor="#007"
                            activeOutlineColor="#007"
                            onChangeText={(e)=> setCantidad(e)}
                        />
                        
                    </View>

                    <View
                        style={styles.TextContainer}
                    >
                        <TextInput
                            value={Cantidad * checked.tarifa}
                            disabled
                            
                            label="Monto a Pagar"
                            mode="outlined"
                            selectionColor="#00c"
                            outlineColor="#007"
                            activeOutlineColor="#007"
                        />
                        
                    </View>

                    <View
                        style={styles.buttonSendContainer} 
                    >
                        <Button
                            buttonColor="#00a"
                            mode="contained"
                            
                        >
                            Adquirir Tickets
                        </Button>
                    </View>
                </View>
                {
                    loader?
                        <Loader/>:
                        <></>
                }
                
                {
                    modalSelectRuta?
                    
                    <View>
                      
                      <Portal>
                        <Dialog visible={true} onDismiss={closeModal}>
                            <Dialog.Title>Alert</Dialog.Title>
                            <Dialog.Content>

                                {
                                    rutaList.map(i=>{
                                        return(
                                            <View
                                                style={styles.itemRuta}
                                                key={i.id}
                                            >
                                                <RadioButton 
                                                    value={i.name}
                                                    status={checked.name == i.name? 'checked': 'unchecked'}
                                                    onPress={()=> setChecked(i)}
                                                />
                                                <Text>{i.name}</Text>
                                            </View>
                                        )
                                    })
                                }
                                
                                
                            </Dialog.Content>
                            <Dialog.Actions>
                                <Button onPress={closeModal}>Done</Button>
                            </Dialog.Actions>
                        </Dialog>
                      </Portal>
                    </View>:
                  <></>
                }
            </View>
            
    )
}

export default AddTickets