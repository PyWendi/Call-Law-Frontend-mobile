import { View } from "react-native";
import { StyleSheet, ScrollView, Dimensions } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import CustomButton from "../../../components/ButtonComponent"
import Input from "@ant-design/react-native/lib/input-item/Input";
import React, { useState } from 'react';
import LawyerList from "@/components/LawyerList";
import { useEffect } from "react";
import { fetchAllLawyer, searchLawyerByFirstName } from "@/actions/LawyerAction";
import { setLawyers } from "@/slices/lawyerSlice";
import { AppDispatch, RootState } from "@/stores/store";
import NoResultFound from "@/components/NoResultFound";
import LoadingAppointment from "@/components/LoadingData";


export default function ClientSearch() {
    const windowHeight = Dimensions.get('window').height;
    const arr = [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]
    const dispatch = useDispatch<AppDispatch>()
    const lawyers = useSelector((state:RootState) => state.lawyers.lawyers)
 
    const [searchValue, setSearchvalue] = useState("")
    const [loading, setLoading] = useState(false)
    
    const handleSearch = () => {

        if(searchValue === "") {
            fetchAllLawyerList()
        } else {
            searchLawyer(searchValue)
        }
    }

    const fetchAllLawyerList = async () => {
        setLoading(true)
        const response = await fetchAllLawyer()
        if(response.res) {
            dispatch(setLawyers(response.lawyers))
        } else {
            dispatch(setLawyers([]))
        }
        setLoading(false)
    }

    const searchLawyer = async (search:string) => {
        setLoading(true)
        const response = await searchLawyerByFirstName(search)
        if(response.res) {
            // console.log(res)
            dispatch(setLawyers(response.lawyers))
        } else {
            dispatch(setLawyers([]))
        }
        setLoading(false)
    }


    useEffect(() => {
        fetchAllLawyerList()
    }, [])

    return (
        <>
            <View style={[styles.container]}>
                
                {/* Search bar */}
                <View style={styles.search_bar_container}>
                    <Input
                        style={[styles.label_font, styles.input_padding, styles.white_background, styles.full_width, {opacity: 0.5}]}
                        type={"text"}
                        value={searchValue}
                        onChangeText={setSearchvalue}
                        placeholder={"Search a lawyer by it's name..."}/>

                    <CustomButton icon={"search"} type="search" loading={loading} buttonClicked={handleSearch} />
                </View>

                <View style={{width: "100%", height:2, backgroundColor: "#d1d1d1", marginBottom: 10}} />
                {/* Appointment list */}
                <View>
                        
                    <View style={{marginBottom: 20, 
                    }}>
                        <ScrollView style={{height: (windowHeight-220)}}>
                            <View>
                                {(loading) ? (
                                    <LoadingAppointment />
                                ) : 
                                (lawyers.length === 0) ? (
                                    <NoResultFound text={"No lawyers found..."} />
                                ) : 
                                    lawyers.map((elem, index) =>  
                                    <LawyerList key={elem.id} data={
                                        {lawyers: elem, index:index}
                                    }/>
                                )
                            }
                            </View>
                        </ScrollView>
                    </View>
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