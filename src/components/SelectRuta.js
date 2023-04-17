import {ScrollView, View, Dimensions, ImageBackground} from "react-native"
import { Card, IconButton, Text } from "react-native-paper"


const rutas = [
    {
        id:0,
        ruta: "La California",
        color:"#b00",
        urlImage:"https://http2.mlstatic.com/D_NQ_NP_767473-MLV50739669349_072022-W.jpg"
    },
    {
        id:1,
        ruta: "Plaza Venezuela",
        color:"#0b0",
        urlImage:"https://guiaccs.com/wp-content/uploads/2017/09/Plaza-Venezuela_DDN-DESTACADA.jpg"
    },
    {
        id:2,
        ruta: "Guatire / Guarenas",
        color:"#00b",
        urlImage:"https://www.descifrado.com/wp-content/uploads/2020/06/65422348.jpg"
    },
    {
        id:3,
        ruta: "Los Teques",
        color:"#bb0",
        urlImage:"https://alcaldiadeguaicaipuro.gob.ve/wp-content/uploads/2022/08/fotocatedraldelosteques-1280x720-1.jpg"
    }
]

const SelectRuta = props =>{
    return(
        <View
            style={{
                position:"absolute",
                width:Dimensions.get("screen").width,
                marginTop:55,
                flex:1,
                flexDirection:"column",
                height:Dimensions.get("screen").height - 100,
                padding:5,
                backgroundColor: "#eee"
            }}
        >
            <Text
                style={{
                    padding:10,
                    fontSize:20,
                    fontWeight:"bold"
                }}
            >
                * Selecciona una Ruta
            </Text>
            <ScrollView
                
            >
                {
                    rutas.map(i=>{
                        return(
                            <View
                                style={{
                                    
                                    overflow:"hidden",
                                    borderRadius:20,
                                    margin:5
                                }}
                            >
                                
                                <ImageBackground
                                    style={{
                                        height:300,
                                        borderRadius:20,
                                        padding:20,
                                        
                                    }}
                                    source={{
                                        uri:i.urlImage
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
                                        {i.ruta}
                                    </Text>

                                    <IconButton 
                                        containerColor={i.color}
                                        iconColor="#fff"
                                        icon={"ticket"}
                                        mode="contained"
                                    />
                                
                                </ImageBackground>
                            </View>
                        )
                    })
                }
            </ScrollView>
        </View>
    )
}

export default SelectRuta