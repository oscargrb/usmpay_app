import {Appbar} from 'react-native-paper'
import {StyleSheet, View} from "react-native"
import MenuAcount from "./MenuAcount"
import React from 'react';
import globalStyles from '../common/globalStyles';

const Header = props =>{

    const [visible, setVisible] = React.useState(false);

    const openMenu = () => setVisible(true);

    const closeMenu = () => setVisible(false);

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
                    <MenuAcount nav={props.nav}/>:
                    <></>
            }
        </View>
    )
}

export default Header