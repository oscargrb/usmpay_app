import {  Text, View, StyleSheet, Alert, Keyboard } from "react-native";
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
        fontSize: 20,
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

    const onSubmitForm = ()=>{
        Keyboard.dismiss()
        for(let element of Object.keys(registerData)) {
            if(!registerData[element]){
                return(
                    Alert.alert("Debe completar todos los campos")
                )
            }
        };

        if(registerData.password !== registerData.passwordConfirm){
            return(
                Alert.alert("Las contraseñas no coinciden")
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
                    Registrate
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
                    label={
                        <Text
                            style={{backgroundColor:"white", color:"black"}}
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
                    contentStyle={{color:globalStyles.colors.black}}
                    underlineColor='transparent'
                    activeUnderlineColor='transparent'
                    
                    secureTextEntry={true}
                /> 
            </View>

            <View
                style={styles.TextContainer}
            >
                <TextInput
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
                    secureTextEntry={true}
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

            {
                loader?
                    <Loader />:
                    <></>
            }
        </View>
    )
}

export default RegisterScreen