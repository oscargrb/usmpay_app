import {FlatList, View, StyleSheet, Dimensions, TouchableHighlight, ScrollView} from "react-native"
import { BottomNavigation, Button, DataTable, IconButton, Text } from "react-native-paper"
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

    const findIndexOpacity = (index)=>{
        return (1 - (index/historic.length))
    }

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
                    /* console.log(data) */
                    setHistoric(
                        data.sort((a,b)=> new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                            .slice(0, 11)
                    )
                    return ()=>{
                        true
                    }
                }else{
                    /* console.log(data) */
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
            /* height:200, */
            padding:10,
            flex:1,
            justifyContent:"space-around"
        },
        header:{
            flexDirection:"row",
            alignItems:"flex-end",
            justifyContent:"space-around",
            padding:5,
            
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
        
        tableTitle:{
            color:globalStyles.colors.white,
            textAlign:"center",
            fontWeight:"bold",
            flex:1
        },
        cell:{
            color:globalStyles.colors.white,
            textAlign:"center",
            flex:1,
            padding:5,
            fontSize:10
        },
        cellUnic:{
            color:globalStyles.colors.white,
            textAlign:"center",
            flex:1,
            padding:5,
            fontSize:10,
            borderRadius:10
        }
    })

    return(
        <View
            style={styles.container}
        >

            <DataTable 
                style={{
                    overflow:"scroll",
                    height:270,
                }}
            >
                <DataTable.Header
                    style={{
                        borderBottomWidth:1,
                        borderBottomColor: globalStyles.colors.grey,
                        borderTopLeftRadius:5,
                        borderTopRightRadius:5
                    }}
                    
                >
                    <DataTable.Title textStyle={styles.tableTitle}>
                        Numero Op.
                    </DataTable.Title>
                    <DataTable.Title textStyle={styles.tableTitle}>
                        Operacion
                    </DataTable.Title>
                    <DataTable.Title textStyle={styles.tableTitle}>
                        Ruta
                    </DataTable.Title>
                    <DataTable.Title textStyle={styles.tableTitle}>
                        Fecha
                    </DataTable.Title>
                </DataTable.Header>
                <ScrollView>
                    {
                        historic.map((item, index)=>{
                            return(
                                <DataTable.Row key={item.id}
                                    style={{
                                        opacity: findIndexOpacity(index-3)
                                    }}
                                >
                                    <DataTable.Cell textStyle={styles.cell}>
                                        {item.id.toString().padStart(7, "0")}
                                    </DataTable.Cell>
                                    <DataTable.Cell textStyle={Object.assign({
                                        backgroundColor: item.type == "Compra"?
                                            globalStyles.colors.red:
                                            globalStyles.colors.green
                                    }, styles.cellUnic)}>
                                        {item.type}
                                    </DataTable.Cell>
                                    <DataTable.Cell textStyle={styles.cell}>
                                        {Rutas.find(i=> i.id == item.ruta_id).nbRuta}
                                    </DataTable.Cell>
                                    <DataTable.Cell textStyle={styles.cell}>
                                        {new Date(item.createdAt).toLocaleString(
                                            undefined,
                                            {day: "2-digit", month:"2-digit", "year":"2-digit"}
                                        )}
                                    </DataTable.Cell>
                                </DataTable.Row>
                            )
                        })
                    }
                </ScrollView>
                
            </DataTable>

            <View
                style={styles.header}
            >
                
                <View>
                    <Button
                        mode="outlined"
                        textColor={globalStyles.colors.grey}
                        
                        style={styles.headerTextMore}
                        onPress={()=> props.nav("HistoricUser")}
                    >
                        Ver todo
                    </Button>
                </View>
                
            </View>            
        </View>
    )
}

export default PaymentsHistoric