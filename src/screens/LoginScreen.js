import {  Text, View, StyleSheet, Alert, Image } from "react-native";
import { TextInput, Button } from "react-native-paper"
import {useState} from "react"

const styles = StyleSheet.create({
    container:{
        margin: 20
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
    fingerImage:{
        width: 100,
        height: 100
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

    const onSubmitForm = ()=>{
        for(let element of Object.keys(registerData)) {
            if(!registerData[element]){
                return(
                    Alert.alert("Debe completar todos los campos")
                )
            }
        };

        return(
            Alert.alert('Login sucessfull', JSON.stringify(registerData), [
                {
                  text: 'Continue',
                  onPress: () => props.navigation.navigate('Acount')
                }
            ])
        )
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
                    Inicia Sesion
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
                    label="Numero de documento *"
                    mode="outlined"
                    selectionColor="#00c"
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
                    buttonColor="#00a"
                    mode="contained"
                    onPress={onSubmitForm}
                >
                    Iniciar Sesion
                </Button>
            </View>

            <View
                style={styles.buttonSendContainer} 
            >
                <Image
                    style={styles.fingerImage} 
                    source={
                        require('../assets/logoFingerprint.png')
                    }
                />
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