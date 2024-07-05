import React, {useState, useEffect} from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Tag, Modal, Toast } from "@ant-design/react-native";
import { getExperiences } from "@/actions/experienceAction";
import { Experience } from "@/types/modelsType";
import { decodedToken } from "@/stores/tokenManagement";
import { CustomJwtPayload } from "@/types/customTokenType"
import AddExperience from "../forms/AddExperienceContent";
import CustomButtonWithIcon from "../ButtonComponent";
import { FontAwesome } from "@expo/vector-icons";

interface PropsFormat {
    id: number;
}

const ExperienceComponent: React.FC<PropsFormat> = ({id}) => {

    const [experiences, setExperiences] = useState<Experience[] | []>([])
    const [loading, setLoading] = useState(false)
    const [addModal, setAddModal] = useState(false)

    const fetchExperience = async () => {
        // console.log(id) 
        const response = await getExperiences(id)
        if(response.res){
            console.log("SUCCESS WHEN FETCHING EXPERIENCES")
            console.log(response.experiences)
            setExperiences(response.experiences)
        } else console.log("FAILED TO LOAD EXPERIENCES")
    }

    const handleAddExperience = async (data: boolean) => {
        if(data){
            Toast.success("Operation successfull.", 1)
            await fetchExperience()
            setAddModal(false)
        } else {
            Toast.fail("Error when perfroming the operation, Please check your network and try again.", 2)
        }
    }


    useEffect(() => {
        fetchExperience()
    }, [])

    return (
        <>
            {/* Modal to add experience */}
            <View>
                <Modal 
                visible={addModal}
                style={{
                    width: "75%",
                    position: "absolute",
                    // top: "100%",
                    top: 140,
                    left: "12%",
                    borderRadius: 6,
                    backgroundColor: "white"
                }}
                >

                    <View style={{ paddingVertical: 20, paddingHorizontal: 15 }}>
                        
                        <AddExperience callback={(data) => handleAddExperience(data)} />

                        <CustomButtonWithIcon 
                        loading={false}
                        text="Close modal"
                        type="outlined_danger"
                        buttonClicked={() => setAddModal(false)}
                        />
                    </View>


                </Modal>
            </View>


            <View>

                {(experiences.length != 0) ? 
                experiences.map((experience, i) => 
                (
                    <View key={i} style={styles.expe_container}>
                        
                        {/* title */}
                        <View style={styles.data_section}>
                            {/* Icon and title */}
                            <View style={styles.text_icon}>
                                <Text style={[styles.data_title, styles.customFont]}>
                                    Title :
                                </Text>
                            </View>
                            {/* Value */}
                            <View>
                            <Text style={[styles.data, styles.time]}>
                                    {experience.title}
                                </Text>
                            </View>
                        </View>

                        {/* description */}
                        <View style={styles.data_section}>
                            {/* Icon and title */}
                            <View style={styles.text_icon}>
                                <Text style={[styles.data_title, styles.customFont]}>
                                    Description
                                </Text>
                            </View>
                            {/* Value */}
                            <View>
                                <Text style={[styles.data, styles.time]}>
                                    {experience.description}
                                </Text>
                            </View>
                        </View>

                         {/* description */}
                         <View style={styles.data_section}>
                            {/* Icon and title */}
                            <View style={styles.text_icon}>
                                <Text style={[styles.data_title, styles.customFont]}>
                                    Domain
                                </Text>
                            </View>
                            {/* Value */}
                            <View>
                                <Text style={[styles.data, styles.time, {textTransform: "uppercase"}]}>
                                    {experience.domain.name}
                                </Text>
                            </View>
                        </View>

                        {/* specialities */}
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
                                    Specialities :
                                </Text>
                            </View> 
                                <View>
                                    <Text style={[styles.data, styles.time]}>
                                    {(experience.specialities.length != null) ? 
                                    experience.specialities.map((speciality, index) =>
                                    (
                                        <Tag 
                                        key={index}
                                        selected 
                                        style={{marginHorizontal: 2, marginBottom: 10}}
                                        >{speciality.name}</Tag>
                                    )) :
                                    (
                                        <View>
                                            <Text style={styles.not_mentionned}>
                                                Specialities not mentionned...
                                            </Text>
                                        </View>
                                    )}
                                    </Text>
                                </View>
                            
                        </View>

                        {/* dates */}
                        <View style={styles.data_section}>
                            {/* Icon and title */}
                            <View style={styles.text_icon}>

                                <Text style={[styles.data_title, styles.customFont]}>
                                    Dates :
                                </Text>
                            </View>
                            {/* Value */}
                            <View>
                                <Text style={[styles.data, styles.time, styles.dates]}>
                                    {experience.date_beg} - {(experience.date_end != null) ? experience.date_end : "Now"}
                                        {/* 17 Aoug 2024 - 20 Nov 2024 */}
                                </Text>
                            </View>
                        </View>

                    </View>
                )) : 
                (
                    <View>
                        <Text>
                            Hello world
                        </Text>
                    </View>
                )}
                

                <View style={styles.expe_container}>
                    
                    {/* title */}
                    <View style={styles.data_section}>
                        {/* Icon and title */}
                        <View style={styles.text_icon}>
                            <Text style={[styles.data_title, styles.customFont]}>
                                Title :
                            </Text>
                        </View>
                        {/* Value */}
                        <View>
                        <Text style={[styles.data, styles.time]}>
                                Simple experience title
                            </Text>
                        </View>
                    </View>

                    {/* description */}
                    <View style={styles.data_section}>
                        {/* Icon and title */}
                        <View style={styles.text_icon}>
                            <Text style={[styles.data_title, styles.customFont]}>
                                Description
                            </Text>
                        </View>
                        {/* Value */}
                        <View>
                            <Text style={[styles.data, styles.time]}>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio vitae expedita velit nam obcaecati, reiciendis 
                                explicabo fugiat ullam soluta voluptates ab. Aspernatur amet laudantium inventore fugiat minus tenetur recusandae tempore!
                            </Text>
                        </View>
                    </View>

                    {/* specialities */}
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
                                Specialities :
                            </Text>
                        </View>
                        {/* Value */}
                        <View>
                            <Text style={[styles.data, styles.time]}>
                                <Tag 
                                selected 
                                style={{marginHorizontal: 2, marginBottom:10}}
                                >Droit penal</Tag>
                                <Tag 
                                selected 
                                style={{marginHorizontal: 2, marginBottom:10}}>Droit civile</Tag>
                                <Tag 
                                selected 
                                style={{marginHorizontal: 2, marginBottom:10}}>Droit des affaires</Tag>
                            </Text>
                        </View> 
                    </View>

                    {/* dates */}
                    <View style={styles.data_section}>
                        {/* Icon and title */}
                        <View style={styles.text_icon}>
                            {/* <FontAwesome
                            style={styles.pr}
                            name={"envelope"}
                            size={18}
                            color={"#0D6F45"}
                            /> */}

                            <Text style={[styles.data_title, styles.customFont]}>
                                Dates :
                            </Text>
                        </View>
                        {/* Value */}
                        <View>
                            <Text style={[styles.data, styles.time, styles.dates]}>
                                    17 Aoug 2024 - 20 Nov 2024
                            </Text>
                        </View>
                    </View>

                </View>

                <View style={{marginTop: 20, width: "95%"}}>
                    <CustomButtonWithIcon 
                    type="outlined"
                    text="Add an experience "
                    icon="plus"
                    loading={loading}
                    buttonClicked={() => setAddModal(true)}
                    />
                </View>

            </View>
        </>
    )
}


const styles = StyleSheet.create({
    expe_container: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#0D6F45",
        borderStyle: "dashed",
        width: "95%"
    },
    time:{
        fontFamily: "dm-sans",
        fontSize: 12,
    },
    dates:{
        borderRadius: 5,
        textAlign: "center",
        backgroundColor: "#d4d4d4",
        width: "60%",
        paddingBottom: 3
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
        fontSize: 14,
        fontWeight: "600",
        color: "#0D6F45"
        // color: "#0D6F45"
    },
    data:{
        fontFamily: "dm-sans",
        paddingTop: 5,
        fontWeight: "500",
        color:"#6d6d6d"
    },
    pr:{
        paddingRight: 10,
    },
    customFont:{
        fontFamily: "dm-sans"
    },
    not_mentionned:{
        fontSize:15,
        color: "black",
        opacity: 0.3
    }
})

export default ExperienceComponent;