import { useState, useContext } from "react"
import { View, StyleSheet, Dimensions } from "react-native"
import { Button, Dialog, IconButton, Portal, RadioButton, SegmentedButtons, Text } from "react-native-paper"
import globalStyles from "../../common/globalStyles"
import UserInfoContext from "../../context/UserInfoContext"

const rutaList = [
    {
        name:"La California",
        tarifa:9,
        id:1
    },
    {
        name:"Guatire / Guarenas",
        tarifa:25,
        id:2
    },
    {
        name:"Plaza Venezuela",
        tarifa:15,
        id:3
    },
    {
        name:"Los Teques",
        tarifa:30,
        id:4
    },
]

const OptionsReader = props =>{

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
        newUserInfo.rutaActual = checked.name
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
                                rutaList.map(i=>{
                                    return(
                                        <View
                                            style={styles.itemRuta}
                                            key={i.id}
                                        >
                                            <RadioButton 
                                                value={i.name}
                                                status={checked.name == i.name? 'checked': 'unchecked'}
                                                onPress={()=> {
                                                    setChecked(i)
                                                    
                                                }}
                                            />
                                            <Text>{i.name}</Text>
                                        </View>
                                    )
                                })
                            }
                            
                            
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button 
                                onPress={()=>{
                                    changeRutaActual()
                                    closeModal()
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