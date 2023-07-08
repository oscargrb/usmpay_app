import { Card, Text, TextInput, Button, ActivityIndicator } from 'react-native-paper'
import { StyleSheet, View, Alert, Keyboard } from 'react-native'
import {useState, useContext} from "react"
import Loader from './Loader'
import globalStyles from '../common/globalStyles'
import ApiService from '../common/ApiService'
import UserInfoContext from '../context/UserInfoContext'

const AddToWallet = props =>{

    const [refNumb, setRefNumb] = useState('')
    const [loader, setLoader] = useState(false)
    const {userInfo} = useContext(UserInfoContext)

    const onSubmitForm = ()=>{
        Keyboard.dismiss()
        if(!refNumb){
            return(
                Alert.alert("Error: ","Debe completar todos los campos")
            )
        }

        setLoader(true)

        fetch(`${ApiService.urlBankAutomate}/consult`, {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                document: userInfo.document,
                ref: refNumb
            })
        }).then(reponse=>{
            setLoader(false)
            console.log(reponse)
            if(reponse.status == 200){
                reponse.json().then(data=>{
                    console.log(data)
                    if(data.ok){
                        Alert.alert("Información", "La operación se realizó de forma exitosa", [
                            {text: 'OK', onPress: () => props.nav('Acount')}
                        ])
                    }else{
                        Alert.alert("Error: ", data.info)
                    }
                })
            }else{
                Alert.alert("Error: ", "La operación terminó de forma incorrecta")
            }
        }).catch(e=>{
            setLoader(false)
            Alert.alert("Error: ", "La operación terminó de forma incorrecta", [
                {text: 'OK', onPress: () => props.nav('Acount')}
            ])
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
            marginTop: 10
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
                    <Text style={styles.CardContentInfo} >Banco: Venezuela (0102)</Text>
                    <Text style={styles.CardContentInfo} >Documento: V-27301568</Text>
                    <Text style={styles.CardContentInfo} >Teléfono: 04263151271</Text>
                </Card.Content>
            </Card>

            <View
                style={{
                    padding: 10
                }}
            >
                <Text
                    style={{
                        fontSize: 14,
                        color:globalStyles.colors.blue,
                        textDecorationLine:"underline"
                    }}
                    onPress={()=> props.nav("HistoricBalanceUser")} 
                >
                    Ver histórico de operaciones
                </Text>
            </View>

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
                        Ingresa la información del pago
                    </Text>
                </View>

                <View
                    style={styles.TextContainer}
                >
                    <TextInput
                        value={refNumb}
                        onChangeText={(val) => onChageField(val)}
                        inputMode='numeric'
                        
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
                                Número de Operación *
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