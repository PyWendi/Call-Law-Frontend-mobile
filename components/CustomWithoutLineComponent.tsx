import React from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
// import { InputItem} from '@ant-design/react-native'

import Input from "@ant-design/react-native/lib/input-item/Input"

interface InputProps {
    type: string;
    placeholder?: string;
    parentValue: string;
    setParenValue: (value:string) => void;
    label: string;
}

const CustomInputSimple: React.FC<InputProps> = ({type, placeholder, parentValue, label, setParenValue}) => {
    
    return (
        <>
            <View style={styles.container}>
                <Text style={[{
                    fontSize: 17,
                    paddingBottom: 7
                },{
                    fontFamily: "dm-sans",
                    fontWeight: "500",
                    color: "#0D5839" 
                }]}>
                    {label}
                </Text>

                {/* Check if type is 'password' and render a secure TextInput */}
                {type === 'password'? (
                    <TextInput
                        style={[styles.label_font, styles.input_padding, styles.white_background, styles.full_width]}
                        secureTextEntry={true}
                        value={parentValue}
                        onChangeText={setParenValue}
                        placeholder={placeholder}
                    />
                ) : (
                    <Input
                    style={[styles.label_font, styles.input_padding, styles.white_background, styles.full_width]}
                    type={type}
                    value={parentValue}
                    onChangeText={setParenValue}
                    placeholder={(placeholder) && placeholder}/>
                )}

            </View>

        </>
        
    )
}


const styles = StyleSheet.create({
    container: {
        width: "90%",
        flex: 2,
        margin: "auto",
        flexDirection: "column",
        justifyContent:"center",
        alignItems: "flex-start"
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

export default CustomInputSimple