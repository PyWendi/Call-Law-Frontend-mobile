import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";

interface DataProps {
    data: {
        name:string
    },
}

const AppointmentList:React.FC<DataProps> = ({data}) => {

    return (
        <>
            <TouchableOpacity>
                <View style={styles.container}>
                    {data.name}
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
        marginVertical: 10,
        paddingHorizontal: 15,
        paddingVertical: 20,
        borderRadius: 8,
        shadowColor: "#d1d1d1",
        shadowRadius: 20,
    }   
})

export default AppointmentList