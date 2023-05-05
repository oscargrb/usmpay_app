import {Appbar} from 'react-native-paper'
import {StyleSheet, View, BackHandler, Alert} from "react-native"
import MenuAcount from "./MenuAcount"
import React from 'react';
import globalStyles from '../common/globalStyles';
import InfoTickets from './InfoTickets';
import UserService from '../common/UserService';

const Header = props =>{

    const [visible, setVisible] = React.useState(false);
    const [infoTicket, setInfoTicker] = React.useState(false)

    React.useEffect(()=>{

        //Manejo del boton atras
        const backAction = ()=>{
          Alert.alert(
              'Espera!',
              'Estas seguro que desea salir?',
              [
                  {
                    text:"Cancelar",
                    onPress: ()=> null
                  },
                  {
                    text: "Aceptar",
                    onPress: async ()=>{
                        const logout = await UserService.logout()
                        setTimeout(()=>{
                            if(logout.ok){
                                
                                props.nav("Home")
                            }else{
                                
                                Alert.alert('Error: No se puede cerrar sesion')
                            }
                        }, 2000)
                    }
                      
                  }
              ]
          )
    
          return true
        }
    
        const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction)
    
        return ()=> backHandler.remove()
    }, [])

    const openMenu = () => setVisible(true);

    const closeMenu = () => setVisible(false);

    const openInfoTicket = ()=> setInfoTicker(true)
    const closeInfoTicket = ()=> setInfoTicker(false)

    const styles = StyleSheet.create({
        container: {
            top: 0
        },
        headerImage: {
            width: 50,
            height: 50,
            borderWidth: 2,
            borderColor: "red"
        },
        appbar: {
            backgroundColor: globalStyles.colors.blue
        },
        appbarText:{
            color: globalStyles.colors.white,
            fontWeight: "bold",
            fontStyle:"italic"            
        } 
    })
    
    return(
        <View 
            style={styles.container}
        >
            
            <Appbar.Header
                mode="center-aligned"
                style = {styles.appbar}
            >   
                <Appbar.Action 
                    color='white' 
                    icon="information"
                      
                    onPress={()=> infoTicket? closeInfoTicket(): openInfoTicket()}
                />
                <Appbar.Content
                    titleStyle={styles.appbarText} 
                    title = "USMPAY"
                />
                <Appbar.Action color='white' icon="menu"  
                    onPress={()=> visible? closeMenu(): openMenu()}
                />
            
            </Appbar.Header>
            {
                visible?
                    <MenuAcount nav={props.nav} closeMenu={closeMenu} />:
                    <></>
            }
            {
                infoTicket?
                    <InfoTickets closeInfoTicket={closeInfoTicket} />:
                    <></>
            }
        </View>
    )
}

export default Header