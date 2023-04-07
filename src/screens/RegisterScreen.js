import {  Text, View, StyleSheet, Alert } from "react-native";
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
    }
})

const RegisterScreen = props=>{

    const [registerData, setRegisterData] = useState({
        document:null,
        password: null,
        passwordConfirm: null
    })

    const onSubmitForm = ()=>{
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

        return(
            Alert.alert(JSON.stringify(registerData))
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
                    label="Crear clave de acceso *"
                    secureTextEntry={true}
                /> 
            </View>

            <View
                style={styles.TextContainer}
            >
                <TextInput
                    onChangeText={text => onChageField("passwordConfirm", text)}
                    mode="outlined"
                    selectionColor="#00c"
                    outlineColor="#007"
                    activeOutlineColor="#007"
                    label="Confirmar clave de acceso *"
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
                    Registrarme
                </Button>
            </View>
        </View>
    )
}

export default RegisterScreen