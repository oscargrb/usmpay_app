import {ActivityIndicator, Text } from 'react-native-paper'
import {View, StyleSheet, Dimensions} from 'react-native'

const Loader = props =>{

    const styles = StyleSheet.create({
        container:{
            position:'absolute',
            height: Dimensions.get("screen").height,
            width: Dimensions.get("screen").width,
            justifyContent:"center",
            alignItems:"center",
            backgroundColor: "#55c"
        }
    })

    return(
        <View
            style={styles.container}
        >
            <ActivityIndicator animating={true} size={"large"} color={"#fff"} />
            <Text
                style={{
                    fontSize:20,
                    fontWeight:"bold",
                    color:"#fff"
                }}
            >
                Cargando...
            </Text>
        </View>
    )
}

export default Loader