import { View, StyleSheet, Image, TouchableOpacity } from "react-native"
import { Badge } from "@ant-design/react-native"
import { FontAwesome } from "@expo/vector-icons"
import LogoComponent from "../LogoHeaderComponent"
import { useRouter } from "expo-router"
import { logout } from "@/actions/authSystemAction"

import { useSelector } from "react-redux"
import { RootState } from "@/stores/store"
import { decodedToken } from "@/stores/tokenManagement"
import { CustomJwtPayload } from "@/types/customTokenType"
import { useEffect, useState } from "react"
import { fetchClientProfile } from "@/actions/clientAction"
import { fetchSingleLawyer } from "@/actions/LawyerAction"



export default function HeaderComponent () {
    const router = useRouter()

    const notifCounter = useSelector((state:RootState) => state.notifications.seen)
    const [imageSrc, setimageSrc] = useState<string | undefined | ''>('')
    const [token, setToken] = useState<CustomJwtPayload | null>(null)

    const handleLogout = async () => {
        await logout()
        router.replace("/")
    }

    const redirectToNotification = () => {
        router.navigate("home/utils/notification")
    }

    const redirectToProfile = () => {
        if (token) {
            if(token.isClient){
                router.navigate("/home/profile/client/")
            } else {
                router.navigate("/home/profile/lawyer/")
            }
        } else router.replace("/")
    }

    useEffect(() => {
        const fetchProfile = async () => {
            const token = await decodedToken()
            if(token){
                setToken(token)
                let response = null
                if(token.isClient){
                    response = await fetchClientProfile(token.user_id)
                    if(response.res) setimageSrc(response.client?.profile_img || "")
                } else {
                    response = await fetchSingleLawyer(token.user_id)
                    if(response.res) setimageSrc(response.lawyer?.profile_img || "") 
                }
            }
        }

        fetchProfile()
    }, [])

    return (
        <>
            <View style={style.container}>
                <View style={style.divideThree}>

                    {/* NavigationButton */}
                    <View style={{
                        paddingLeft: 20, 
                        paddingVertical:2,
                        display: "flex",
                        alignItems: "flex-start",
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
                        <View style={{
                            paddingRight:15, 
                            backgroundColor: "#f6f6f6", 
                            flexDirection: "row",
                            marginRight:8,
                            justifyContent: "center",
                            padding: 6,
                            alignItems:'center',
                            borderRadius: 50
                        }}>
                            {(notifCounter != 0) ? 
                            (
                                <Badge 
                                text={notifCounter}
                                size={"small"}
                                overflowCount={15}
                                styles={{
                                    dotSizelarge: {
                                        padding: 0,
                                        margin:0
                                    }
                                }}
                                >
                                    <FontAwesome
                                        size={22}
                                        color={"#108B54"}
                                        name="bell" onPress={redirectToNotification} />
                                </Badge>
                            )
                            :
                            (
                                <FontAwesome
                                    size={22}
                                    color={"#108B54"}
                                    name="bell-o" onPress={redirectToNotification} />
                            )}
                        </View>

                        <View style={{ 
                            marginRight: 10,
                            borderRadius: 50,
                            borderWidth: 2,
                            padding: 2,
                            borderColor: "#108B54",
                        }}>                        
                            {(imageSrc) ? 
                            (
                                <TouchableOpacity
                                onPress={redirectToProfile}
                                >
                                    <Image
                                    source={{
                                        uri: imageSrc 
                                    }}
    
                                    style={{
                                        width:25,
                                        height: 25,
                                        borderRadius: 12.5,
                                    }}
                                    />
                                </TouchableOpacity>
                            ) :
                            (
                                <FontAwesome 
                                    size={22}
                                    color={"#108B54"}
                                    name="user-circle-o" onPress={redirectToProfile} />
                            )}
                        </View>

                        <View style={{
                            paddingRight:15, 
                            backgroundColor: "#f6f6f6", 
                            flexDirection: "row",
                            marginRight:8,
                            justifyContent: "center",
                            padding: 4,
                            alignItems:'center',
                            borderRadius: 6
                            }}>
                            <FontAwesome 
                                size={25}
                                color={"#108B54"}
                                name="sign-out" onPress={handleLogout} />
                                {/* // name="bars" onPress={handleLogout} /> */}
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