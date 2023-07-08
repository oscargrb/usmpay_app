import {  Text, View, StyleSheet, Alert, Keyboard,Image } from "react-native";
import { TextInput, Button } from "react-native-paper"
import {useState} from "react"
import globalStyles from "../common/globalStyles";
import Loader from "../components/Loader";
import Ucred from "../context/Ucred";
import ApiService from "../common/ApiService";

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding: 20,
        backgroundColor: globalStyles.colors.grey,
    },
    TextContainer:{  
        marginBottom: 10

    },  
    title:{
        fontSize: 25,
        color: globalStyles.colors.blue,
        fontWeight:"bold"
    },
    textInfo:{
        fontSize: 15,
        color: globalStyles.colors.blue
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
    }
})

const RegisterScreen = props=>{

    const [registerData, setRegisterData] = useState({
        document:null,
        password: null,
        passwordConfirm: null,
        phone: null,
        mail: null
    })

    const [loader, setLoader] = useState(false)
    const [hidePwd, setHidePwd] = useState(true)
    const [hidePwd2, setHidePwd2] = useState(true)

    const onSubmitForm = ()=>{
        Keyboard.dismiss()
        for(let element of Object.keys(registerData)) {
            if(!registerData[element]){
                return(
                    Alert.alert("Error:","Debe completar todos los campos")
                )
            }
        };

        if(registerData.document.length < 7){
            return(
                Alert.alert("Error:","Formato de Documento incorrecto xxxxxxx")
            )
        }

        if(registerData.password !== registerData.passwordConfirm){
            return(
                Alert.alert("Error:","Las contraseñas no coinciden")
            )
        }

        if(!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(registerData.mail)){
            return(
                Alert.alert("Error:","El formato de Correo es incorrecto")
            )
        }

        if(!/^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&?* "]).*$/.test(registerData.password)){
            return(
                Alert.alert("Error:","La contraseña debe tener una longitud mayor a 8 caracteres: al menos 1 número, 1 letra, 1 caracter especial (!#%&$?*)")
            )
        }

        if(registerData.phone.length < 11){
            return(
                Alert.alert("Error:","Formato de teléfono incorrecto xxxxxxxxxxx")
            )
        }
        
        
        fetch(`${ApiService.url}/register`,{
            method:"POST",
            headers:{
                //'Content-Type': 'application/x-www-form-urlencoded'
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                user: registerData.document,
                pwd: registerData.password,
                mail: registerData.mail,
                roll: 2001,
                telefono: registerData.phone
            })
        }).then(response=>{
            
            setLoader(false)
            if(response.ok){
                response.json().then( async data=>{
                    
                    const fpref = await Ucred.cFingPref()
                    
                    props.navigation.navigate('Login')
                })
            }else{
                console.log('Bad register!', response)
            }
            
        }).catch(e=>{
            setLoader(false)
            console.log(e)
        })
    }

    const onChageField = (field, data) =>{
        const newState = {}
        Object.assign(newState, registerData)

        newState[field] = data

        setRegisterData(newState)

    }

    return(
        <View
            style={styles.container}
        >
            <View
                style={styles.TextContainer}
            >
                <Text
                    style={styles.title} 
                >
                    Regístrate ya
                </Text>
            </View>

            <View
                style={styles.TextContainer}
            >
                <Text
                    style={styles.textInfo}
                >
                    Ingresa tus datos
                </Text>
                <Text
                    style={styles.textInfo}
                >
                    Los campos con * son requeridos
                </Text>
            </View>

            <View
                style={styles.TextContainer}
            >
                <TextInput
                    onChangeText={text => onChageField("document", text)}
                    inputMode='numeric'
                    maxLength={9}
                    label={
                        <Text
                            style={{backgroundColor:"white", color:"black"}}
                        >
                            Número de documento *
                        </Text>
                    }
                    
                    selectionColor="#00c"
                    outlineColor={globalStyles.colors.blue}
                    outlineStyle={{
                        borderWidth:2
                    }}
                    activeOutlineColor="#007"

                    backgroundColor={globalStyles.colors.white}
                    
                    mode="flat"
                    contentStyle={{color:globalStyles.colors.black}}
                    underlineColor='transparent'
                    activeUnderlineColor='transparent'
                /> 
            </View>

            <View
                style={styles.TextContainer}
            >
                <TextInput
                    onChangeText={text => onChageField("mail", text)}
                    maxLength={50}
                    textContentType="emailAddress"
                    label={
                        <Text
                            style={{backgroundColor:"white", color:"black"}}
                        >
                            Correo Electrónico *
                        </Text>
                    }
                    
                    selectionColor="#00c"
                    outlineColor={globalStyles.colors.blue}
                    outlineStyle={{
                        borderWidth:2
                    }}
                    activeOutlineColor="#007"

                    backgroundColor={globalStyles.colors.white}
                    
                    mode="flat"
                    contentStyle={{color:globalStyles.colors.black}}
                    underlineColor='transparent'
                    activeUnderlineColor='transparent'
                /> 
            </View>

            <View
                style={styles.TextContainer}
            >
                <TextInput
                    onChangeText={text => onChageField("phone", text)}
                    inputMode='numeric'
                    maxLength={12}
                    textContentType="telephoneNumber"
                    label={
                        <Text
                            style={{backgroundColor:"white", color:"black"}}
                        >
                            Número de teléfono *
                        </Text>
                    }
                    
                    selectionColor="#00c"
                    outlineColor={globalStyles.colors.blue}
                    outlineStyle={{
                        borderWidth:2
                    }}
                    activeOutlineColor="#007"

                    backgroundColor={globalStyles.colors.white}
                    
                    mode="flat"
                    contentStyle={{color:globalStyles.colors.black}}
                    underlineColor='transparent'
                    activeUnderlineColor='transparent'
                /> 
            </View>

            <View
                style={styles.TextContainer}
            >
                <TextInput
                    onChangeText={text => onChageField("password", text)}
                    maxLength={255}
                    label={
                        <Text
                            style={{
                                backgroundColor:"white", 
                                color:"black",
                                width: "100%"
                            }}
                        >
                            Crear clave de acceso *
                        </Text>
                    }
                    selectionColor="#00c"
                    outlineColor={globalStyles.colors.blue}
                    outlineStyle={{
                        borderWidth:2
                    }}
                    activeOutlineColor="#007"
                    backgroundColor={globalStyles.colors.white}
                    mode="flat"
                    contentStyle={{color:globalStyles.colors.black, backgroundColor:"white"}}
                    underlineColor='transparent'
                    activeUnderlineColor='transparent'
                    secureTextEntry={hidePwd}
                    right={
                        <TextInput.Icon
                            icon={"eye"} 
                            iconColor={globalStyles.colors.black}
                            onPress={()=>{
                                hidePwd?
                                    setHidePwd(false):
                                    setHidePwd(true)
                            }}
                            size={25}
                            style={{
                                backgroundColor:"white",
                                borderRadius:0,
                                width:58,
                                height:56
                            }}
                            containerColor="transparent"
                        />
                    }
                /> 
            </View>

            <View
                style={styles.TextContainer}
            >
                <TextInput
                    maxLength={255}
                    onChangeText={text => onChageField("passwordConfirm", text)}
                    label={
                        <Text
                            style={{backgroundColor:"white", color:"black"}}
                        >
                            Confirmar clave de acceso *
                        </Text>
                    }
                    
                    selectionColor="#00c"
                    outlineColor={globalStyles.colors.blue}
                    outlineStyle={{
                        borderWidth:2
                    }}
                    activeOutlineColor="#007"

                    backgroundColor={globalStyles.colors.white}
                    
                    mode="flat"
                    contentStyle={{color:globalStyles.colors.black}}
                    underlineColor='transparent'
                    activeUnderlineColor='transparent'
                    secureTextEntry={hidePwd2}
                    right={
                        <TextInput.Icon
                            icon={"eye"} 
                            iconColor={globalStyles.colors.black}
                            onPress={()=>{
                                hidePwd2?
                                    setHidePwd2(false):
                                    setHidePwd2(true)
                            }}
                            size={25}
                            style={{
                                backgroundColor:"white",
                                borderRadius:0,
                                width:58,
                                height:56
                            }}
                            containerColor="transparent"
                        />
                    }
                /> 
            </View>

            <View
                style={styles.buttonSendContainer} 
            >
                <Button
                    buttonColor={globalStyles.colors.blue}
                    mode="contained"
                    onPress={onSubmitForm}
                    textColor={globalStyles.colors.white}
                >
                    Registrarme
                </Button>
            </View>

            <View
                style={{
                    justifyContent:"center",
                    alignItems:"center"
                }}
            >
                <Image
                style={{
                    width:250,
                    height:250,
                    opacity:0.8
                }}
                    source={require('../assets/login.png')}
                    
                />
            </View>

            {
                loader?
                    <Loader />:
                    <></>
            }
        </View>
    )
}

export default RegisterScreen