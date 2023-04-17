import {  Text, View, StyleSheet, Alert, Image, DeviceEventEmitter, TouchableHighlight } from "react-native";
import { TextInput, Button } from "react-native-paper"
import {useContext, useEffect, useState} from "react"

import TouchID from "react-native-touch-id";
import globalStyles from "../common/globalStyles";
import { tkn } from "../App";
import nxu from "../context/Nxu";

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding: 20,
        backgroundColor:globalStyles.colors.white
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
    },
    fingerImage:{
        width: 100,
        height: 100,
        resizeMode:"contain"
    },
    fingerText:{
        fontSize: 15,
        color: "#333",
        margin: 20
    }
})

const LoginScreen = props=>{

    const [registerData, setRegisterData] = useState({
        document:null,
        password: null
    })

    useEffect(()=>{
        TouchID.isSupported().then(biometryType=>{
            Alert.alert('biometry works!!!!!!')
            Alert.alert(biometryType.toString())
        }).catch(error=>{
            Alert.alert(error.code.toString())
        })
    }, [])

    const loginWithFinger = ()=>{
        TouchID.authenticate('Para iniciar sesion coloca tu huella dactilar',
            {
                title:"Coloca tu huella"
            }
        )
            .then(sucess=>{
                Alert.alert('Login sucessfull', 'Credential: fingerprint!', [
                    {
                      text: 'Continue',
                      onPress: () => props.navigation.navigate('Acount')
                    }
                ])
            })
            .catch(error=>{
                Alert.alert('Authetication fail!')
            })
    }

    const onSubmitForm = ()=>{
        for(let element of Object.keys(registerData)) {
            if(!registerData[element]){
                return(
                    Alert.alert("Debe completar todos los campos")
                )
            }
        };

        fetch("http://192.168.1.106:3500/auth",{
            method:"POST",
            headers:{
                //'Content-Type': 'application/x-www-form-urlencoded'
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                user:registerData.document,
                pwd: registerData.password
            })
        }).then(response=>{
            if(response.status == 200){
                response.json().then(async data=>{
                    if(data.accessToken){
                        const result = await nxu.snxut(data.accessToken)
                        if(result.ok){
                            Alert.alert('Login sucessfull!')
                            props.navigation.navigate('Acount')
                        }
                        
                    }else{
                        Alert.alert('Bad Login!')
                    }
                })
            }else{
                Alert.alert('Bad Login!')
            }
            
        }).catch(e=>{
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
                    Inicia Sesión
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
            </View>

            <View
                style={styles.TextContainer}
            >
                <TextInput
                    onChangeText={text => onChageField("document", text)}
                    label="Número de documento *"
                    mode="outlined"
                    selectionColor="#00c"
                    outlineStyle={{borderWidth:2, borderColor: globalStyles.colors.blue}}
                    outlineColor="#007"
                    activeOutlineColor="#007"
                /> 
            </View>

            <View
                style={styles.TextContainer}
            >
                <TextInput
                    onChangeText={text => onChageField("password", text)}
                    mode="outlined"
                    outlineStyle={{borderWidth:2, borderColor: globalStyles.colors.blue}}
                    selectionColor="#00c"
                    outlineColor="#007"
                    activeOutlineColor="#007"
                    label="Clave de acceso *"
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
                >
                    Iniciar Sesión
                </Button>
            </View>

            <View
                style={styles.buttonSendContainer} 
            >
                <TouchableHighlight 
                    onPress = {loginWithFinger}
                    underlayColor={"transparent"}
                    
                >
                    <Image
                        style={styles.fingerImage} 
                        source={
                            require('../assets/logoFinger2.png')
                        }
                        
                    />
                    
                </TouchableHighlight>
                <Text
                    style={styles.fingerText}
                    
                >
                    Ingresa con tu huella
                </Text>
            </View>
        </View>
    )
}

export default LoginScreen