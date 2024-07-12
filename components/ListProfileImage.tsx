import React from "react";
import { View,Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

interface ProfieData {
    profile_link: string | null
}

const ProfileImage:React.FC<ProfieData> = ({profile_link}) => {

    return (
        <View>
            {
                (profile_link == null) ? (
                <View style={{
                    flex: 1,
                    margin: "auto"
                }}>
                    <FontAwesome 
                    name="user-circle-o"
                    color={"grey"}
                    size={70}
                    style={{paddingRight: 10}}
                    />
                </View>
                ) : (
                    <Image 
                    style={{width:90, height:90, borderRadius: 10}}
                    source={{
                        // uri: "http://127.0.0.1:8000"+profile_link
                        // uri: "http://192.168.43.150:8000"+profile_link
                        uri: "http://172.20.10.3:8000"+profile_link
                    }}
                    />
                ) 
            }
        </View>
    )
}

export default ProfileImage