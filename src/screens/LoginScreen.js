import {  Text, View, StyleSheet, Alert, Image, TouchableHighlight, Keyboard } from "react-native";
import { TextInput, Button } from "react-native-paper"
import { useEffect, useState} from "react"

import TouchID from "react-native-touch-id";
import globalStyles from "../common/globalStyles";
import nxu from "../context/Nxu";
import Loader from "../components/Loader";
import Ucred from "../context/Ucred";
import ApiService from "../common/ApiService";

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding: 20,
        backgroundColor:globalStyles.colors.grey
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

    const [loader, setLoader] = useState(false)

    

    const onSubmitForm = (dataFinger)=>{
        Keyboard.dismiss()
        
        setLoader(true)

        for(let element of Object.keys(registerData)) {
            if(!registerData[element]){
                setLoader(false)
                return(
                    Alert.alert("Error al iniciar Sesión", "Debe completar el campo " + element)
                )
            }
        };
        

        fetch(`${ApiService.url}/auth`,{
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
                        const result = await nxu.snxut({
                            tkn: data.accessToken,
                            sessionToken: response.headers.map["set-cookie"],
                            timeout: Number(response.headers.map['keep-alive'].replaceAll(/\D+/g, ""))
                        })
                        if(result.ok){
                            setLoader(false)
                            const scred = await Ucred.sUcred({
                                user:registerData.document,
                                pwd: registerData.password 
                            })
                            
                            props.navigation.navigate('Preload')
                        }
                        
                    }else{
                        setLoader(false)
                        Alert.alert('Bad Login!')
                    }
                }).catch(e=>{
                    setLoader(false)
                    Alert.alert('Bad Login!')
                })
            }else{
                setLoader(false)
                Alert.alert('Bad Login!')
            }
            
        }).catch(e=>{
            setLoader(false)
            Alert.alert('Bad Login!')
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
                    value={registerData.document}
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
                    onChangeText={text => onChageField("password", text)}
                    value={registerData.password}
                    
                    label={
                        <Text
                            style={{backgroundColor:"white", color:"black"}}
                        >
                            Clave de acceso *
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
                    Iniciar Sesión
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

export default LoginScreen