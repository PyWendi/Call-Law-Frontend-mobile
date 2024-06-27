import { View, Text, StyleSheet } from "react-native"
import { FontAwesome } from "@expo/vector-icons"
import LogoComponent from "../LogoHeaderComponent"
import { useRouter } from "expo-router"

export default function HeaderComponent () {
    const router = useRouter()

    return (
        <>
            <View style={style.container}>
                <View style={style.divideThree}>

                    {/* NavigationButton */}
                    <View style={{
                        paddingLeft: 20, 
                        paddingVertical:2,
                        display: "flex",
                        alignItems: "start",
                        justifyContent: "center",
                        width:"32%"
                    }}>
                        {(router.canGoBack()) && 
                        (<FontAwesome 
                        size={20}
                        color={"grey"}
                        name="arrow-left" onPress={() => router.back()} />)}    
                    </View>

                    {/* Logo */}
                    <View style={{width:"35%"}}>
                        <LogoComponent/>
                    </View>

                    {/* Profile, notif, menu */}
                    <View style={[style.divideThree, {
                        justifyContent: "center",
                        alignItems: "center",
                        width:"25%"

                    }]}>
                        <View style={{paddingRight:15}}>
                            <FontAwesome 
                                size={22}
                                color={"grey"}
                                name="bell" onPress={() => console.log("nofit pressed")} />
                        </View>

                        <View style={{paddingRight:15}}>
                            <FontAwesome 
                                size={22}
                                color={"grey"}
                                name="user" onPress={() => console.log("Profile pressed")} />
                        </View>

                        <View style={{paddingRight:15}}>
                            <FontAwesome 
                                size={22}
                                color={"grey"}
                                // name="ellipsis-v" onPress={() => router.back()} />
                                name="bars" onPress={() => console.log("Menu pressed")} />
                        </View>
                        
                    </View>
                </View>
            </View>
        </>
    )
}

const style = StyleSheet.create({
    container: {
        paddingVertical:12,
        width: "100%",
        backgroundColor: "white",
        shadowColor: "#e7e7e7",
        shadowOffset:{
            height:2,
            width: 0
        }
    },
    divideThree: {
        flexDirection: "row",
        justifyContent:"space-around"
    }
})