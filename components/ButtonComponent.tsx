import { TouchableOpacity, View, StyleSheet, Text  } from 'react-native';
import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { ActivityIndicator } from '@ant-design/react-native';

interface ButtonPropsType {
    text?:string;
    icon?:string; 
    type: "primary" | "primary-low" | "outlined" | "outlined_danger" | "warning" | "search";
    buttonClicked?: () => void;
    loading?: boolean;
    disabled?: boolean
}
const CustomButtonWithIcon:React.FC<ButtonPropsType> = ({text, loading, icon, type, buttonClicked, disabled}) => {

    let buttonType = type;
    
    let content = null;    

    switch (type) {
        case "primary":
            content = (
                <View>
                    <TouchableOpacity style={[styles.primary, styles.max_width]} onPress={() => buttonClicked && buttonClicked()}>
                        <View style={styles.primary}>
                            {(icon) && (<FontAwesome size={28} name={icon} color={"#ffffff"}/>)}
                            {(loading) ? (<ActivityIndicator color={"white"}/>) : (<Text style={styles.text}>{ text }</Text>)}
                        </View>
                    </TouchableOpacity>
                </View>
            )
            break;

        case "search":
            content = (
                <View>
                    <TouchableOpacity style={[styles.primary, styles.max_width]} onPress={() => buttonClicked && buttonClicked()}>
                        <View style={styles.primary}>
                            {(loading) ? (<ActivityIndicator color={"white"}/>) : <FontAwesome size={20} name={icon} color={"#ffffff"}/>}
                        </View>
                    </TouchableOpacity>
                </View>
            )
            break;

        case "outlined":
            content = (
                <View>
                    <TouchableOpacity style={styles.max_width} onPress={() => buttonClicked && buttonClicked()}>
                        <View style={[styles.outlined, styles.max_width]}>
                            {(icon) && (<FontAwesome size={28} name={icon} color={"#108B54"}/>)}
                            {(loading) ? (<ActivityIndicator/>) : (<Text style={styles.text_outlined}>{ text }</Text>)}
                        </View>
                    </TouchableOpacity>
                </View>
            )
            break;
            
        case "outlined_danger":
            content = (!disabled) ?
            (
                <View>
                    <TouchableOpacity style={styles.max_width} onPress={() => buttonClicked && buttonClicked()}>
                        <View style={[styles.outlined_anger, styles.outlined_danger_enable]}>
                            {(icon) && (<FontAwesome size={28} name={icon} color={"#D45F5F"}/>)}
                            {(loading) ? (<ActivityIndicator/>) : (<Text style={styles.text_outlined_danger}>{ text }</Text>)}
                        </View>
                    </TouchableOpacity>
                </View>
            ) : 
            (
                <View>
                    <View style={styles.max_width}>
                        <View style={[styles.outlined_anger, styles.outline_danger_disable]}>
                            {(icon) && (<FontAwesome size={28} name={icon} color={"#D45F5F"}/>)}
                            {(loading) ? (<ActivityIndicator/>) : (<Text style={styles.text_outlined_danger}>{text}</Text>)}
                        </View>
                    </View>
                </View>
            )
            break;
            
        case "warning":
            content = (
                <View>
                    <TouchableOpacity style={[styles.warning, styles.max_width]} onPress={() => buttonClicked && buttonClicked()}>
                        <View style={styles.warning}>
                            {(icon) && (<FontAwesome size={28} name={icon} color={"#ffffff"}/>)}
                            {(loading) ? (<ActivityIndicator/>) : (<Text style={styles.text}>{ text }</Text>)}
                        </View>
                    </TouchableOpacity>
                </View>
            )
            break;

        case "primary-low":
            content = (
                <View>
                    <TouchableOpacity style={[ styles.max_width]} onPress={() => buttonClicked && buttonClicked()}>
                        <View style={styles.primary_low}>
                            {(icon) && (<FontAwesome size={28} name={icon} color={"#ffffff"}/>)}
                            {(loading) ? (<ActivityIndicator/>) : (<Text style={styles.text}>{ text }</Text>)}
                        </View>
                    </TouchableOpacity>
                </View>
            )
            break;
    
        default:
            content = (
                <View>
                    <TouchableOpacity style={[styles.primary, styles.max_width]} onPress={() => buttonClicked && buttonClicked()}>
                        <View style={styles.primary}>
                            {(icon) && (<FontAwesome size={28} name={icon} color={"#ffffff"}/>)}
                            {(loading) ? (<ActivityIndicator/>) : (<Text style={styles.text}>{ text }</Text>)}
                        </View>
                    </TouchableOpacity>
                </View>
            )
            break;
    }

    

    return (
        content
    )
} 

const styles = StyleSheet.create({
    primary: {
        width: "100%",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: '#108B54',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 5,
    },
    outlined: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: '#ffffff',
        borderWidth: 2,
        borderColor: "#108B54",
        alignContent: "center",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 5,
      },
    outlined_anger: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
        borderWidth: 2,
        alignContent: "center",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 5,
    },
    outlined_danger_enable: {
        backgroundColor: '#ffffff',
        borderColor: "#D45F5F",
    },
    outline_danger_disable: {
        borderColor: "#EA9F9F",
        backgroundColor: '#e7e7e7',
    },
    warning: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: '#D45F5F',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 5,
    },
    primary_low: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: '#2281A7',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },

    max_width: {
        width: "100%"
    },
      
    text: {
        paddingHorizontal: 6,
        color: "white",
        fontFamily: "dm-sans"
    },
    text_outlined: {
        color: "#108B54",
        paddingHorizontal: 6,
        fontWeight: '500'
    },
    text_danger: {
        color: "#108B54",
        paddingHorizontal: 6,
        fontWeight: '500'
    },
    text_outlined_danger: {
        color: "#D45F5F",
        paddingHorizontal: 6,
        fontWeight: '500'
    }
});


export default CustomButtonWithIcon