import { Card, Text, IconButton } from 'react-native-paper'
import { StyleSheet, View } from 'react-native'
import globalStyles from '../common/globalStyles'

const DisplayTickets = props =>{

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
                        <Text style={styles.CardContentTickets} >25,3 Bs.</Text>
                    </View>
                    
                </Card.Content>
                <Card.Title 
                    title="Tickets Disponibles"
                    titleStyle = {styles.CardTitle} 
                />
                <Card.Content
                    style={styles.tipoTicketContainer}
                >
        
                    <View
                        style={styles.ticketsDisp}
                    >
                        <IconButton 
                            icon={"ticket"}
                            mode="contained"
                            containerColor='#b00'
                            iconColor='#fff'
                            size={20}
                            style={{
                                alignSelf:"center"
                            }}
                        />
                        <Text style={styles.CardContentTickets} >1</Text>
                        
                    </View>
                    <View
                        style={styles.ticketsDisp}
                    >   
                        <IconButton
                            containerColor='#0b0'
                            iconColor='#fff'
                            size={20}
                            style={{
                                alignSelf:"center"
                            }} 
                            icon={"ticket"}
                            mode="contained"
                        />
                        <Text style={styles.CardContentTickets} >3</Text>
                        
                    </View>
                    <View
                        style={styles.ticketsDisp}
                    >   
                        <IconButton
                            containerColor='#00b'
                            iconColor='#fff'
                            size={20}
                            style={{
                                alignSelf:"center"
                            }} 
                            icon={"ticket"}
                            mode="contained"
                        />
                        <Text style={styles.CardContentTickets} >0</Text>
                        
                    </View>
                    
                </Card.Content>
            </Card>
        </View>
    )
}

export default DisplayTickets