import { Card, Text, TextInput, Button, IconButton, Dialog, Portal, RadioButton } from 'react-native-paper'
import { StyleSheet, View, Alert, Keyboard } from 'react-native'
import {useState, useContext} from "react"
import Loader from './Loader'
import globalStyles from '../common/globalStyles'
import UserInfoContext from '../context/UserInfoContext'
import ApiService from '../common/ApiService'
import nxu from '../context/Nxu'
import RutasContext from '../context/RutasContext'


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

const AddTickets = props =>{

    const {Rutas} = useContext(RutasContext)
    const {userInfo} = useContext(UserInfoContext)

    const [loader, setLoader] = useState(false)
    const [modalSelectRuta, SetModalSelectRuta] = useState(false)
    const [checked, setChecked] = useState({});
    const [Cantidad, setCantidad] = useState(0);
    const [total, setTotal] = useState(0)

    const ticketCompra = async ()=>{
        Keyboard.dismiss()
        const auth = await nxu.gnxut()
        

        if(!checked.nbRuta){
            Alert.alert("Por favor selecciona una ruta")
            return
        }else if(Cantidad <= 0){
            Alert.alert("Por favor indique cantidad")
            return
        }else if(Cantidad > userInfo.balance){
            Alert.alert("Balance insuficiente para adiquirir la cantidad seleccionada")
            return
        }else{
            setLoader(true)
            
            fetch(`${ApiService.url}/ticket/compra`, {
                method:"post",
                headers:{
                    "Authorization": `Bearer ${auth.result.tkn}`,
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    "rutaId": checked.id,
                    "user": userInfo.document,
                    "cantidad": Cantidad
                })
            }).then(response=>{
                setLoader(false)
                console.log(response)
                response.json().then(data=>{
                    console.log(data)
                    if(response.status == 200){
                        Alert.alert("Informacion", "La operacion se realizó de forma exitosa", [
                            {text: 'OK', onPress: () => props.nav('Acount')}
                        ])
                    }else{
                        Alert.alert("Informacion", "Error: " + data.error)
                    }
                })
            }).catch(e=>{
                setLoader(false)
                Alert.alert("Informacion", "Error: operacion termino de forma incorrecta")
            })
        }
    }

    const openModal = () => {
        SetModalSelectRuta(true)
    }
    const closeModal = () => {
        SetModalSelectRuta(false)
        onChangeInputs()
    }

    onChangeInputs = ()=>{
        if(checked.precio && Cantidad>0){
            setTotal(checked.precio * Cantidad)
        }
    }

    

    return(
        
            <View
                style= {styles.container}
            >
                
                <Card
                    style={styles.card}
                >
                    <Card.Title 
                        title="Quieres adquirir tus Tickets?"
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
                            value={`${userInfo.balance} Bs.`}
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
                                    checked.nbRuta?
                                    checked.nbRuta + ' - ' + checked.precio + 'Bs.':
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
                            value={`${Cantidad}`}
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
                                setCantidad(Math.floor(e))
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
                            onPress={()=> ticketCompra()}
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
                                    Rutas.map(i=>{
                                        return(
                                            <View
                                                style={styles.itemRuta}
                                                key={i.id}
                                            >
                                                <RadioButton 
                                                    value={i.nbRuta}
                                                    status={checked.nbRuta == i.nbRuta? 'checked': 'unchecked'}
                                                    onPress={()=> {
                                                        setChecked(i)
                                                        
                                                    }}
                                                />
                                                <Text>{i.nbRuta}</Text>
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