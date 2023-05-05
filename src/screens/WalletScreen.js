import { View  } from "react-native"
import { Provider } from "react-native-paper"
import Header from "../components/Header"
import AddToWallet from "../components/AddToWallet"

const WalletScreen = props =>{

    const nav = screen =>{
        props.navigation.navigate(screen)
    }

    return(
        <Provider>
            <View>
                <View
                    style={{
                        elevation: 1,
                        zIndex: 1
                    }}
                >
                    <AddToWallet nav={nav} />
                </View>
                
            </View>
        </Provider>
    )
}

export default WalletScreen