import {FlatList, View, StyleSheet, Dimensions, TouchableHighlight} from "react-native"
import { IconButton, Text } from "react-native-paper"
import globalStyles from "../common/globalStyles"
import { useState, useEffect, useContext } from 'react'
import nxu from "../context/Nxu"
import ApiService from "../common/ApiService"
import UserInfoContext from "../context/UserInfoContext"
import RutasContext from "../context/RutasContext"


const PaymentsHistoric = props =>{

    const {userInfo} = useContext(UserInfoContext)
    const {Rutas} = useContext(RutasContext)

    const [historic, setHistoric] = useState([])

    const findHistoric = async () =>{
        const auth = await nxu.gnxut()

        fetch(`${ApiService.url}/transaction?user=${userInfo.document}`, {
            method:"get",
            headers:{
                "Authorization": `Bearer ${auth.result.tkn}`,
                "Content-Type":"application/json"
            }
        }).then(response=>{
            response.json().then(data=>{
                if(response.status == 200){
                    console.log(data)
                    setHistoric(
                        data.sort((a,b)=> new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                            .slice(0, 11)
                    )
                    return ()=>{
                        true
                    }
                }else{
                    console.log(data)
                }
            })
        })
    }

    useEffect(()=>{
        findHistoric()
    }, [])

    const styles = StyleSheet.create({
        container:{
            
            backgroundColor: globalStyles.colors.blue,
            borderTopStartRadius: 20,
            borderTopEndRadius: 20,
            //height:300,
            
            flex:1
            
        },
        header:{
            flexDirection:"row",
            justifyContent:"space-between",
            padding:20,
        },
        headerText:{
            color:"#fff"
        },
        headerTextMore:{
            color:"#fff",
            textDecorationLine:"underline"
        },
        headerTextUpdate:{
            color:"#fff",
            textDecorationLine:"underline"
        },
        itemContainer:{
            flexDirection:"row",
            justifyContent:"space-between",
            /* paddingRight:20,
            paddingBottom:15,
            paddingTop: 15, */
            padding:10,
            flex:1,
        },
        iconTextContainer:{
            flexDirection:"row",
            alignItems:"center",
            justifyContent:"flex-start"
        },
        amountDateContainer:{
            alignItems:"flex-end",
            justifyContent:"center"
        },
        icon:{
            color:"#fff"
        },
        text:{
            color:"#fff"
        },
        
    })

    return(
        <View
            style={styles.container}
        >
            <View
                style={styles.header}
            >
                <View>
                    <Text
                        style={styles.headerText}
                    >
                        Histórico
                    </Text>
                </View>
                <View>
                    <Text
                        style={styles.headerTextMore}
                        onPress={()=> props.nav("HistoricUser")}
                    >
                        Ver mas
                    </Text>
                </View>
                <View>
                    <Text
                        style={styles.headerTextUpdate}
                        onPress={()=> findHistoric()}
                    >
                        Actualizar
                    </Text>
                </View>
            </View>
            <FlatList
                data={historic}
                scrollEnabled={true}
                style={styles.flatlist}
                renderItem={({item})=> 
                    <View
                        style={styles.itemContainer}
                    >
                        <View
                            style={styles.iconTextContainer}
                        >
                            <IconButton
                                style={styles.icon}
                                iconColor="#ccc" 
                                icon={
                                    item.type == "Compra"?
                                        "ticket":
                                        "bus"
                                }
                            />
                            <Text
                                style={styles.text} 
                            >
                                {item.type}
                            </Text>
                        </View>
                        <View
                            style={styles.amountDateContainer}
                        >
                            <Text
                                style={styles.text}
                            >
                                {item.id.toString().padStart(7, "0")}</Text>
                            <Text
                                style={styles.text}
                            >
                                {Rutas.find(i=> i.id == item.ruta_id).nbRuta}</Text>
                            <Text
                                style={styles.text}
                            >
                                {new Date(item.createdAt).toLocaleString()}
                            </Text>
                        </View>
                    </View>
                }
                keyExtractor={item => item.id}
            />
        </View>
    )
}

export default PaymentsHistoric