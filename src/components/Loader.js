import {ActivityIndicator, Text } from 'react-native-paper'
import {View, StyleSheet, useWindowDimensions, Image} from 'react-native'
import globalStyles from '../common/globalStyles'

const Loader = props =>{

    const {height, width} = useWindowDimensions()

    const styles = StyleSheet.create({
        container:{
            position:'absolute',
            flex:1,
            height: height,
            width: width,
            justifyContent:"center",
            alignItems:"center",
            backgroundColor: globalStyles.colors.blue
        }
    })

    return(
        <View
            style={styles.container}
        >
            <Image 
                source={require('../assets/gif/loader.gif')}
                style={{
                    width:200,
                    height:200
                }}
            />
            {/* <ActivityIndicator animating={true} size={"large"} color={globalStyles.colors.white} /> */}
            <Text
                style={{
                    fontSize:20,
                    fontWeight:"bold",
                    color:globalStyles.colors.white
                }}
            >
                Cargando...
            </Text>
        </View>
    )
}

export default Loader