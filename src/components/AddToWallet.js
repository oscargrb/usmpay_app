import { Card, Text, TextInput, Button, ActivityIndicator } from 'react-native-paper'
import { StyleSheet, View, Alert } from 'react-native'
import {useState} from "react"
import Loader from './Loader'
import globalStyles from '../common/globalStyles'

const AddToWallet = props =>{

    const [refNumb, setRefNumb] = useState('')
    const [loader, setLoader] = useState(false)

    const onSubmitForm = ()=>{
        if(!refNumb){
            return(
                Alert.alert("Debe completar todos los campos")
            )
        }

        setLoader(true)

        
        fetch("http://192.168.1.104:3000/getPayment?id=" + refNumb, {
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                Accept: "application/json"
            }
        }).then(reponse=>{
            
            reponse.json().then(data=>{
                setLoader(false)
                return(Alert.alert("fetch response", JSON.stringify(data), [
                    {
                        text:"Continuar",
                        onPress: ()=> props.nav('Acount')
                    }
                ]))
            }).catch(e=>{
            
                setLoader(false)
                return(Alert.alert("fetch response", JSON.stringify(e)))
            })
        }).catch(e=>{
            setLoader(false)
            return(Alert.alert("fetch error", "buuu dont work!"))
        })

    }

    const onChageField = (data) =>{

        setRefNumb(data)
    }

    const styles = StyleSheet.create({
        container:{
            padding:20
        },
        CardTitle:{
            textAlign: "left",
            fontWeight: "bold",
            color: globalStyles.colors.black
        },
        CardContentInfo: {
            color: globalStyles.colors.black,
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
            margin:20,
            flexDirection:"row",
            justifyContent:"center",
            alignItems:"center"
        },
        registerPay: {
            padding: 10,
            marginTop: 20
        },
        card:{
            backgroundColor:globalStyles.colors.white,
        },
        subtitle:{
            color: globalStyles.colors.black
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
                    title="Quieres recargar tu Billetera?"
                    subtitle="Realiza un Pago Movil a la siguiente cuenta: "
                    titleStyle = {styles.CardTitle} 
                    subtitleStyle = {styles.subtitle}
                />
                <Card.Content>
                    <Text style={styles.CardContentInfo} >Banco: Mercantil</Text>
                    <Text style={styles.CardContentInfo} >Documento: J-981237298-1</Text>
                    <Text style={styles.CardContentInfo} >Telefono: 04263151271</Text>
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
                        Registrar Pago
                    </Text>
                </View>

                <View
                    style={styles.TextContainer}
                >
                    <Text
                        style={styles.textInfo}
                    >
                        Ingresa la informacion del pago
                    </Text>
                </View>

                <View
                    style={styles.TextContainer}
                >
                    <TextInput
                        value={refNumb}
                        onChangeText={(val) => onChageField(val)}
                        
                        
                        selectionColor="#00c"
                        outlineColor={globalStyles.colors.blue}
                        outlineStyle={{
                            borderWidth:2
                        }}
                        activeOutlineColor="#007"

                        backgroundColor={globalStyles.colors.white}
                        label={
                            <Text
                                style={{backgroundColor:"white", color:"black"}}
                            >
                                Numero de Operacion *
                            </Text>
                        }
                        mode="flat"
                        contentStyle={{color:globalStyles.colors.black}}
                        underlineColor='transparent'
                        activeUnderlineColor='transparent'
                    /> 
                </View>

                

                <View
                    style={styles.buttonSendContainer} 
                >
                    
                    <Button
                        buttonColor={globalStyles.colors.red}
                        textColor={globalStyles.colors.white}
                        mode="contained"
                        onPress={()=> props.nav('Acount')}
                        style={{
                            width:150,
                            margin:10
                        }}
                    >
                        Cancelar
                    </Button>
                    <Button
                        buttonColor={globalStyles.colors.blue}
                        textColor={globalStyles.colors.white}
                        mode="contained"
                        onPress={onSubmitForm}
                        style={{
                            width:150,
                            margin:10
                        }}
                    >
                        Registrar Pago
                    </Button>
                </View>
            </View>
            {
                loader?
                    <Loader/>:
                    <></>
            }
            
        </View>
    )
}

export default AddToWallet