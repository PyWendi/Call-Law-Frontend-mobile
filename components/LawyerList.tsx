import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { MassLawyerFormat } from "@/types/modelsType";
import { useRouter } from "expo-router";
import ProfileImage from "./ListProfileImage";
import DomainTag from "./DomainTag";


interface DataProps {
    data: {
        lawyers:MassLawyerFormat,
        index: number,
    },
}


const LawyerList:React.FC<DataProps> = ({data}) => {
    
    const router = useRouter()

    const handleTouchableOpacityPress = () => {
        router.navigate({
            pathname: "/home/profile/[id]",
            params: {id: data.index} 
        })
    }

    return (
        <>
            <TouchableOpacity onPress={handleTouchableOpacityPress}>
                <View style={styles.container}>
                    <View style={styles.divider}>

                        {/* Profile */}
                        <View style={{width: "30%", marginRight: 10}}>
                            {/* <ProfileImage profile_link={data.elem.lawyer.profile_img} /> */}
                            <ProfileImage profile_link={data.lawyers.profile_img} />
                        </View>
                        
                        {/* Name and last name */}
                        <View style={[styles.info_part]}>

                            {/* Lawyer name */}
                            <View style={styles.person}>
                                <Text style={[{fontWeight:"500", color: "#6d6d6d"}, styles.title]}>
                                    {data.lawyers.first_name}
                                </Text>
                            </View>

                            {/* Lawyer name */}
                            <View style={styles.person}>
                                <Text style={[{fontWeight:"500", color: "#6d6d6d", marginBottom:5}]}>
                                    {data.lawyers.last_name}
                                </Text>
                            </View>

                            <View style={styles.person}>
                                <FontAwesome 
                                    name="map-marker"
                                    color={"grey"}
                                    size={16}
                                    style={{paddingRight: 10}}
                                    />
                                <Text style={{fontWeight:"500", color: "#0D6F45"}}>
                                    {(data.lawyers.location != null)? data.lawyers.location : "Location not provided..."}
                                </Text>
                            </View>

                            <View style={styles.person}>
                                <FontAwesome 
                                    name="phone"
                                    color={"grey"}
                                    size={16}
                                    style={{paddingRight: 7}}
                                    />
                                <Text style={{fontWeight:"500", color: "#0D6F45"}}>
                                    {(data.lawyers.phone != null) ? data.lawyers.phone : "Contact not provided..."}
                                </Text>
                            </View>
                        </View>
                    </View>


                    {/* Speciality */}
                    <View >
                        <View style={{
                            flexDirection:"row",
                            width:"100%",
                            justifyContent: "flex-start",
                            alignContent: "stretch",
                            // alignItems: "center",
                            flexWrap: "wrap"
                        }}>
                            {(data.lawyers.domains.length != 0)?
                            
                                data.lawyers.domains.map((domain, index) => (
                                    <DomainTag key={index} domainName={domain.name} />
                                )
                            )
                            : 
                            (
                                <Text style={{
                                    color: "grey",

                                }}>
                                    No domain associate to this lawyer
                                </Text>
                            )
                        }
                        </View>
                    </View>

                </View>
            </TouchableOpacity>
        
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "95%",
        margin: "auto",
        backgroundColor:"white",
        marginVertical: 7,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 8,
        shadowColor: "#d1d1d1",
        shadowRadius: 5,
        fontFamily: "dm-sans"
    },
    divider: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom:15
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
    },
})

export default LawyerList