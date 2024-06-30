import { View, StyleSheet } from "react-native"
import { FontAwesome } from "@expo/vector-icons"
import LogoComponent from "../LogoHeaderComponent"
import { useRouter } from "expo-router"
import { logout } from "@/actions/authSystemAction"


export default function HeaderComponent () {
    const router = useRouter()
    
    const handleLogout = async () => {
        await logout()
        router.replace("/")
    }


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
                        name="chevron-left" onPress={() => router.back()} />)}    
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
                                color={"#108B54"}
                                name="bell-o" onPress={() => console.log("nofit pressed")} />
                        </View>

                        <View style={{paddingRight:15}}>
                            <FontAwesome 
                                size={22}
                                color={"#108B54"}
                                name="user-circle-o" onPress={() => console.log("Profile pressed")} />
                        </View>

                        <View style={{paddingRight:15}}>
                            <FontAwesome 
                                size={22}
                                color={"#108B54"}
                                // name="ellipsis-v" onPress={() => router.back()} />
                                name="bars" onPress={handleLogout} />
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