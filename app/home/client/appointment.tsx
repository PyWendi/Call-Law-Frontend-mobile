import { useRouter } from "expo-router";
import { View, Text } from "react-native";
import { StyleSheet, ScrollView, Dimensions } from "react-native";
import { Region } from "@/types/modelsType";
import { useSelector } from "react-redux";
import CustomButton from "../../../components/ButtonComponent"
import Input from "@ant-design/react-native/lib/input-item/Input";
import React, { useState } from 'react';
import { Tabs } from "@ant-design/react-native";
import AppointmentList from "@/components/AppointmentList";

export default function ClientAppointments() {
    const arr = [2,2,2,2,2,2,2,2,2,2,2,22,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]
    const windowHeight = Dimensions.get('window').height;
    const router = useRouter()
    const [searchValue, setSearchvalue] = useState("")
    const [loading, setLoading] = useState(false)
    const status = [
        {title: "All"},
        {title: "Confirmed"},
        {title: "Canceled",}
    ]
    
    const handleSearch = () => {
        setLoading(true)
        console.log(windowHeight)
        console.log(searchValue)
        setTimeout(() => {
            setLoading(false)
        }, 4000)
    }


    return (
        <>
        <View style={[styles.container]}>
            
            {/* Search bar */}
            <View style={styles.search_bar_container}>
                <Input
                    style={[styles.label_font, styles.input_padding, styles.white_background, styles.full_width]}
                    type={"text"}
                    value={searchValue}
                    onChangeText={setSearchvalue}
                    placeholder={"Search an appointment by it's title..."}/>

                    <CustomButton icon={"search"} type="search" loading={loading} buttonClicked={handleSearch} />
            </View>

            <View style={{width: "100%", height:2, backgroundColor: "#d1d1d1", marginBottom: 20}} />
            {/* Appointment list */}
            <View>
                <Tabs 
                tabBarActiveTextColor="#108B54"
                style={{
                    // height: 500
                }}
                tabBarTextStyle={{fontFamily: "dm-sans", fontWeight: "500"}}
                tabs={status}>
                    
                    <View style={{marginBottom: 20, 
                        // height: (windowHeight-450)
                    }}>
                        <ScrollView style={{height: (windowHeight-310)}}>
                            <View>
                                {arr.map((elem, index) =>  <AppointmentList key={index} data={{name: "Test component"+index}}/>)}
                            </View>
                        </ScrollView>
                    </View>
                    <View style={{marginBottom: 20}}>
                        <ScrollView style={{height: (windowHeight-310)}}>
                            <View>
                                {arr.map((elem, index) =>  <AppointmentList key={index} data={{name: "Test component"+index}}/>)}
                            </View>
                        </ScrollView>
                    </View>
                    <View style={{marginBottom: 20}}>
                        <ScrollView style={{height: (windowHeight-310)}}>
                            <View>
                                {arr.map((elem, index) =>  <AppointmentList key={index} data={{name: "Test component"+index}}/>)}
                            </View>
                        </ScrollView>
                    </View> 
                </Tabs>
                {/* Apppointment list */}
            </View>
            
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        paddingHorizontal: 10,
        flex: 1,
        height: 10
    },
    search_bar_container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10,
        marginBottom: 20,
        backgroundColor: "white",
        padding: 10,
        borderRadius: 6,
        shadowColor: "#d1d1d1",
        shadowRadius: 20,
    },
    full_width: {
        width: "80%"
    },
    label_font: {
        fontFamily: "dm-sans",
        paddingBottom: 4,
        fontWeight: "500",
        borderColor: "#108B54",
        borderWidth: 2,
        padding:5,
        height:44,
        borderRadius:4,
        // shadowColor: "#B1AFAF",
        // shadowRadius: 5,
    },
    input_padding: {
        marginBottom: 0
    },
    white_background: {
        backgroundColor: "white"
    }
})