import {View, StyleSheet, FlatList} from 'react-native'
import { IconButton, Text, TextInput } from 'react-native-paper'
import globalStyles from '../../common/globalStyles'
import {useContext, useState, useEffect} from 'react'
import UserInfoContext from '../../context/UserInfoContext'
import RutasContext from '../../context/RutasContext'
import nxu from '../../context/Nxu'
import ApiService from '../../common/ApiService'
import Loader from '../../components/Loader'


const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"space-between"
    },
    inputContainer:{
        padding: 10
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
    }
})

const HistoricUser = props =>{

    const {userInfo} = useContext(UserInfoContext)
    const {Rutas} = useContext(RutasContext)

    const [historic, setHistoric] = useState([])
    const [historicFilter, setHistoricFilter] = useState([])
    const [loader, setLoader] = useState(false)

    const findHistoric = async () =>{
        setLoader(true)
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
                    setHistoricFilter(
                        data.sort((a,b)=> new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    )
                    setHistoric(
                        data.sort((a,b)=> new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    )
                    setLoader(false)
                    return ()=>{
                        true
                    }
                }else{
                    console.log(data)
                }
                setLoader(false)
            })
        })
    }

    useEffect(()=>{
        findHistoric()
    }, [])

    onChangeSearch = val=>{
        setHistoricFilter(
            historic.filter(item=> item.id.toString().includes(val.trim()))
        )
    }

    return(
        <View
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
                    label={"Buscar..."}
                    
                    onChangeText={(val)=>onChangeSearch(val)}
                    right={<TextInput.Icon icon={"text-search"}/>}
                    theme={{dark:false}}
                />
            </View>

            <View
                style={styles.historicContainer}
            >
                <FlatList
                    data={historicFilter}
                    scrollEnabled={true}
                    /* style={styles.flatlist} */
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
            {
                loader?
                    <Loader />:
                    <></>
            }
        </View>
    )
}

export default HistoricUser