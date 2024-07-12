import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import HeaderSectionComponent from "@/components/HeaderSectionComponent"
import { FontAwesome } from "@expo/vector-icons"
import { decodedToken } from "@/stores/tokenManagement"
import { CustomJwtPayload } from "@/types/customTokenType"
import { useRouter } from "expo-router"
import { logout } from "@/actions/authSystemAction"


export default function ArchiveScreen() {
    const router = useRouter()

    const handleLogout = async () => {
        await logout()
        router.replace("/")
    }

    const goToProfile = async () => {
        const token: CustomJwtPayload | null = await decodedToken()
        if(token) {
            let route = "/home/profile/"+ ((token.isClient) ? "client" : "lawyer")
            console.log(route)
            router.replace(route)
        }
    }


    return (
        <>
            <View>
                <View style={{marginBottom:20}}>
                    <HeaderSectionComponent 
                    title="Settings"
                    />
                </View>


                {/* Element container */}
                <View>
                    <TouchableOpacity
                    style={[style.button]}
                    onPress={goToProfile}
                    >
                        <View style={{width:"15%"}}>
                            <FontAwesome 
                            name="user-circle-o"
                            color={"grey"}
                            size={35}
                            />
                        </View>
                        <Text style={style.text}>
                            Go to profile
                        </Text>

                    </TouchableOpacity>


                    <TouchableOpacity
                    style={[style.button]}
                    onPress={handleLogout}
                    >
                        <View style={{width:"15%"}}>
                            <FontAwesome 
                            name="sign-out"
                            color={"grey"}
                            size={35}
                            />
                        </View>
                        <Text style={style.text}>
                            Logout
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                    style={[style.button]}
                    onPress={() => console.log("Go to profile")}
                    >
                        <View style={{width:"15%"}}>
                            <FontAwesome 
                            name="angle-double-right"
                            color={"#108B54"}
                            size={35}
                            />
                        </View>
                        <Text style={[style.text, {color: "#108B54"}]}>
                            About us
                        </Text>
                    </TouchableOpacity>

                </View>
            </View>
        </>
    )
}

const style = StyleSheet.create({
    button: {
        width: "90%",
        marginBottom: 20,
        margin: "auto",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 15,
        
        shadowColor: "#d1d1d1",
        shadowRadius: 5,
    },
    text:{
        fontFamily: "dm-sans",
        textTransform: "uppercase",
        fontWeight: "800",
        color: "grey",
        fontSize: 17
    }
})