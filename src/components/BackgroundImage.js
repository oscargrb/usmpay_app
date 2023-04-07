import { Dimensions, ImageBackground, StyleSheet, View } from "react-native"

const styles = StyleSheet.create({
    img:{
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        

    }
})

const BackgroundImage = () =>{

    return(
        <View>
            <ImageBackground
                style={styles.img} 
                source={
                    require('../assets/background.png')
                }
                

            />
        </View>
    )
}

export default BackgroundImage