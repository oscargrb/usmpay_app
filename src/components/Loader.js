import {ActivityIndicator, Text } from 'react-native-paper'
import {View, StyleSheet, useWindowDimensions} from 'react-native'
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
            <ActivityIndicator animating={true} size={"large"} color={globalStyles.colors.white} />
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