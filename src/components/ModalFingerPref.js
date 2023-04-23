import {View, StyleSheet} from 'react-native'
import { Button, Modal, Portal, Text } from 'react-native-paper'
import globalStyles from '../common/globalStyles'

const styles = StyleSheet.create({
    container:{
        backgroundColor: globalStyles.colors.white,
        padding: 50,
        marginTop: 100,
        marginBottom:100,
        marginHorizontal: 50,
        height: 250,
        alignItems:"center",
        justifyContent:"space-around"
    },
    buttonContainer:{
        marginTop:20,
        flex:1,
        flexDirection: "row",
        alignItems:"center"
    },
    button:{
        flex:1,
        margin:10
    },
    text:{
        textAlign:"center"
    }
})

const ModalFingerPref = props =>{

    return(
        <Portal>
            <Modal
                visible={props.fprefVisible}
                style={styles.container}
            >
                <Text style={styles.text}>Bienvenido a USMPAY!</Text>
                <Text style={styles.text}>Le gustaria activar el inicio sesion con su huella dactilar?</Text>
                <View
                    style={styles.buttonContainer}
                >
                    <Button
                        style={styles.button}
                        mode="contained"
                        contentStyle={{backgroundColor:globalStyles.colors.blue}}
                    >
                        No
                    </Button>
                    <Button
                        style={styles.button}
                        mode="contained"
                        contentStyle={{backgroundColor:globalStyles.colors.blue}}
                    >
                        Si
                    </Button>
                </View>
            </Modal>
        </Portal>
    )
}

export default ModalFingerPref