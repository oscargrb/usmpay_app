import { Card, Text, TextInput, Button, ActivityIndicator, IconButton, Provider, Dialog, Portal, RadioButton } from 'react-native-paper'
import { StyleSheet, View, Alert } from 'react-native'
import {useState} from "react"
import Loader from './Loader'
import globalStyles from '../common/globalStyles'

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
    const [total, setTotal] = useState(0)

    const openModal = () => {
        SetModalSelectRuta(true)
    }
    const closeModal = () => {
        SetModalSelectRuta(false)
        onChangeInputs()
    }

    onChangeInputs = ()=>{
        if(checked.tarifa && Cantidad>0){
            setTotal(checked.tarifa * Cantidad)
        }
    }

    const styles = StyleSheet.create({
        container:{
            padding:20
        },
        CardTitle:{
            textAlign: "left",
            fontWeight: "bold",
            color:globalStyles.colors.black
        },
        CardContentInfo: {
            
            fontWeight:"bold",
            textAlign: "left",
            color:globalStyles.colors.black
        },
        subTitle:{
            color:globalStyles.colors.black
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
            flexDirection:"row",
            margin: 20,
            justifyContent:"center",
            alignItems:"center"
        },
        registerPay: {
            padding: 10,
            
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
        },
        card:{
            backgroundColor:globalStyles.colors.white
        }
    })

    return(
        
            <View
                style= {styles.container}
            >
                
                <Card
                    style={styles.card}
                >
                    <Card.Title 
                        title="Quieres adquirir tus Tickets?"
                        subtitle="Aca puedes hacerlo"
                        subtitleStyle={styles.subTitle}
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
                            backgroundColor={globalStyles.colors.white}
                            label={
                                <Text
                                    style={{backgroundColor:"white", color:"black"}}
                                >
                                    Saldo Disponible
                                </Text>
                            }
                            mode="flat"
                            contentStyle={{color:globalStyles.colors.black}}
                        />
                        
                    </View>

                    <View
                        style={styles.TextContainer}
                    >
                        <View
                            style={styles.inputSelectRuta}
                        >
                            <Text
                                style={{color:globalStyles.colors.black}}
                            >
                                {
                                    checked.name?
                                    checked.name + ' - ' + checked.tarifa + 'Bs.':
                                    'Selecciona una Ruta'
                                    
                                }
                            </Text>
                            <IconButton 
                                iconColor={globalStyles.colors.black}
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
                            backgroundColor={globalStyles.colors.white}
                            label={
                                <Text
                                    style={{backgroundColor:"white", color:"black"}}
                                >
                                    Cantidad *
                                </Text>
                            }
                            mode="flat"
                            contentStyle={{color:globalStyles.colors.black}}
                            onChangeText={(e)=> {
                                setCantidad(e)
                            }}
                            onEndEditing={onChangeInputs}
                            underlineColor='transparent'
                            activeUnderlineColor='transparent'
                            selectionColor="#00c"
                        />
                        
                    </View>

                    <View
                        style={styles.TextContainer}
                    >
                        <TextInput
                            value={`${total} Bs.`}
                            disabled
                            mode="flat"
                            
                            label={
                                <Text
                                    style={{backgroundColor:"white", color:"black"}}
                                >
                                    Monto a pagar
                                </Text>
                            }

                            contentStyle={{color:globalStyles.colors.black}}
                            
                            backgroundColor={globalStyles.colors.white}
                            underlineColor='black'
                            activeUnderlineColor='black'
                            activeOutlineColor='black'
                        />
                        
                    </View>

                    <View
                        style={styles.buttonSendContainer} 
                    >
                        <Button
                            buttonColor={globalStyles.colors.red}
                            style={{
                                width:150,
                                margin:10
                            }}
                            textColor={globalStyles.colors.white}
                            mode="contained"
                            onPress={()=> props.nav('Acount')}
                        >
                            Cancelar
                        </Button>
                        <Button
                            buttonColor={globalStyles.colors.blue}
                            textColor={globalStyles.colors.white}
                            mode="contained"
                            style={{
                                width:150,
                                margin:10
                            }}
                        >
                            Adquirir
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
                                                    onPress={()=> {
                                                        setChecked(i)
                                                        
                                                    }}
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