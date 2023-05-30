import {useEffect, useContext} from 'react'
import {useFocusEffect} from '@react-navigation/native'
import Loader from "../components/Loader"
import nxu from '../context/Nxu'
import Ucred from '../context/Ucred'
import UserInfoContext from '../context/UserInfoContext'
import ApiService from '../common/ApiService'
import RutasContext from '../context/RutasContext'

const Preload = ({navigation}) =>{

    const colors = [
        {
            id:1,
            color: "#b00",
            urlImage:"https://http2.mlstatic.com/D_NQ_NP_767473-MLV50739669349_072022-W.jpg"
        },
        {
            id:2,
            color: "#0b0",
            urlImage:"https://guiaccs.com/wp-content/uploads/2017/09/Plaza-Venezuela_DDN-DESTACADA.jpg"
        },
        {
            id:3,
            color:"#00b",
            urlImage:"https://www.descifrado.com/wp-content/uploads/2020/06/65422348.jpg"
        },
        {
            id:4,
            color:"#bb0",
            urlImage:"https://alcaldiadeguaicaipuro.gob.ve/wp-content/uploads/2022/08/fotocatedraldelosteques-1280x720-1.jpg"
        }
    ]

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
                            console.log(data.foundUser.Tickets)
                            updateUserInfo({
                                tickets: data.foundUser.Tickets,
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
                            
                        }).catch(e=>{
                            console.log(e, "error")
                            
                        })
                    }).catch(e=>{
                        console.log(e)
                        
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
                        response.json().then(data=>{
                            
                            if(response.status == 200){
                                let rutas = []
                                data.forEach(element => {
                                    element.color = colors.find(i=> i.id == element.id).color
                                    element.urlImage = colors.find(i=> i.id == element.id).urlImage
                                    rutas.push(element)
                                });
                                
                                updateRutas(rutas)
                                sendNxu(data[0])
                            }
                        })
                    })
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