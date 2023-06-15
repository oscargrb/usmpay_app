import {ScrollView, View, Dimensions, ImageBackground, Pressable, Alert} from "react-native"
import { Button, Card, IconButton, Text } from "react-native-paper"
import globalStyles from "../common/globalStyles"
import {useContext} from 'react'
import UserInfoContext from "../context/UserInfoContext"
import RutasContext from "../context/RutasContext"


const SelectRuta = props =>{

    const {Rutas} = useContext(RutasContext)
    const {userInfo, updateUserInfo} = useContext(UserInfoContext)
    console.log(userInfo.tickets.filter(i=> i.ruta_id == 1).length)

    const selectRuta = (ruta)=>{
        let newUserInfo = {}
        Object.assign(newUserInfo, userInfo)
        newUserInfo.selectRuta = ruta

        updateUserInfo(newUserInfo)

        props.nav('NFCUser')
    }

    return(
        <View
            style={{
                
                width:Dimensions.get("screen").width,
                flex:1,
                flexDirection:"column",
                height:Dimensions.get("screen").height - 100,
                padding:5,
                backgroundColor: "#eee"
            }}
        >
            <View
                style ={{
                    flexDirection:"row",
                    alignItems:"center",
                    justifyContent:"space-between"
                }}
            >
                <IconButton 
                    icon={"keyboard-backspace"}
                    iconColor={globalStyles.colors.black}
                    onPress={()=> props.nav('Acount')}
                />
                <Text
                    style={{
                        padding:10,
                        fontSize:20,
                        fontWeight:"bold",
                        color: globalStyles.colors.black
                    }}
                >
                    Seleccione una Ruta *
                </Text>
            </View>
            
            <ScrollView
                
            >
                {
                    Rutas.map(i=>{
                        return(
                            <View
                                style={{
                                    
                                    overflow:"hidden",
                                    borderRadius:20,
                                    margin:5
                                }}
                                key={i.id}
                            >
                                <Pressable
                                    onPress={()=>{
                                        userInfo.tickets.length > 0 && userInfo.tickets.filter(j=> j.ruta_id == i.id).length > 0?
                                        selectRuta(i.nbRuta):
                                        Alert.alert("Error", "No posees tickets suficientes para esta ruta")
                                    }}
                                >
                                    <ImageBackground
                                        style={{
                                            height:300,
                                            borderRadius:20,
                                            padding:20,
                                            
                                        }}
                                        source={{
                                            uri:i.foto
                                        }}
                                        
                                    >
                                        <View
                                            style={{
                                                position:"absolute",
                                                height:300,
                                                width:Dimensions.get("screen").width - 20,
                                                backgroundColor:"rgba(0,0,255, .7)",
                                                opacity:.4
                                            }}
                                        ></View>
                                        
                                        <Text
                                            style={{
                                                fontSize:40,
                                                color:"#fff",
                                                
                                            }}
                                        >
                                            {i.nbRuta}
                                        </Text>

                                        <Button 
                                            buttonColor={i.color}
                                            textColor="#fff"
                                            style={{
                                                width:100,
                                            }}
                                            icon={"ticket"}
                                            mode="contained"    
                                        >
                                            {
                                                userInfo.tickets.filter(j=> j.ruta_id == i.id).length > 0?
                                                userInfo.tickets.filter(j=> j.ruta_id == i.id).length:
                                                "0"
                                            }
                                        </Button>
                                        
                                    
                                    </ImageBackground>
                                </Pressable>
                            </View>
                        )
                    })
                }
            </ScrollView>
        </View>
    )
}

export default SelectRuta