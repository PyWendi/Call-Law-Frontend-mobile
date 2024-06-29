import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Appointment } from "@/types/modelsType";
import { useEffect, useState } from "react";
import { CustomJwtPayload } from "@/types/customTokenType";
import { decodedToken } from "@/stores/tokenManagement";
import { useRouter } from "expo-router";
import { parseISO, format, formatDistanceToNow } from "date-fns";


interface DataProps {
    data: {
        elem:Appointment,
        index: number
    },
}


const AppointmentList:React.FC<DataProps> = ({data}) => {
    
    const router = useRouter()
    const [userIsClient, setUserIsClient] = useState(false)


    let pendingData = (
        <Text style={[styles.tag, styles.tag_pending]}>
            Pending
        </Text>
    )

    let confirmedData = (
        <Text style={[styles.tag, styles.tag_confirmed]}>
            Confirmed
        </Text>
    )

    let canceledData = (
        <Text style={[styles.tag, styles.tag_canceled]}>
            Canceled
        </Text>
    )

    let archivedData = (
        <Text style={[styles.tag, styles.tag_archived]}>
            Archived
        </Text>
    )

    const formatedDate = format(parseISO(data.elem.date), 'dd/MM/yyyy HH:mm')
    const formatCreatedDate = formatDistanceToNow(parseISO(data.elem.created_at))

    let tagContent = null

    if(data.elem.isArchived){
        tagContent = archivedData
        console.log("archiveData")
    } else if (!data.elem.isValid ) {
        tagContent = canceledData
        console.log("cancelData")
    } else if(data.elem.isValid){
        if(data.elem.isConfirmed){
            tagContent = confirmedData
            console.log("confirmedData")
        } else {
            tagContent = pendingData
            console.log("pendingData")
        }
    }        


    
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
    
    useEffect(() => {
        setuser()

        console.log(userIsClient)
        console.log(data.elem)
    }, [data.elem])

    return (
        <>
            <TouchableOpacity>
                <View style={styles.container}>
                    <View style={styles.divider}>
                        <View style={{width: "30%"}}>
                            {(userIsClient)? 
                                (data.elem.lawyer.profile_img == null) ? (
                                    <View style={{
                                        flex: 1,
                                        margin: "auto"
                                    }}>
                                        <FontAwesome 
                                        name="user-circle-o"
                                        color={"grey"}
                                        size={70}
                                        style={{paddingRight: 10}}
                                        />
                                    </View>
                                ) : (
                                    <Image 
                                    style={{width:90, height:90, borderRadius: 10}}
                                    source={{
                                        // uri: "http://127.0.0.1:78000"+data.elem.lawyer.profile_img
                                        uri: "http://127.0.0.1:8000"+data.elem.lawyer.profile_img
                                    }} />
                                ) 
                                :   
                                (data.elem.client.profile_img == null) ? (
                                    <View style={{
                                        flex: 1,
                                        margin: "auto"
                                    }}>
                                        <FontAwesome 
                                        name="user-circle-o"
                                        color={"grey"}
                                        size={70}
                                        style={{paddingRight: 10}}
                                        />
                                    </View>
                                ) : (
                                    <Image 
                                        style={{width:90, height:90, borderRadius: 10}}
                                        source={{
                                            uri: "http://127.0.0.1:8000"+data.elem.client.profile_img
                                        }} />
                                )
                            }
                            
                        </View>
                        <View style={[styles.info_part]}>
                            {/* Title part */}
                            <View>
                                <Text style={styles.title}>
                                    {data.elem.title}
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
                                        data.elem.lawyer.first_name
                                    )
                                    :
                                    (
                                        data.elem.client.first_name
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
                                    {data.elem.speciality.name}
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
                                    {(data.elem.date != null) ? 
                                    formatedDate
                                    :
                                    ("-- / -- / --")
                                    }
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
                                        {(tagContent)}
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
        shadowRadius: 20,
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
    tag: {
        width: "70%",
        fontSize:13,
        paddingHorizontal: 5,
        paddingVertical:4,
        borderWidth: 1,
        textAlign: "center",
        borderRadius:6
    },
    tag_pending: {
        color: "grey",
        borderColor: "grey",
    },
    tag_confirmed: {
        color: "#0D6F45",
        borderColor: "#0D6F45",
    },
    tag_canceled: {
        color: "#A03535",
        borderColor: "#A03535",
    },
    tag_archived: {
        color: "#1D6787",
        borderColor: "#1D6787",
    }
})

export default AppointmentList