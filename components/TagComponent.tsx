import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface StatusData {
    isConfirmed: boolean;
    isValid: boolean;
    isArchived: boolean;
}

const TagComponent: React.FC<StatusData> = ({isConfirmed, isArchived, isValid}) => {

    
    let pendingData = (
        <Text style={[styles.tag, styles.tag_pending]}>
            Pending
        </Text>
    )

    let confirmedData = (
        <Text style={[styles.tag, styles.tag_confirmed]}>
            Confirmed
        </Text>
    )

    let canceledData = (
        <Text style={[styles.tag, styles.tag_canceled]}>
            Canceled
        </Text>
    )

    let archivedData = (
        <Text style={[styles.tag, styles.tag_archived]}>
            Archived
        </Text>
    )

    let tagContent = null


    if(isArchived){
        tagContent = archivedData
    } else if (!isValid ) {
        tagContent = canceledData
    } else if(isValid){
        if(isConfirmed){
            tagContent = confirmedData
        } else {
            tagContent = pendingData
        }
    }        

    return (
        <>
            {tagContent}
        </>
    )
}


const styles = StyleSheet.create({
    tag: {
        width: "70%",
        fontSize:13,
        paddingHorizontal: 5,
        paddingVertical:4,
        borderWidth: 1,
        textAlign: "center",
        borderRadius:6
    },
    tag_pending: {
        color: "grey",
        borderColor: "grey",
    },
    tag_confirmed: {
        color: "#0D6F45",
        borderColor: "#0D6F45",
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


export default TagComponent