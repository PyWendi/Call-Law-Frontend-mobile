import React, { useState } from "react";
import { View, Text, List, Accordion, Tabs } from "@ant-design/react-native";
import { ScrollView, Dimensions } from "react-native";
import AvailabilityComponent from "./AvailabilityComponent";
import ExperienceComponent from "./ExperienceComponent";
import { Lawyer } from "@/types/modelsType";

interface LawyerProps {
    id: number;
    isVisitor: boolean
}

const ProfesionalInformation:React.FC<LawyerProps> = ({id, isVisitor}) => {

    // const windowHeight = Dimensions.get('window').height;

    const status = [
        {title: "Availabilities"},
        {title: "Experiences"},
        // {title: "Noticies"},
    ]


    return (
        <>
            <View style={{height: 400, width: "100%", overflow: "hidden"}}>
                <Tabs 
                    tabBarActiveTextColor="#108B54"
                    tabBarTextStyle={{
                        fontFamily: "dm-sans", 
                        fontWeight: "500", 
                        fontSize: 16,
                    }}
                    tabs={status}>
                        
                        <View style={{marginBottom: 20,
                        }}>
                            <AvailabilityComponent lawyer_id={id} isVisitor={isVisitor}/>
                        </View>

                        <View style={{marginBottom: 20}}>
                            <ScrollView style={{height: 350, paddingHorizontal: 5, width: "90%"}}>
                                <ExperienceComponent id={id} isVisitor={isVisitor} />
                            </ScrollView>
                        </View> 

                        {/* <View style={{marginBottom: 20}}>
                            <ScrollView style={{height: (400)}}>
                                <View>
                                    <Text>
                                        Inside noticies
                                    </Text>
                                </View>
                            </ScrollView>
                        </View> */}
                        
                    </Tabs>
            </View>
        </>
    )
}


export default ProfesionalInformation