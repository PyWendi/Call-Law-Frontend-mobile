import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { InputItem} from '@ant-design/react-native'

interface InputProps {
    type: string;
    placeholder?: string;
    parentValue: string;
    setParenValue: (value:string) => void;
    label: string;
}

const CustomInput: React.FC<InputProps> = ({type, placeholder, parentValue, label, setParenValue}) => {
    
    return (
        <>
            <View style={styles.container}>
                <Text style={[{
                    paddingStart: 15,
                    fontSize: 17,
                    paddingBottom: 7
                },{
                    fontFamily: "dm-sans",
                    fontWeight: "500",
                    color: "#0D5839" 
                }]}>
                    {label}
                </Text>

                <InputItem
                    clear
                    style={[styles.label_font, styles.input_padding, styles.white_background, styles.full_width]}
                    type={type}
                    value={parentValue}
                    onChange={setParenValue}
                    placeholder={(placeholder) && placeholder}/>
            </View>

        </>
        
    )
}


const styles = StyleSheet.create({
    container: {
        width: "100%",
        flex: 2,
        flexDirection: "column"
    },
    full_width: {
        width: "100%"
    },
    label_font: {
        fontFamily: "dm-sans",
        paddingBottom: 4,
        borderColor: "#108B54",
        borderWidth: 2,
        padding:4,
        height:40,
        borderRadius:4,
        // shadowColor: "#B1AFAF",
        // shadowRadius: 5,
    },
    input_padding: {
        marginBottom: 8
    },
    white_background: {
        backgroundColor: "white"
    }
})

export default CustomInput