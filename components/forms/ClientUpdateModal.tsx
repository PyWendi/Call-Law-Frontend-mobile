import React from "react";
import { View, Text, Image, StyleSheet, ToastAndroid } from "react-native";
import { styles } from "@/styles/mainstyle";
import { Picker, Toast, Modal, Checkbox, List } from "@ant-design/react-native"
import type { PickerValue, PickerValueExtend } from "@ant-design/react-native"
import CustomInputSimple from "../CustomWithoutLineComponent";
import CustomButtonWithIcon from "../ButtonComponent";
import { getRegion } from "@/actions/RegionAction"
import { ClientUpdateFormat, Client, LawyerUpdate, Lawyer } from "@/types/modelsType";
import { ImagePickerSuccessResult } from "expo-image-picker";
import { updateClientProfile, upload_profile_image } from "@/actions/clientAction";
import { updateLawyer } from "@/actions/LawyerAction";
import { useState, useEffect } from "react";
import * as FileSystem from "expo-file-system"
import * as ImagePicker from "expo-image-picker"
import { fetchAllDomain } from "@/actions/domainAction";
import { decodedToken } from "@/stores/tokenManagement";
import { CustomJwtPayload } from "@/types/customTokenType";
// import CheckboxItem from "@ant-design/react-native/lib/checkbox/CheckboxItem";


const CheckboxItem = Checkbox.CheckboxItem

interface SelectFormat {
    label: string;
    value: any;
}

interface PropsFormat {
    client: Client | Lawyer |  null;
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
    const [modal, setModal] = useState(false)
    const [domains, setDomain] = useState<SelectFormat[] | []>([])
    const [domainDataChecked, setDomainDataChecked] = useState<number[]>([])

    const [isClient, setisClient] = useState(false)
    

    const clientSetter = async () => {
        const token: CustomJwtPayload | null = await decodedToken()
        if(token){
            (token.isClient) ? setisClient(true) : setisClient(false)
        }
    }

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

    async function getDomainData () {
        const response = await fetchAllDomain()
        if (response.res) {
            let clientDomains: number[] = []
            let data: SelectFormat[] = []
            response.domains.map((elem) => {
                data.push({
                    label: elem.name,
                    value: elem.id
                })
            })
            
            if(!isClient){
                client.domains.map((elem) => {
                    clientDomains.push(elem.id)
                })
            }
            setDomain(data)
            setDomainDataChecked(clientDomains)
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

        let response = null
        if(isClient){
            let data: ClientUpdateFormat = {
                first_name: first_name,
                last_name: last_name,
                location: location,
                phone: phone,
                region: region
            }
            response = await updateClientProfile(client.id, data)    
        } else {
            let data: LawyerUpdate = {
                first_name: first_name,
                last_name: last_name,
                location: location,
                phone: phone,
                region: region,
                domains: domainDataChecked
            }
            response = await updateLawyer(client.id, data)
        }

        if(response.res){
            if(selectedImage){
                const image_uploaded = await uploadImage()
                if(!image_uploaded) return ;
            }

            Toast.success('Your personal information has been successfully edited.', 2)
            callback()
        } else {
            Toast.fail("An error occured when performing edict action, please retry again and check your connectivity.")
        }
    }    

    useEffect(() => {
        // ToastAndroid.show("Hello world", ToastAndroid.SHORT)
        clientSetter()
        getRegionData()
        getDomainData()
    },[]) 

    return (
        <View>

            <Modal
                style={{
                    width: "75%",
                    position: "absolute",
                    top: 220,
                    left: "12%",
                    backgroundColor: "white",
                    // transform: [
                    //     { translateX: '50%' },
                    //     { translateY: '50%' }
                    // ],
                    borderRadius: 6
                }}
                visible={modal}
                onClose={() => setModal(false)}>
                <View style={{ paddingVertical: 20, paddingHorizontal: 20 }}>
                    <View>
                        <Text style={[styles.color_green, {
                            fontSize: 20,
                            textAlign:"center",
                            paddingBottom: 10
                        }]}>
                            Choose your domains
                        </Text>
                    </View>

                    <View>
                        <List renderHeader="Domain Text">
                            {domains.map(domain => (
                                <CheckboxItem
                                    checked={domainDataChecked.includes(domain.value)}
                                    key={domain.value}
                                    onChange={(event) => {
                                        const isSelected = domainDataChecked.includes(domain.value);
                                        let updatedDomains: any;
                                        if (isSelected) {
                                            // If the domain is already selected, filter it out (remove)
                                            updatedDomains = domainDataChecked.filter((selectedDomain) => selectedDomain!== domain.value);
                                        } else {
                                            // If not selected, add it to the array
                                            updatedDomains = [...domainDataChecked, domain.value];
                                        }
                                        console.log(updatedDomains)
                                        setDomainDataChecked(updatedDomains); // Update state with the new selection array
                                    }}>
                                    {domain.label}
                                </CheckboxItem>
                            ))}
                        </List>
                    </View>

                    <CustomButtonWithIcon 
                    loading={false}
                    text="Close modal"
                    type="warning"
                    buttonClicked={() => setModal(false)}
                    />
                </View>
            </Modal>



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

            {(!isClient) &&(
                <View style={{paddingBottom: 10, width:"90%", margin:"auto"}}>
                    <CustomButtonWithIcon 
                    text={"Select your domains"}
                    type="outlined"
                    buttonClicked={() => setModal(true)}
                    />
                </View>
                )}

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