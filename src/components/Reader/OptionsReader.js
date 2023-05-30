import { useState, useContext, useEffect } from "react"
import { View, StyleSheet, Dimensions } from "react-native"
import { Button, Dialog, IconButton, Portal, RadioButton, SegmentedButtons, Text } from "react-native-paper"
import globalStyles from "../../common/globalStyles"
import UserInfoContext from "../../context/UserInfoContext"
import RutasContext from "../../context/RutasContext"


const OptionsReader = props =>{

    const {Rutas} = useContext(RutasContext)

    const [modalSelectRuta, SetModalSelectRuta] = useState(false)
    const [checked, setChecked] = useState({});
    const {userInfo, updateUserInfo} = useContext(UserInfoContext)

    

    const openModal = () => {
        SetModalSelectRuta(true)
    }
    const closeModal = () => {
        SetModalSelectRuta(false)
    }

    const changeRutaActual = ()=>{
        let newUserInfo = {}
        Object.assign(newUserInfo, userInfo)
        newUserInfo.rutaActual = checked
        updateUserInfo(newUserInfo)
    }

    const styles = StyleSheet.create({
        container:{
            margin:10,
            marginTop:0
        },
        segButtons:{
            backgroundColor:"transparent"
        },
        buttons:{
            color:globalStyles.colors.blue
        },
        itemRuta:{
            flexDirection:"row",
            alignItems:"center"
        },
        card:{
            backgroundColor:globalStyles.colors.white
        }
    })

    return (
        <View
            style={styles.container}
        >

            <SegmentedButtons
                style={styles.segButtons}
                density="small"
                onValueChange={()=> console.log("sad")} 
                buttons={[
                    {
                        style:styles.buttons,
                        checkedColor:globalStyles.colors.black,
                        uncheckedColor:globalStyles.colors.blue,
                        icon:"ticket-confirmation",
                        value:"Abordar",
                        label:"Cobrar Pasaje",
                        onPress: ()=> props.nav('NFCRead')
                    },
                    {
                        style:styles.buttons,
                        checkedColor:globalStyles.colors.black,
                        uncheckedColor:globalStyles.colors.blue,
                        icon:"format-list-checks",
                        value:"Mi Billetera",
                        label:"Cambiar Ruta Actual",
                        onPress:openModal
                        
                    }
                ]}
            />

            {
                modalSelectRuta?
                
                <View>
                    
                    <Portal>
                    <Dialog visible={true} onDismiss={closeModal}>
                        <Dialog.Title>Alert</Dialog.Title>
                        <Dialog.Content>

                            {
                                Rutas.map(i=>{
                                    return(
                                        <View
                                            style={styles.itemRuta}
                                            key={i.id}
                                        >
                                            <RadioButton 
                                                value={i.nbRuta}
                                                status={checked.nbRuta == i.nbRuta? 'checked': 'unchecked'}
                                                onPress={()=> {
                                                    setChecked(i)
                                                    
                                                }}
                                            />
                                            <Text>{i.nbRuta}</Text>
                                        </View>
                                    )
                                })
                            }
                            
                            
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button 
                                onPress={()=>{
                                    if(checked.nbRuta){
                                        changeRutaActual()
                                        closeModal()
                                    }
                                }}
                            >
                                Aceptar
                            </Button>
                        </Dialog.Actions>
                    </Dialog>
                    </Portal>
                </View>:
                <></>
            }
        </View>
    )
}

export default OptionsReader