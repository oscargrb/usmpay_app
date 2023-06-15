import {View, Image, Text, StyleSheet} from 'react-native'
import { TextInput, IconButton, Divider } from 'react-native-paper'
import globalStyles from '../common/globalStyles'
import Header from '../components/Header'
import {useContext} from 'react'
import UserInfoContext from '../context/UserInfoContext'

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center"
    },
    infoTitle:{
        alignItems:"center",
        padding:20,
        color: globalStyles.colors.black
    },
    title:{
        textAlign:"center",
        fontSize:20,
        color: globalStyles.colors.black,
        fontWeight:"bold"
    },  
    infoContainer:{
        backgroundColor: globalStyles.colors.blue,
        flex:1,
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        padding:20
    },
    content:{
        color:globalStyles.colors.white,
        fontSize:16
    },
    infoItemContainer:{
        margin:10
    }
})

const ProfileScreen = props =>{

    const {userInfo} = useContext(UserInfoContext)

    return(
        <View
            style={styles.container}
        >
            
            <View>
                <IconButton 
                    icon={"keyboard-backspace"}
                    iconColor={globalStyles.colors.black}
                    onPress={()=> props.navigation.goBack()}
                />
            </View>
            <View
                style={styles.infoTitle}
            >
                <IconButton 
                    icon="account"
                    mode="contained"
                    size={100}
                    iconColor={globalStyles.colors.white}
                    containerColor={globalStyles.colors.black}
                />
            </View>
            <View
                style={styles.infoTitle}
            >
                <Text
                    style={styles.title}
                >
                    Información del perfil
                </Text>
            </View>
            <View
                style={styles.infoContainer}
            >
                <View 
                    style={styles.infoItemContainer}
                >
                    <Text
                        style={styles.content}
                    >
                        Número de Documento:
                    </Text>
                    <Text
                        style={styles.content}
                    >
                        {userInfo.document}
                    </Text>
                </View>
                <Divider 
                    style={{
                        backgroundColor:globalStyles.colors.white
                    }}
                />
                <View
                    style={styles.infoItemContainer}
                >
                    <Text
                        style={styles.content}
                    >
                        Email:
                    </Text>
                    <Text
                        style={styles.content}
                    >
                        {userInfo.correo}
                    </Text>
                </View>
                <Divider 
                    style={{
                        backgroundColor:globalStyles.colors.white
                    }}
                />
                <View
                    style={styles.infoItemContainer}
                >
                    <Text
                        style={styles.content}
                    >
                        Teléfono:
                    </Text>
                    <Text
                        style={styles.content}
                    >
                        {userInfo.telefono}
                    </Text>
                </View>
                <Divider 
                    style={{
                        backgroundColor:globalStyles.colors.white
                    }}
                />
                <View
                    style={styles.infoItemContainer}
                >
                    <Text
                        style={styles.content}
                    >
                        Rol:
                    </Text>
                    <Text
                        style={styles.content}
                    >
                        {
                            userInfo.rol == 2001?
                                "Usuario":
                                "Lector"
                        }
                    </Text>
                </View>
            </View> 
        </View>
    )
}

export default ProfileScreen