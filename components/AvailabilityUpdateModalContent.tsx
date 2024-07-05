import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { List, Checkbox } from "@ant-design/react-native";
import { AvailabilityFormat } from "@/types/modelsType";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import { styles } from "@/styles/mainstyle";

interface IndexProps {
    index: number;
    parentValue: AvailabilityFormat;
    setParentvalue: (value:boolean[]) => void;
}

interface SelectFormat {
    label: string;
    value: boolean;
}


const CheckboxItem = Checkbox.CheckboxItem


const AvailabilityUpdateContent:React.FC<IndexProps> = ({index, parentValue, setParentvalue}) => {

    const header = useSelector((state:RootState) => state.availability.header)

    const [data, setData] = useState<SelectFormat[] | []>([])

    function initiateData () {
        let data: SelectFormat[] = []
        let checked:boolean[] = []
        parentValue.map((value, i) => {
            data.push({
                label: header.times[i],
                value: value
            })
            checked.push(value)

        })
        setData(data)
    }

    useEffect(() => {
        initiateData()
    }, [parentValue])

    return (
        <>
            <View>
                <View style={{ paddingVertical: 20, paddingHorizontal: 20 }}>
                    <View>
                        <Text style={[styles.color_green, {
                            fontSize: 20,
                            textAlign:"center",
                            paddingBottom: 10
                        }]}>
                            Choose your plannig for the {header.days[index]}
                        </Text>
                    </View>

                    <View>
                        <List renderHeader="Hours available">
                            {data.map((availability, i) => (
                                <CheckboxItem
                                    checked={(availability.value) ? true : false}
                                    key={i}
                                    onChange={(event) => {
                                        let check = [...data]
                                        const returnValue = [...parentValue]
                                        check[i].value = !check[i].value
                                        returnValue[i] = !!check[i].value

                                        setData([...check])
                                        setParentvalue(returnValue)
                                    }}>
                                    {availability.label}
                                </CheckboxItem>
                            ))}
                        </List>
                    </View>
                </View>
            </View>
        </>
    )
}


export default AvailabilityUpdateContent