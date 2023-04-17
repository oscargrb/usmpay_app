import {useState} from "react"
import { View, Dimensions, StyleSheet } from 'react-native';
import { Button, Menu, Divider, Provider, Modal, Drawer, Portal, Text } from 'react-native-paper';
import Loader from "./Loader";


const MenuAcount = (props) => {

  const [loader, setLoader] = useState(false)
  
  const styles = StyleSheet.create({
    container:{
      marginTop:64,
      position:"absolute",
      width: Dimensions.get("screen").width,
      height: Dimensions.get("screen").height,
      backgroundColor:"rgba(0,0,0,.5)"
    },
    menu:{
      position:"absolute",
      backgroundColor:"#fff",
      height:Dimensions.get("screen").height,
      width:100,
      alignItems:"center",
      left:0,
      padding: 5
    },
    items:{
      
    }
  })

  return (
    
      <View
        style={styles.container}
      >
        <Drawer.Section
          style={styles.menu}
        >
          
          <Drawer.CollapsedItem
            style={styles.items}
            focusedIcon="inbox"
            unfocusedIcon="account"
            label="Perfil"
          />
          <Drawer.CollapsedItem
            style={styles.items}
            focusedIcon="inbox"
            unfocusedIcon="inbox-outline"
            label="Inbox"
          />
          <Drawer.CollapsedItem
            style={styles.items}
            focusedIcon="inbox"
            unfocusedIcon="exit-to-app"
            label="Cerrar Sesion"
            onPress={()=> {
              setLoader(true)
              setTimeout(()=>{
                setLoader(false)
                props.nav("Home")
              }, 3000)
            }}
          />
        </Drawer.Section>

        {
          loader?
            <Loader />:
            <></>
        }
      </View>
    
  );
};

export default MenuAcount;