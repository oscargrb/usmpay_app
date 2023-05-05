import {View, StyleSheet, Dimensions, Alert} from 'react-native'
import { Button, Modal, Portal, Provider, Text } from 'react-native-paper'
import globalStyles from '../common/globalStyles'
import { useEffect, useState } from 'react'
import nxu from '../context/Nxu'
import Loader from './Loader'
import UserService from '../common/UserService'

const styles = StyleSheet.create({

    container:{
        backgroundColor:globalStyles.colors.white,
        margin:50,
        padding:20,
        height:200,
        marginTop:250,
        alignItems:"center",
        justifyContent:"space-around"
    },
    buttonContainer:{
        margin:10,
        justifyContent:"center",
        flexDirection: "row",
        alignItems:"center",
        
    },
    button:{
        
        margin:10,
    },
    text:{
        textAlign:"center",
        color: globalStyles.colors.black
    }
})

const TokenTimeout = props =>{

    /* const [loader, setLoader] = useState(false)

    useEffect(() => {
        //mainLoop()
    }, [])

    const mainLoop = ()=>{
        const loopScanLogin = () =>{
            const interval1 = setInterval(async ()=>{
                const NXU = await nxu.gnxut()

                console.log(NXU.result)
                if(NXU.ok && NXU.result){
                    clearInterval(interval1)
                    loopExpireSession()
                }
            }, 1000)
        }
    
        const loopExpireSession = ()=>{
            const interval = setInterval(()=>{
                Alert.alert(
                    'Espera!',
                    'Tu sesion esta por vencer, quiere extenderla?',
                    [
                        {
                            text:"No",
                            onPress: async ()=> {
                                setTimeout(async ()=>{
                                    const logout = await UserService.logout()
                                    if(logout.ok){
                                        setLoader(false)
                                        clearInterval(interval)
                                        loopScanLogin()
                                        props.navigation.navigate("Home")
                                    }else{
                                        setLoader(false)
                                        Alert.alert('Error: No se puede cerrar sesion')
                                    }
                                }, 2000)
                            }
                        },
                        {
                            text: "Si",
                            // ACA TENGO QUE REFRESCAR EL TOKEN
                            onPress: ()=> null
                        }
                    ]
                )
            }, 5000)
        }

        loopScanLogin()
    } */

    

    return(
        <>
            
        </>
    )
}

export default TokenTimeout