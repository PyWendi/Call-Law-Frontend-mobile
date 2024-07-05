import React, {useState, useEffect} from "react";
import { View, Text, Accordion, List } from "@ant-design/react-native";
import { ScrollView, StyleSheet } from "react-native";
import { update_availability } from "@/actions/LawyerAction";


interface AvailabilityData {
    days: string[];
    times: string[];
    data: [
        boolean[],
        boolean[],
        boolean[],
        boolean[],
        boolean[],
    ]
}

const AvailabilityComponent:React.FC = () => {

    const [active, setActive] = useState<number[]>([])
    const [availability, setAvailability] = useState<AvailabilityData>({
        days: ["Monday", "Tuesday", "Wendesday", "Thursday", "Friday"],
        times: ['7-8 AM', '8-9 AM', '9-10 AM', '10-11 AM', '11-12 AM', "1-2 PM", "2-3 PM", "3-4 PM", "4-5 PM", "5-6 PM"],
        data: [
            [true, true, true, true, true, false, true, true, true, false],
            [false, false, false, false, false, false, false, false, false, false,],
            [false, false, false, false, false, false, false, false, false, false,],
            [false, false, false, false, false, false, false, false, false, false,],
            [false, false, false, false, false, false, false, false, false, false,]
        ]
    })
    // const time = ["7-8 AM", "8-9 AM", "9-10 AM", "10-11 AM", "11-12 AM", "1-2 PM", "2-3 PM", "3-4 PM", "4-5 PM", "5-6 PM"]

    // let availability : {
    //     days: ["Monday", "Tuesday", "Wendesday", "Thursday", "Friday"],
    //     times: ['7-8 AM', '8-9 AM', '9-10 AM', '10-11 AM', '11-12 AM', "1-2 PM", "2-3 PM", "3-4 PM", "4-5 PM", "5-6 PM"],
    //     data: [
    //         [false, false, false, false, false, false, false, false, false, false],
    //         [false, false, false, false, false, false, false, false, false, false,],
    //         [false, false, false, false, false, false, false, false, false, false,],
    //         [false, false, false, false, false, false, false, false, false, false,],
    //         [false, false, false, false, false, false, false, false, false, false,]
    //     ]
    // }

    const updateAvailability = async () => {
        let body = JSON.stringify(availability)
        const response = await update_availability({availability: body})
        if(response.res){
            console.log(response.availability)
        } else {
            console.log("Error when updating the availabilites")
        }
    }

    useEffect(() => {
        // updateAvailability()
        // setAvailability()
    }, [])

    return (
        <>
            <View>
                <ScrollView style={{height: (350)}}>
                    <View>
                        <Accordion
                            activeSections={active}
                            onChange={(e: number[]) => setActive(e)}
                            style={{
                                overflow: "hidden",
                                width: "80%",
                            }}
                        >

                        {availability.days.map((elem: string, index:number) => (
                            <Accordion.Panel
                            key={index+''}
                                header={elem}>
                                <List style={styles.list} key={index}>
                                    {availability.times.map((time, i) => (
                                        <List.Item key={i}>
                                            <View style={styles.time_container}>
                                                <Text  style={[styles.time]}>
                                                    {time}
                                                </Text>
                                                <Text style={[
                                                    (availability.data[index][i]) ? styles.time_valid : styles.time_invalid,
                                                    styles.time]}>
                                                        {(availability.data[index][i]) ? "Available" : "Not available"}
                                                </Text>
                                            </View>
                                        </List.Item>
                                    ))}
                                </List>
                            </Accordion.Panel>
                        ))}

{/* 
                                    <List.Item>
                                        <View style={styles.time_container}>
                                            <Text  style={[styles.time]}>
                                                7-8pm 
                                            </Text>
                                            <Text style={[styles.time ,styles.time_invalid]}>Not Available</Text>
                                        </View>
                                    </List.Item> */}
                                    
                            
                            {/* </Accordion.Panel> */}


                            {/* <Accordion.Panel 
                            header="Tuesday">
                                this is panel content2 or other
                            </Accordion.Panel>
                            <Accordion.Panel 
                            header="Wednesday">
                                Text text text text text text text text text text text text text
                                text text
                            </Accordion.Panel>
                            <Accordion.Panel 
                            header="Thursday">
                                Text text text text text text text text text text text text text
                                text text
                            </Accordion.Panel>
                            <Accordion.Panel 
                            header="Friday">
                                Text text text text text text text text text text text text text
                                text text
                            </Accordion.Panel> */}
                        </Accordion>
                    </View>
                </ScrollView>
            </View>
        </>
    )
}


const styles = StyleSheet.create({
    time_container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    list:{
        overflow: 'hidden',
        width: "100%"
    },
    time:{
        fontFamily: "dm-sans",
        fontSize: 12,
    },
    time_valid:{
        color: "#108B54",
        textTransform: "uppercase"
    }, 
    time_invalid: {
        color:"#A03535",
        textTransform: "uppercase"
        
        
    }
})

export default AvailabilityComponent