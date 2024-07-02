import React from "react";
import { View,Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

interface ProfieData {
    profile_link: string | null
}

const UserProfileImage:React.FC<ProfieData> = ({profile_link}) => {

    return (
        <View>
            {
                (profile_link == null) ? (
                <View style={{
                    flex: 1,
                    margin: "auto"
                }}>
                    <View style={{
                        // paddingRight: 10, 
                        backgroundColor: "white", 
                        borderRadius: 10,
                        margin: "auto",
                        padding:10
                    }}>
                        <FontAwesome 
                        name="user-circle"
                        color={"grey"}
                        size={90}
                        />
                    </View>
                </View>
                ) : (
                    <Image 
                    style={{width:110, height:110, borderRadius: 10}}
                    source={{
                        uri: profile_link
                    }}
                    />
                ) 
            }
        </View>
    )
}

export default UserProfileImage