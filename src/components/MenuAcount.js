import {useState, useEffect} from "react"
import { View, Dimensions, StyleSheet, Pressable, Alert, BackHandler } from 'react-native';
import { Button, Menu, Divider, Provider, Modal, Drawer, Portal, Text, IconButton } from 'react-native-paper';
import Loader from "./Loader";
import nxu from "../context/Nxu";
import globalStyles from "../common/globalStyles";
import ApiService from "../common/ApiService";
import UserService from "../common/UserService";

const MenuAcount = (props) => {

  const [loader, setLoader] = useState(false)

  

  const logout =  async ()=>{

    const logout = await UserService.logout()

    setTimeout(()=>{
      if(logout.ok){
        setLoader(false)
        props.nav("Home")
      }else{
        setLoader(false)
        Alert.alert('Error: No se puede cerrar sesion')
      }
    }, 2000)
  }
  
  const styles = StyleSheet.create({
    container:{
      marginTop:64,
      position:"absolute",
      width: Dimensions.get("screen").width,
      height: Dimensions.get("screen").height,
      backgroundColor:"rgba(0,0,0,.5)"
    },
    menu:{
      backgroundColor:globalStyles.colors.white,
      width:Dimensions.get("screen").width / 2.5,
      height:Dimensions.get('screen').height
    },
    items:{
      /* backgroundColor:globalStyles.colors.blue, */
      margin:5,
      alignItems:"flex-start"
    },
    menutitle:{
      textAlign:"center",
      margin:20,
      fontWeight:"bold",
      color: globalStyles.colors.black
    }
  })

  return (
      <Pressable
        style={styles.container}
        onPress={()=> props.closeMenu()}
      >

        <View style={styles.menu}>
          <Text style={styles.menutitle}>MENU</Text>
          <Button 
            icon={"account"}
            
            style={styles.items}
            mode="text"
            iconColor={globalStyles.colors.blue}
            textColor={globalStyles.colors.blue}
            onPress={()=> {
              props.closeMenu()
              props.nav('Profile', {})
            }}
          >
            Perfil
          </Button>

          <Button 
            icon={"mail"}
            
            style={styles.items}
            mode="text"
            iconColor={globalStyles.colors.blue}
            textColor={globalStyles.colors.blue}
          >
            Notificaciones
          </Button>

          <Button 
            icon={"exit-to-app"}
            onPress={logout}
            style={styles.items}
            mode="text"
            iconColor={globalStyles.colors.blue}
            textColor={globalStyles.colors.blue}
          >
            Cerrar Sesion
          </Button>
        </View>

        {
          loader?
            <Loader />:
            <></>
        }
      
      </Pressable>
  );
};

export default MenuAcount;