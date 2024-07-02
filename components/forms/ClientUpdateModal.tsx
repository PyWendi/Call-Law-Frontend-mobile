import React from "react";
import { View, Text, Image, StyleSheet, ToastAndroid } from "react-native";
import { styles } from "@/styles/mainstyle";
import { Picker, Toast } from "@ant-design/react-native"
import type { PickerValue, PickerValueExtend } from "@ant-design/react-native"
import CustomInputSimple from "../CustomWithoutLineComponent";
import CustomButtonWithIcon from "../ButtonComponent";
import { getRegion } from "@/actions/RegionAction"
import { ClientUpdateFormat, Client } from "@/types/modelsType";
import { ImagePickerSuccessResult } from "expo-image-picker";
import { updateClientProfile, upload_profile_image } from "@/actions/clientAction";
import { useState, useEffect } from "react";
import * as FileSystem from "expo-file-system"
import * as ImagePicker from "expo-image-picker"


interface SelectFormat {
    label: string;
    value: any;
}

interface PropsFormat {
    client: Client;
    callback: () => void;
    // callback: (data:ClientUpdateFormat) => void;
}

const ClientUpdateModal: React.FC<PropsFormat> = ({client, callback}) => {

    const [first_name, setFirstName] = useState(client.first_name)
    const [last_name, setLastName] = useState(client.last_name)
    const [phone, setPhone] = useState(client.phone)
    const [location, setLocation] = useState(client.location)
    const [region, setRegion] = useState<any>()
    const [regionDesign, setRegionDesign] = useState(client.region.designation)
    const [regionData, setRegionData] = useState<SelectFormat[] | []>([])
    const [visible, setVisible] = useState(false)
    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState("")
    const [selectedImage, setSelectedImage] = useState<ImagePickerSuccessResult | null>(null)
    

    const openSelect = () => {
        setVisible(true)
    }


     
    const handleRegionChange = (value:any) => {
        const label = regionMap[value]
        if (label){
            setRegionDesign(label)
        }
    }

    const regionMap = regionData.reduce((acc:any, curr:any) => {
        acc[curr.value] = curr.label;
        return acc;
    }, {});
    


    async function getRegionData () {
        const response = await getRegion()
        if (response.res) {
            console.log(response.regions)
            let data: SelectFormat[] = []
            response.regions.map((elem) => [
                data.push({
                    label: elem.designation,
                    value: elem.id
                })
            ])
            console.log(data)
            setRegion(data[0].value)
            setRegionDesign(data[0].label)
            setRegionData(data)
        }
    }

    const pickImageFromGallery = async () => {
        // Ask for persmissions to access the media library
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if(permission.granted){

            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect:[4,3],
                quality: 1,
            }) 

            console.log(result)

            if(!result.canceled){
                setImage(result.assets[0].uri)
                setSelectedImage(result)
            }

        } else {
            Toast.info("Sorry, we need local library permissions to make this work :)")
            return
        }
    }

    const uploadImage = async ():Promise<boolean> => { 
        if(selectedImage) {
            if(selectedImage.assets[0]!= null){
                const fileName = selectedImage.assets[0].fileName;
                if (fileName!== null && fileName!== undefined) {
                    const base64 = await FileSystem.readAsStringAsync(fileName, 
                        {
                            encoding: FileSystem.EncodingType.Base64
                        });
                    const response = await upload_profile_image(
                        client.id, 
                        selectedImage.assets[0].uri,
                        fileName
                    )
                    if(response.res){
                        return true
                    } else {
                        Toast.fail("An error occured when uploading the image, please try again.");
                        return false
                    }
                } else {
                    Toast.fail("File name is null or undefined");
                    return false
                }
            } else {
                Toast.fail("Please select a file")
                return false
            }
        } else {
            // Toast.fail("Please select a file")
            return false
        }
    }

    const handleUpdate = async () => {
        const data:ClientUpdateFormat = {
            first_name: first_name,
            last_name: last_name,
            location: location,
            phone: phone,
            region: region
        }

        const response = await updateClientProfile(client.id, data)
        if(response.res){
            if(selectedImage){
                const image_uploaded = await uploadImage()
                if(!image_uploaded) return ;
            }

            Toast.success('Your profile has been successfully edited.', 2)
            callback()
        } else {
            Toast.fail("An error occured when performing edict action, please retry gain and check your connectivity.")
        }
    }    

    useEffect(() => {
        // ToastAndroid.show("Hello world", ToastAndroid.SHORT)
        getRegionData()
    },[]) 

    return (
        <View>
            <View>
                <Text style={[styles.color_green, {
                    fontSize: 20,
                    textAlign:"center",
                    paddingBottom: 10,
                    fontWeight: "700"
                }]}>
                        Edit Your profile
                </Text>
            </View>

            <View style={[styles.form_ask, {
                paddingBottom: 5,
            }]}>
                <View style={[styles.centered_elem, {width: "100%"}]}>
                    <CustomInputSimple
                    label="First Name" 
                    parentValue={first_name}
                    setParenValue={setFirstName}
                    type="text"
                    placeholder=""
                    />
                </View>

                <View style={[styles.centered_elem, {width: "100%"}]}>
                    <CustomInputSimple 
                    label="Last Name" 
                    parentValue={last_name}
                    setParenValue={setLastName}
                    type={"text"}
                    placeholder=""
                    />
                </View>

            </View>


            <View style={[styles.form_ask]}>

                <View style={[styles.centered_elem, {width: "100%"}]}>
                    <CustomInputSimple 
                    label="Phone number" 
                    parentValue={phone}
                    setParenValue={setPhone}
                    type={"number"}
                    placeholder="+261"
                    />
                </View>

                <View style={[styles.centered_elem, {width: "100%"}]}>
                    <CustomInputSimple
                    label="Your location" 
                    parentValue={location}
                    setParenValue={setLocation}
                    type="text"
                    placeholder=""
                    />
                </View>
            </View>

            <View style={[styles.form_ask, {paddingBottom: 5}]}>
                <Picker
                    locale={
                        {okText: "Validate",
                            dismissText: "Dismiss"
                        }
                    }
                    data={regionData}
                    cols={3}
                    onChange={(n) => {
                        setRegion(n[0])
                        handleRegionChange(n[0])
                        console.log(n)
                    }}
                    onClose={() => {
                        setVisible(false)
                    }}
                    visible={visible}
                    value={region}
                    onOk={(v: PickerValue[], ext: PickerValueExtend) => {
                        console.log(v)
                        // alert("Button clicked: "+v)
                        setRegion(v)
                    }}>
                            <View style={{ padding: 10, width: "97%", margin:'auto' }}>
                            {/* <Button title="Cancel" /> */}
                            <CustomButtonWithIcon 
                            text={"Selected region: "+ regionDesign}
                            type="outlined"
                            buttonClicked={openSelect}
                            />
                        </View>
                </Picker>

            </View>

            <View style={{paddingBottom: 10, width:"90%", margin:"auto"}}>
                <CustomButtonWithIcon
                type="outlined"
                icon="image"
                loading={false}
                text="Upload a profile picture."
                buttonClicked={pickImageFromGallery}
                />
                {(image != "") && <Image source={{ uri: image }} style={style.image} />}
            </View>

            <View style={{marginBottom: 10}}>
                <CustomButtonWithIcon
                type="primary"
                buttonClicked={handleUpdate}
                loading={loading}
                text="Validate operation"
                />
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    image: {
        margin: "auto",
        marginTop: 10,
        borderRadius:5,
        width: 75,
        height: 75,
    },
});


export default ClientUpdateModal