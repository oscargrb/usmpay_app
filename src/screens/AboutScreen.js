import {Button, Text, View} from "react-native"
import React from "react"

const AboutScreen = props =>{

    return(
        <View>
            <Text>
                About
            </Text>

            <Button 
                title="Home"
                onPress={()=> props.navigation.goBack()}
            />
        </View>
    )
}

export default AboutScreen