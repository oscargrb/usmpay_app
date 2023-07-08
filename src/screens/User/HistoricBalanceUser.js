import {View, StyleSheet, FlatList, ScrollView, Alert, Pressable} from 'react-native'
import { Button, DataTable, IconButton, Modal, Portal, Text, TextInput } from 'react-native-paper'
import globalStyles from '../../common/globalStyles'
import {useContext, useState, useEffect} from 'react'
import UserInfoContext from '../../context/UserInfoContext'
import RutasContext from '../../context/RutasContext'
import nxu from '../../context/Nxu'
import ApiService from '../../common/ApiService'
import Loader from '../../components/Loader'


const balance = new Intl.NumberFormat("es-VE", {
    /* style: "currency",
    currency: "EUR", */
    minimumFractionDigits: 2,
});

const styles = StyleSheet.create({
    container:{
        /* flex:1,
        justifyContent:"space-between" */
    },
    inputContainer:{
        padding:20,
        
    },
    itemContainer:{
        flexDirection:"row",
        justifyContent:"space-between",
        paddingRight:20,
        paddingBottom:15,
        paddingTop: 15
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
    historicContainer:{
        backgroundColor: globalStyles.colors.blue,
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
        height:600
    },
    headerIcons:{
        flexDirection:"row",
        justifyContent:"space-between"
    },
    tableTitle:{
        color:globalStyles.colors.white,
        textAlign:"center",
        fontWeight:"bold",
        flex:1
    },
    cell:{
        color:globalStyles.colors.black,
        textAlign:"center",
        flex:1,
        padding:5,
        fontSize:10,
        
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

const HistoricBalanceUser = props =>{

    const {userInfo} = useContext(UserInfoContext)
    const {Rutas} = useContext(RutasContext)

    const [historic, setHistoric] = useState([])
    const [historicFilter, setHistoricFilter] = useState([])
    const [loader, setLoader] = useState(false)
    const [select, setSelect] = useState(null)
    const [modal, setModal] = useState(false)

    const findHistoric = async () =>{
        
        setLoader(true)
        const auth = await nxu.gnxut()

        fetch(`${ApiService.urlBankAutomate}/allConsult`, {
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                user: userInfo.document
            })
        }).then(response=>{
            console.log(response)
            if(response.status == 200){
                response.json().then(result=>{
                    console.log(result)
                    
                    if(result.ok){
                        setHistoric(
                            result.data.sort((a,b)=> new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                        )
                        setHistoricFilter(
                            result.data.sort((a,b)=> new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                        )
                    }
                    setLoader(false)
                    return ()=>{
                        true
                    }
                }).catch(e=>{
                    setLoader(false)
                    console.log(e)
                })
            }else{
                setLoader(false)
            }
        
        }).catch(e=>{
            setLoader(false)
            Alert.alert("Error, no se pudo conectar con el servidor")
        })
    }

    useEffect(()=>{
        findHistoric()
    }, [])

    onChangeSearch = val=>{
        setHistoricFilter(
            historic.filter(item=> item.Op_number.toString().includes(val.trim()) ||
                item.Status.toLowerCase().includes(val.toLowerCase())
            )
        )
    }

    return(

        <View>
            {
                select?
                    <Portal>
                    <Modal visible={modal} 
                        style={{
                            backgroundColor:globalStyles.colors.white,
                            marginHorizontal: 50,
                            marginTop:140,
                            marginBottom:140,
                            padding:20,
                            borderRadius:20
                        }}
                    >
                        <View
                            style={{
                                
                                flexDirection:"column",
                                justifyContent:"center",
                                alignItems:"center"
                            }}
                        >
                            <View>
                                <Text
                                    style={{
                                        fontSize:20,
                                        color:globalStyles.colors.black,
                                        margin:20,
                                        fontWeight:"bold"
                                    }}
                                >
                                    Detalles
                                </Text>
                            </View>
                            <View
                                style={{
                                    flexDirection:"row",
                                    margin:10
                                }}
                            >
                                <View
                                    style={{
                                        width:"100%"
                                    }}
                                >
                                    <Text
                                        style={{
                                            color:globalStyles.colors.black,
                                            fontSize:11
                                        }}
                                    >
                                        Número de Referencia
                                    </Text>
                                    <Text
                                        style={{
                                            borderBottomWidth:1,
                                            borderColor:globalStyles.colors.blue,
                                            padding:5,
                                            color:globalStyles.colors.black,
                                        }}
                                    >
                                        {select.Op_number}
                                    </Text>
                                </View>
                                
                            </View>
                            <View
                                style={{
                                    flexDirection:"row",
                                    margin:10
                                }}
                            >
                                <View
                                    style={{
                                        width:"100%"
                                    }}
                                >
                                    <Text
                                        style={{
                                            color:globalStyles.colors.black,
                                            fontSize:11
                                        }}
                                    >
                                        Estatus:
                                    </Text>
                                    <Text
                                        style={{
                                            borderBottomWidth:1,
                                            borderColor:globalStyles.colors.blue,
                                            padding:5,
                                            color:globalStyles.colors.black,
                                        }}
                                    >
                                        {select.Status}
                                    </Text>
                                </View>
                                
                            </View>
                            <View
                                style={{
                                    flexDirection:"row",
                                    margin:10
                                }}
                            >
                                <View
                                    style={{
                                        width:"100%"
                                    }}
                                >
                                    <Text
                                        style={{
                                            color:globalStyles.colors.black,
                                            fontSize:11
                                        }}
                                    >
                                        Monto Bs
                                    </Text>
                                    <Text
                                        style={{
                                            borderBottomWidth:1,
                                            borderColor:globalStyles.colors.blue,
                                            padding:5,
                                            color:globalStyles.colors.black,
                                        }}
                                    >
                                        {select.Count? balance.format(select.Count): ""}
                                    </Text>
                                </View>
                                
                            </View>
                            <View
                                style={{
                                    flexDirection:"row",
                                    margin:10
                                }}
                            >
                                <View
                                    style={{
                                        width:"100%"
                                    }}
                                >
                                    <Text
                                        style={{
                                            color:globalStyles.colors.black,
                                            fontSize:11
                                        }}
                                    >
                                        Creado el
                                    </Text>
                                    <Text
                                        style={{
                                            borderBottomWidth:1,
                                            borderColor:globalStyles.colors.blue,
                                            padding:5,
                                            color:globalStyles.colors.black,
                                        }}
                                    >
                                        {new Date(select.createdAt).toLocaleString(
                                            undefined,
                                            {day: "2-digit", month:"2-digit", "year":"2-digit"}
                                        )}
                                    </Text>
                                </View>
                                
                            </View>
                            
                            <View
                                style={{
                                    flexDirection:"row",
                                    margin:10
                                }}
                            >
                                <View
                                    style={{
                                        width:"100%"
                                    }}
                                >
                                    <Text
                                        style={{
                                            color:globalStyles.colors.black,
                                            fontSize:11
                                        }}
                                    >
                                        Vence el
                                    </Text>
                                    <Text
                                        style={{
                                            borderBottomWidth:1,
                                            borderColor:globalStyles.colors.blue,
                                            padding:5,
                                            color:globalStyles.colors.black,
                                        }}
                                    >
                                        {new Date(select.Expire).toLocaleString(
                                            undefined,
                                            {day: "2-digit", month:"2-digit", "year":"2-digit"}
                                        )}
                                    </Text>
                                </View>
                                
                            </View>
                            <Button
                                textColor={globalStyles.colors.white}
                                style={{
                                    margin:30,
                                    backgroundColor:globalStyles.colors.blue,
                                }}
                                onPress={async ()=>{
                                    setModal(false)
                                }}
                            >
                                Continuar
                            </Button>
                        </View>
                        
                    </Modal>
                </Portal>:
                <></>
            }
            <ScrollView
                style={styles.container}
            >
                <View
                    style={styles.headerIcons}
                >
                    <IconButton 
                        icon={"keyboard-backspace"}
                        iconColor={globalStyles.colors.black}
                        onPress={()=> props.navigation.goBack()}
                    />
                    <View
                        style={{
                            alignItems:"center",
                            justifyContent:"center"
                        }}
                    >
                        <Text
                            style={{
                                color: globalStyles.colors.black,
                                fontSize: 20,
                                fontWeight:"bold"
                            }}
                        >
                            Histórico de Billetera
                        </Text>
                    </View>
                    <IconButton 
                        icon={"refresh"}
                        iconColor={globalStyles.colors.black}
                        onPress={()=> findHistoric()}
                    />
                </View>
                <View
                    style={styles.inputContainer}
                >
                    <TextInput 
                        selectionColor="#00c"
                        
                        outlineColor={globalStyles.colors.blue}
                        outlineStyle={{
                            borderWidth:2
                        }}
                        activeOutlineColor="#007"
                        textColor={globalStyles.colors.black}
                        backgroundColor={globalStyles.colors.white}
                        label={
                            <Text
                                style={{backgroundColor:"white", color:"black"}}
                            >
                                Buscar...
                            </Text>
                        }
                        onChangeText={(val)=>onChangeSearch(val)}
                        
                    />
                    
                </View>

                <View
                    style={{
                        padding:20
                    }}
                >
                    <DataTable 
                        style={{
                            overflow:"scroll"
                        }}
                    >
                        <DataTable.Header
                            style={{
                                backgroundColor:globalStyles.colors.blue,
                                borderTopLeftRadius:5,
                                borderTopRightRadius:5
                            }}
                        >
                            <DataTable.Title textStyle={styles.tableTitle}>
                                Referencia
                            </DataTable.Title>
                            <DataTable.Title textStyle={styles.tableTitle}>
                                Estatus
                            </DataTable.Title>
                            <DataTable.Title textStyle={styles.tableTitle}>
                                Monto Bs
                            </DataTable.Title>
                            <DataTable.Title textStyle={styles.tableTitle}>
                                Creado
                            </DataTable.Title>
                            <DataTable.Title textStyle={styles.tableTitle}>
                                Vence el
                            </DataTable.Title>
                        </DataTable.Header>


                        {
                            historicFilter.map(item=>{
                                return(
                                    <Pressable
                                        onPress={()=> {
                                            setSelect(item)    
                                            setModal(true)
                                        }}
                                        key={item.id}
                                    >
                                        <DataTable.Row key={item.id}>
                                            <DataTable.Cell textStyle={styles.cell}>
                                                {item.Op_number}
                                            </DataTable.Cell>
                                            <DataTable.Cell textStyle={Object.assign({
                                                backgroundColor: item.Status == "Validado"?
                                                    globalStyles.colors.green:
                                                    item.Status == "Expirado"?
                                                        globalStyles.colors.red:
                                                        globalStyles.colors.yellow
                                            }, styles.cellUnic)}>
                                                {item.Status}
                                            </DataTable.Cell>
                                            <DataTable.Cell textStyle={styles.cell}>
                                                {item.Count? balance.format(item.Count): ""}
                                            </DataTable.Cell>
                                            <DataTable.Cell textStyle={styles.cell}>
                                                {new Date(item.createdAt).toLocaleString(
                                                    undefined,
                                                    {day: "2-digit", month:"2-digit", "year":"2-digit"}
                                                )}
                                            </DataTable.Cell>
                                            <DataTable.Cell textStyle={styles.cell}>
                                                {new Date(item.Expire).toLocaleString(
                                                    undefined,
                                                    {day: "2-digit", month:"2-digit", "year":"2-digit"}
                                                )}
                                            </DataTable.Cell>
                                        </DataTable.Row>
                                    </Pressable>
                                )
                            })
                        }

                        
                    </DataTable>
                </View>

                
                
            </ScrollView>
            {
                loader?
                    <Loader />:
                    <></>
            }
        </View>
    )
}

export default HistoricBalanceUser