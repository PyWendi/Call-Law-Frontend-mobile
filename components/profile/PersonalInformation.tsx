import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import DomainTag from "../DomainTag";
import ListDomainTag from "../ListDomainTag";
import { Domain } from "@/types/modelsType";
import CustomButtonWithIcon from "../ButtonComponent";
import { useRouter } from "expo-router";
import { CustomJwtPayload } from "@/types/customTokenType";
import { decodedToken } from "@/stores/tokenManagement";


interface PersonalInformationProps {
    data: {
        email: string,
        phone: string,
        location: string,
        region: string,
        domains: Domain[] | [] ,
        id: number
    };
    trigger: () => void; 

}


const PersonalInformation:React.FC<PersonalInformationProps> = ({data, trigger}) => {

    const router = useRouter()
    // let isClient = false

    const setClient = async () => {
        const decodedData: CustomJwtPayload | null = await decodedToken()
        if(decodedData){
            if(decodedData.isClient) {
                return true
            } else {
                false
            }
        } else {
            return false
        }
    }


    const redirectToHome = async () => {
        const decodedData: CustomJwtPayload | null = await decodedToken()
        if(decodedData){
            if(decodedData.isClient) {
                router.replace("/home/client/")
            } else {
                router.replace("/home/lawyer/")
            }
        } else {
            router.replace("/")
        }
    }

    return (
        <>
            {/* General information */}
            <View style={[styles.infomration_container, styles.elevate]}>
                <View>
                    {/* SectionTitle */}
                    <Text style={styles.section_title}>
                        Personal information
                    </Text>

                    {/* Information Email */}
                    <View style={styles.data_section}>
                        {/* Icon and title */}
                        <View style={styles.text_icon}>
                            <FontAwesome
                            style={styles.pr}
                            name={"envelope"}
                            size={18}
                            color={"#0D6F45"}
                            />

                            <Text style={[styles.data_title, styles.customFont]}>
                                Email address
                            </Text>
                        </View>
                        {/* Value */}
                        <View>
                            <Text style={styles.data}>
                                {data.email}
                            </Text>
                        </View>
                    </View>

                    {/* Information Phone */}
                    <View style={styles.data_section}>
                        {/* Icon and title */}
                        <View style={styles.text_icon}>
                            <FontAwesome
                            style={styles.pr}
                            name={"phone"}
                            size={18}
                            color={"#0D6F45"}
                            />

                            <Text style={[styles.data_title, styles.customFont]}>
                                Contact
                            </Text>
                        </View>
                        {/* Value */}
                        <View>
                            <Text style={styles.data}>
                                {data.phone}
                            </Text>
                        </View>
                    </View>

                    {/* Information location */}
                    <View style={styles.data_section}>
                        {/* Icon and title */}
                        <View style={styles.text_icon}>
                            <FontAwesome
                            style={styles.pr}
                            name={"map-marker"}
                            size={18}
                            color={"#0D6F45"}
                            />

                            <Text style={[styles.data_title, styles.customFont]}>
                                Location
                            </Text>
                        </View>
                        {/* Value */}
                        <View>
                            <Text style={styles.data}>
                                {data.location}
                            </Text>
                        </View>
                    </View>

                    {/* Information region */}
                    <View style={styles.data_section}>
                        {/* Icon and title */}
                        <View style={styles.text_icon}>
                            <FontAwesome
                            style={styles.pr}
                            name={"map"}
                            size={18}
                            color={"#0D6F45"}
                            />

                            <Text style={[styles.data_title, styles.customFont]}>
                                Region
                            </Text>
                        </View>
                        {/* Value */}
                        <View>
                            <Text style={styles.data}>
                                {data.region}
                            </Text>
                        </View>
                    </View>


                    {/* Information Domains */}
                    <View style={styles.data_section}>
                        {/* Icon and title */}
                        <View style={styles.text_icon}>
                            <FontAwesome
                            style={styles.pr}
                            name={"briefcase"}
                            size={18}
                            color={"#0D6F45"}
                            />

                            <Text style={[styles.data_title, styles.customFont]}>
                                Domains
                            </Text>
                        </View>
                    </View>

                    <View style={{width: "100%"}}>
                        <ListDomainTag 
                        domains={data.domains}
                        />
                    </View>

                    {/* {
                        ()
                    } */}
                    <View style={{marginTop: 10}}>
                        <View style={{paddingBottom: 10}}>
                            <CustomButtonWithIcon 
                            type="outlined"
                            icon="edit"
                            loading={false}
                            text="Edit your information"
                            buttonClicked={() => trigger()}
                            />
                        </View>

                        {/* <CustomButtonWithIcon 
                        type="primary"
                        // icon="home"
                        buttonClicked={redirectToHome}
                        text="Go back home"
                        /> */}
                    </View>

                </View>
            </View>    
        </>
    )
}

const styles = StyleSheet.create({
    header_container:{
        paddingHorizontal:10,
        paddingVertical:20,
        width: "100%",
        marginBottom:10,
        // backgroundColor: "#1DAC69",
        // borderBottomLeftRadius: 10,
        // borderBottomRightRadius: 10,
    },
    
    
    card_container:{
        flexDirection: "row",
        justifyContent: "space-between",     
        alignItems: "center",
        backgroundColor: "white",
        paddingVertical: 15,
        borderRadius:10
    },

    infomration_container:{
        paddingHorizontal:20,
        paddingVertical:20,
        backgroundColor: "white",
        width: "95%",
        margin:"auto",
        marginBottom:20,
        borderRadius: 10
    },

    section_title:{
        fontFamily: "dm-sans",
        fontSize: 20,
        color: "#0D6F45",
        fontWeight: "800",
        borderBottomWidth: 2,
        borderColor: "#0D6F45",
        borderStyle: "solid",
        paddingBottom: 5,
        marginBottom: 20

    },

    data_section:{
        marginBottom: 5
    },

    text_icon:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    data_title: {
        fontSize: 16,
        fontWeight: "600",
        color: "#0D6F45"
        // color: "#0D6F45"
    },

    data:{
        fontFamily: "dm-sans",
        paddingTop: 5,
        paddingLeft: 25,
        fontWeight: "500",
        fontSize:14,
        color:"#6d6d6d"
    },

    pr:{
        paddingRight: 10,
    },

    information_card_container:{
        backgroundColor: 'white',

    },

    action_container:{

    },

    person: {
        flexDirection: "row",
        alignItems: "center",
        alignContent: "center",
        marginLeft: 10 
    },

    title: {
        width: "90%",
        fontSize: 19,
        marginBottom: 5,
        letterSpacing: 2,
        textTransform: "uppercase",
        color: "#4d4d4d",
        // color: "#0D6F45"  ,
        // color: "white",
    },
    customFont:{
        fontFamily: "dm-sans"
    },
    elevate:{
        shadowColor: "#d4d4d4",
        shadowRadius: 10,
    }
})


export default PersonalInformation
