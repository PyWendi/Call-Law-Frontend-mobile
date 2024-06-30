import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface StatusData {
    domainName: string;
}

const DomainTag: React.FC<StatusData> = ({domainName}) => {

    return (
        <>
            <Text style={[styles.tag, styles.tag_archived]}>
                {domainName}
            </Text>
        </>
    )
}


const styles = StyleSheet.create({
    tag: {
        width: "30%",
        fontSize:13,
        paddingHorizontal: 2,
        paddingVertical:4,
        borderWidth: 1,
        textAlign: "center",
        borderRadius:4,
        marginLeft: 8,
        marginBottom: 7
    },
    
    tag_pending: {
        color: "grey",
        borderColor: "grey",
    },
    tag_confirmed: {
        color: "#0D6F45",
        borderColor: "#0D6F45",
        opacity: 0.7
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


export default DomainTag