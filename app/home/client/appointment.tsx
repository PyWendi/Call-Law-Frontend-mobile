import { View } from "react-native";
import { StyleSheet, ScrollView, Dimensions } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import CustomButton from "../../../components/ButtonComponent"
import Input from "@ant-design/react-native/lib/input-item/Input";
import React, { useState } from 'react';
import { Tabs } from "@ant-design/react-native";
import AppointmentList from "@/components/AppointmentList";
import { useEffect } from "react";
import { getAppointmentsForClient, archiveAppointment, searchAppointmentsForClient } from "@/actions/appointmentAction";
import { setAppointment } from "@/slices/appointmentSlice";
import { AppDispatch, RootState } from "@/stores/store";
import NoResultFound from "@/components/NoResultFound";
import LoadingAppointment from "@/components/LoadingData";


export default function ClientAppointments() {
    const windowHeight = Dimensions.get('window').height;
    const arr = [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]
    const dispatch = useDispatch<AppDispatch>()
    const appointments = useSelector((state:RootState) => state.appointments.allAppoitment)
    const appointmentsCount = useSelector((state:RootState) => state.appointments.appointments).length 
 
    const [searchValue, setSearchvalue] = useState("")
    const [loading, setLoading] = useState(false)
    const status = [
        {title: "All"},
        {title: "Pending"},
        {title: "Confirmed"},
        {title: "Canceled"},
        // {title: "Archived"}
    ]
    
    const handleSearch = () => {

        if(searchValue === "") {
            fetchAllAppointments()
        } else {
            searchAppointments(searchValue)
        }
    }

    const fetchAllAppointments = async () => {
        setLoading(true)
        const response = await getAppointmentsForClient()
        if(response.res) {
            dispatch(setAppointment(response.appointments))
        } else {
            dispatch(setAppointment([]))
        }
        setLoading(false)
    }

    const searchAppointments = async (search:string) => {
        setLoading(true)
        const response = await searchAppointmentsForClient(search)
        if(response.res) {
            dispatch(setAppointment(response.appointments))
        } else {
            dispatch(setAppointment([]))
        }
        setLoading(false) 
    }


    useEffect(() => {
        fetchAllAppointments()
    }, [])

    return (
        <>
            <View style={[styles.container]}>
                
                {/* Search bar */}
                <View style={styles.search_bar_container}>
                    <Input
                        style={[styles.label_font, styles.input_padding, styles.white_background, styles.full_width, {opacity:0.5}]}
                        type={"text"}
                        value={searchValue}
                        onChangeText={setSearchvalue}
                        placeholder={"Search an appointment by it's title..."}/>

                        <CustomButton icon={"search"} type="search" loading={loading} buttonClicked={handleSearch} />
                </View>

                <View style={{width: "100%", height:2, backgroundColor: "#d1d1d1", marginBottom: 10}} />
                {/* Appointment list */}
                <View>
                    <Tabs 
                    tabBarActiveTextColor="#108B54"
                    tabBarTextStyle={{fontFamily: "dm-sans", fontWeight: "500"}}
                    tabs={status}>
                        
                        <View style={{marginBottom: 20, 
                        }}>
                            <ScrollView style={{height: (windowHeight-310)}}>
                                <View>
                                    {(loading) ? (
                                        <LoadingAppointment />
                                    ) : 
                                    (appointmentsCount === 0) ? (
                                        <NoResultFound text={"No appointment found..."} />
                                    ) : 
                                        appointments.map((elem, index) =>  <AppointmentList key={elem.id} data={
                                            {elem: elem, index:index}
                                        }/>)
                                    
                                }
                                </View>
                            </ScrollView>
                        </View>

                        <View style={{marginBottom: 20}}>
                            <ScrollView style={{height: (windowHeight-310)}}>
                                <View>
                                {(loading) ? (
                                        <LoadingAppointment />
                                    ) : 
                                    (appointmentsCount === 0) ? (
                                        <NoResultFound text={"No appointment found..."} />
                                    ) : 
                                        appointments.map((elem, index) => (!elem.isConfirmed && elem.isValid) && (<AppointmentList key={index} data={
                                            {elem: elem, index:index}
                                    }/>) )
                                }
                                </View>
                            </ScrollView>
                        </View> 

                        <View style={{marginBottom: 20}}>
                            <ScrollView style={{height: (windowHeight-310)}}>
                                <View>
                                {(loading) ? (
                                        <LoadingAppointment />
                                    ) : 
                                    (appointmentsCount === 0) ? (
                                        <NoResultFound text={"No appointment found..."} />
                                    ) : 
                                        appointments.map((elem, index) => (elem.isConfirmed) && (<AppointmentList key={index} data={
                                            {elem: elem, index:index}
                                        }/>) )
                                    
                                }
                                </View>
                            </ScrollView>
                        </View>

                        <View style={{marginBottom: 20}}>
                            <ScrollView style={{height: (windowHeight-310)}}>
                                <View>
                                {(loading) ? (
                                        <LoadingAppointment />
                                    ) : 
                                    (appointmentsCount === 0) ? (
                                        <NoResultFound text={"No appointment found..."} />
                                    ) : 
                                        appointments.map((elem, index) => (!elem.isValid) && (<AppointmentList key={index} data={
                                            {elem: elem, index:index}
                                    }/>) )
                                }
                                {/* {arr.map((elem, index) => (
                                    <LoadingAppointment key={index}/>
                                ))} */}
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
        marginBottom: 10,
        backgroundColor: "white",
        padding: 10,
        borderRadius: 6,
        shadowColor: "#d1d1d1",
        shadowRadius: 10,
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