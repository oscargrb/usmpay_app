import {useEffect, useContext} from 'react'
import {useFocusEffect} from '@react-navigation/native'
import Loader from "../components/Loader"
import nxu from '../context/Nxu'
import Ucred from '../context/Ucred'
import UserInfoContext from '../context/UserInfoContext'
import ApiService from '../common/ApiService'
import RutasContext from '../context/RutasContext'
import { Alert } from 'react-native'

const Preload = ({navigation}) =>{

    const balance = new Intl.NumberFormat("es-VE", {
        /* style: "currency",
        currency: "EUR", */
        minimumFractionDigits: 2,
    });

    const {updateUserInfo} = useContext(UserInfoContext)
    const {updateRutas} = useContext(RutasContext)

    useEffect(()=>{
        navigation.addListener('focus', ()=>{
            
            const sendNxu = async (first)=>{
                const auth = await nxu.gnxut()
                const ucred = await Ucred.gUcred()
    
                if(auth.ok){ 
                    fetch(`${ApiService.url}/info`, {
                        method:"POST",
                        headers:{
                            "Authorization": `Bearer ${auth.result.tkn}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            user: ucred.result.data.user
                        })
                    }).then(response=>{
                        response.json().then(data=>{
                            if(!data.error){
                                console.log(data)
                                updateUserInfo({
                                    tickets: data.tickets,
                                    balance: balance.format(data.foundUser.UserBalance.balance),
                                    correo: data.foundUser.correo,
                                    document: data.foundUser.id_number,
                                    rol: data.foundUser.rol,
                                    telefono: data.foundUser.telefono,
                                    rutaActual: first
                                })
                               //navigation.navigate('AcountReader')
                                data.foundUser.rol == 2001? 
                                    navigation.navigate('Acount'):
                                    navigation.navigate('AcountReader')
                            }else{
                                console.log(data.error)
                                navigation.goBack()
                            }
                            
                            
                        }).catch(e=>{

                            console.log(e, "error")
                            navigation.goBack()
                        })
                    }).catch(e=>{
                        console.log(e)
                        navigation.goBack()
                    })
                }
            }

            const findRutas = async ()=>{
                const auth = await nxu.gnxut()
                if(auth.ok){
                    
                    fetch(`${ApiService.url}/ruta/ruta`, {
                        method:"get",
                        headers:{
                            "Authorization": `Bearer ${auth.result.tkn}`,
                            'Content-Type': 'application/json'
                        }
                    }).then(response=>{
                        console.log(response)
                        if(response.status == 200){
                            response.json().then(data=>{
                                console.log(data)
                                updateRutas(data)
                                sendNxu(data[0])
                            })
                        }
                    }).catch(e=>{
                        console.log(e, "entra aca")
                        navigation.goBack()
                    })
                }else{
                    navigation.goBack()
                }
            }

            findRutas()
            
        })
    }, [])

    return(
        <>
            <Loader />
        </>
    )
}

export default Preload