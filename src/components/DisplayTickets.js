import { Card, Text, IconButton } from 'react-native-paper'
import { StyleSheet, View } from 'react-native'
import {useContext} from 'react'
import globalStyles from '../common/globalStyles'
import UserInfoContext from '../context/UserInfoContext'
import ApiService from '../common/ApiService'
import RutasContext from '../context/RutasContext'

const DisplayTickets = props =>{

    const {Rutas} = useContext(RutasContext)
    console.log(Rutas)

    const {userInfo} = useContext(UserInfoContext)

    const styles = StyleSheet.create({
        container:{
            
            padding:15
        },
        CardTitle:{
            fontSize:16,
            color:globalStyles.colors.black,
            textAlign: "center",
            fontWeight: "bold"
        },
        CardContentTickets: {
            color:globalStyles.colors.black,
            textAlign: "center",
            fontSize: 25
        },
        CardContentInfo: {
            color: "#0c0",
            fontWeight:"bold",
            textAlign: "center"
        },
        tipoTicketContainer:{
            flexDirection:"row",
            justifyContent:"center"
        },
        ticketsDisp:{
            margin:10
        },
        card:{
            backgroundColor: globalStyles.colors.white
        }
    })

    return(
        <View
            style= {styles.container}
        >
            <Card
                style={styles.card}
            >
                <Card.Title 
                    title="Saldo Billetera"
                    titleStyle = {styles.CardTitle} 
                />
                <Card.Content
                    style={styles.tipoTicketContainer}
                >
                    
                    <View
                        style={styles.ticketsDisp}
                    >   
                        <Text style={styles.CardContentTickets} >{userInfo.balance} Bs.</Text>
                    </View>
                    <IconButton 
                        icon={"refresh"}
                        iconColor={globalStyles.colors.blue}
                        size={24}
                        style={{
                            alignSelf:"center",
                            margin:-10,
                            padding:0
                        }}
                        onPress={()=> props.nav("Preload")}
                    />
                </Card.Content>
                <Card.Title 
                    title={"Tickets Disponibles"}
                    titleStyle = {styles.CardTitle} 
                />

                <Card.Content
                    style={styles.tipoTicketContainer}
                >
                    {
                        Rutas.map(i=>{
                            return(
                                <View
                                    style={styles.ticketsDisp}
                                    key={Rutas.indexOf(i)}
                                >
                                    <IconButton 
                                        icon={"ticket"}
                                        mode="contained"
                                        containerColor={i.color}
                                        iconColor='#fff'
                                        size={20}
                                        style={{
                                            alignSelf:"center"
                                        }}
                                    />
                                    <Text style={styles.CardContentTickets} >
                                        {
                                            userInfo.tickets.find(j=> j.ruta_id == i.id)?
                                                userInfo.tickets.find(j=> j.ruta_id == i.id).count:
                                                0
                                        }
                                    </Text>
                                    
                                </View>
                            )
                        })
                    }
                    
                </Card.Content>
                
            </Card>
        </View>
    )
}

export default DisplayTickets