import {  Text, View, StyleSheet, Alert, Image, DeviceEventEmitter, TouchableHighlight } from "react-native";
import { TextInput, Button } from "react-native-paper"
import {useContext, useEffect, useState} from "react"

import TouchID from "react-native-touch-id";
import globalStyles from "../common/globalStyles";
import { tkn } from "../App";
import nxu from "../context/Nxu";
import Loader from "../components/Loader";
import Ucred from "../context/Ucred";
import ApiService from "../common/ApiService";

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

    const [fingerprintEnable, setFingerprintEnable] = useState(true)

    const [loader, setLoader] = useState(false)

    useEffect(()=>{
        setLoader(true)
        TouchID.isSupported().then(biometryType=>{
            //Alert.alert('biometry works!!!!!!')
            //Alert.alert(biometryType.toString())
        }).catch(error=>{
            //Alert.alert(error.code.toString())
            setFingerprintEnable(false)
        })

        const fingerPref = async ()=>{
            const fpref = await Ucred.gFingerPref()

            if(fpref.ok){
                if(fpref.pref /*&& ...data exist....*/){
                    setFingerprintEnable(true)
                }
            }

            setLoader(false)
        }

        fingerPref()
    }, [])

    const loginWithFinger = ()=>{
        TouchID.authenticate('Para iniciar sesion coloca tu huella dactilar',
            {
                title:"Coloca tu huella"
            }
        )
            .then(async sucess=>{
                setLoader(true)

                const cred = await Ucred.gUcred()

                if(cred.ok){
                    

                    fetch(`${ApiService.url}/auth`,{
                        method:"POST",
                        headers:{
                            //'Content-Type': 'application/x-www-form-urlencoded'
                            'Content-Type': 'application/json'
                        },
                        body:JSON.stringify({
                            user:cred.result.data.user,
                            pwd: cred.result.data.pwd
                        })
                    }).then(response=>{
                        console.log(response)
                        if(response.status == 200){
                            response.json().then(async data=>{
                                console.log(data)
                                if(data.accessToken){
                                    const result = await nxu.snxut(data.accessToken)
                                    if(result.ok){
                                        setLoader(false)
                                        //Alert.alert('Login sucessfull!')
                                        
                                        props.navigation.navigate('Acount')
                                    }
                                    
                                }else{
                                    setLoader(false)
                                    Alert.alert('Bad Login!')
                                }
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
            })
            .catch(error=>{
                setLoader(false)
                Alert.alert('Authetication fail!')
                console.log(error)
            })
    }

    const onSubmitForm = (dataFinger)=>{
        console.log(registerData)
        setLoader(true)

        for(let element of Object.keys(registerData)) {
            if(!registerData[element]){
                setLoader(false)
                return(
                    Alert.alert("Debe completar todos los campos")
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
            console.log(response)
            if(response.status == 200){
                response.json().then(async data=>{
                    
                    if(data.accessToken){
                        const result = await nxu.snxut(data.accessToken)
                        if(result.ok){
                            setLoader(false)
                            //Alert.alert('Login sucessfull!')
                            const scred = await Ucred.sUcred({
                                user:registerData.document,
                                pwd: registerData.password 
                            })
                            console.log(scred)
                            props.navigation.navigate('Acount')
                        }
                        
                    }else{
                        setLoader(false)
                        Alert.alert('Bad Login!')
                    }
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
                    value={registerData.password}
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

            {
                fingerprintEnable?
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
                </View>:
                <></>
            }

            {
                loader?
                    <Loader />:
                    <></>
            }
        </View>
    )
}

export default LoginScreen