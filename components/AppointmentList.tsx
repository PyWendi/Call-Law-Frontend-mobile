import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Appointment } from "@/types/modelsType";
import { useEffect, useState } from "react";
import { CustomJwtPayload } from "@/types/customTokenType";
import { decodedToken } from "@/stores/tokenManagement";
import { useRouter } from "expo-router";
import { format, parseISO, formatDistanceToNow } from "date-fns";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import TagComponent from "./TagComponent";
import ProfileImage from "./ListProfileImage";


interface DataProps {
    data: {
        // elem:Appointment,
        index: number,
        archive: boolean
    },
}


const AppointmentList:React.FC<DataProps> = ({data}) => {
    const elem = (data.archive) ? useSelector((state:RootState) => state.appointments.archivedAppointments[data.index]) : useSelector((state:RootState) => state.appointments.appointments[data.index]) 
    const router = useRouter()
    const [userIsClient, setUserIsClient] = useState(false)

    const formatedDate = elem.date ? format(parseISO(elem.date), 'dd/MM/yyyy HH:mm') : "-- / -- / --"
    const formatCreatedDate = formatDistanceToNow(parseISO(elem.created_at))
    
    async function defineUserIsClient (): Promise<boolean> {
        const tokenData:CustomJwtPayload | null = await decodedToken()
        if(tokenData){
            return (tokenData.isClient) ? true : false
        }else {
            router.navigate("/")
            return false
        }
    }

    async function setuser() {
        setUserIsClient(await defineUserIsClient())
    }

    const handleTouchableOpacityPress = () => {
        router.navigate({
            pathname: (data.archive) ? "/home/appointments/[index]?archive=true" : "/home/appointments/[index]?archive=false",
            params: {index: data.index}
        })
    }
    
    useEffect(() => { 
        setuser()
    }, [elem])

    return (
        <>
            <TouchableOpacity onPress={handleTouchableOpacityPress}>
                <View style={styles.container}>
                    <View style={styles.divider}>
                        <View style={{width: "30%", marginRight: 10}}>
                            {(userIsClient)?
                                <ProfileImage profile_link={elem.lawyer.profile_img} />
                                :   
                                <ProfileImage profile_link={elem.client.profile_img} />
                            }
                        </View>
                        <View style={[styles.info_part]}>
                            {/* Title part */}
                            <View>
                                <Text style={styles.title}>
                                    {elem.title}
                                </Text>
                            </View>

                            {/* Lawyer name */}
                            <View style={styles.person}>
                                <FontAwesome 
                                name="user-o"
                                color={"grey"}
                                size={16}
                                style={{paddingRight: 10}}
                                />
                                <Text style={{fontWeight:"500", color: "#6d6d6d"}}>
                                    {(userIsClient) ? 
                                    (
                                        elem.lawyer.first_name
                                    )
                                    :
                                    (
                                        elem.client.first_name
                                    )
                                }
                                </Text>
                            </View>

                            {/* Speciality */}
                            <View style={styles.person}>
                                <FontAwesome 
                                    name="briefcase"
                                    color={"grey"}
                                    size={16}
                                    style={{paddingRight: 10}}
                                    />
                                <Text style={{fontWeight:"500", color: "#0D6F45"}}>
                                    {elem.speciality.name}
                                </Text>
                            </View>


                            {/* date */}
                            <View style={styles.person}>
                                <FontAwesome 
                                    name="clock-o"
                                    color={"grey"}
                                    size={16}
                                    style={{paddingRight: 10}}
                                    />
                                <Text style={{fontWeight:"500", color: "#0D6F45"}}>
                                    {formatedDate}
                                </Text>
                            </View>

                            {/* Status and date */}
                            <View>
                                <View style={{
                                    width: "100%",
                                    flexDirection: "row",
                                    alignItems:"center",
                                    justifyContent: "space-between"
                                }}>
                                    <View style={{width:"50%"}}>
                                    <TagComponent 
                                    isArchived={elem.isArchived}
                                    isConfirmed={elem.isConfirmed}
                                    isValid={elem.isValid}
                                    />
                                    </View>
                                    <Text style={{color: "#33863a", width: "50%", textAlign: "right"}}>{formatCreatedDate} ago</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                </View>
            </TouchableOpacity>
        
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "90%",
        margin: "auto",
        backgroundColor:"white",
        marginVertical: 7,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 8,
        shadowColor: "#d1d1d1",
        shadowRadius: 10,
        fontFamily: "dm-sans"
    },
    divider: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    info_part: {
        width:"70%",
    },
    title: {
        fontWeight: "700",
        fontSize: 17,
        marginBottom: 5,
        color: "#5d5d5d"
    },
    person: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom:5,
    },
})

export default AppointmentList
