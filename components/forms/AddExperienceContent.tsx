import React, {useEffect, useState} from "react";
import { Picker, Modal, List, Checkbox, DatePicker } from "@ant-design/react-native";
import { View, Text, ScrollView } from "react-native";
import { styles } from "@/styles/mainstyle";
import { CustomJwtPayload } from "@/types/customTokenType";
import { decodedToken } from "@/stores/tokenManagement";
import CustomInputSimple from "../CustomWithoutLineComponent";
import CustomButtonWithIcon from "../ButtonComponent";
import { fetchAllDomain } from "@/actions/domainAction";
import type { PickerValue, PickerValueExtend } from "@ant-design/react-native"
import { fetchSpeciality } from "@/actions/specialityAction";
import { createExperience } from "@/actions/experienceAction";
// import DatePicker from "react-native-date-picker";

interface AddExperienceProps {
    callback: (data:boolean) => void
}

interface SelectFormat {
    label: string;
    value: any;
}


const CheckboxItem = Checkbox.CheckboxItem

const AddExperience:React.FC<AddExperienceProps> = ({callback}) => {
    const [title, setTitle] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    
    const [domain, setDomain] = useState<any>()
    const [domainDesign, setDomainDesign] = useState("")
    const [domainData, setDomainData] = useState<SelectFormat[] | []>([])
    
    const [specialities, setSpecialities] = useState<SelectFormat[] | []>([])
    const [specialitiesDataChecked, setSpecialitiesDataChecked] = useState([])

    const [loading, setLoading] = useState(false)
    const [visible, setVisible] = useState(false)
    const [modal, setModal] = useState(false)
    
    const [date, setDate] = useState(new Date());
    const [end_date, setEndDate] = useState(null);
    const [show, setShow] = useState(false);
    const [showEnd, setShowEnd] = useState(false);


    const domainMap = domainData.reduce((acc:any, curr:any) => {
        acc[curr.value] = curr.label;
        return acc;
    }, {});
    
    const handleDomainChange = (value:any) => {
        const label = domainMap[value]
        if (label){
            setDomainDesign(label)
        }
    }


    async function getDomainData () {
        const response = await fetchAllDomain()
        if (response.res) {
            console.log(response.domains)
            let data: SelectFormat[] = []
            response.domains.map((elem) => [
                data.push({
                    label: elem.name,
                    value: elem.id
                })
            ])
            console.log(data)
            setDomain(data[0].value)
            setDomainDesign(data[0].label)
            setDomainData(data)
        }
    }

    async function getSpecialitiesData () {
        const response = await fetchSpeciality()
        if (response.res) {
            console.log(response.specialities)
            let data: SelectFormat[] = []
            response.specialities.map((elem) => [
                data.push({
                    label: elem.name,
                    value: elem.id
                })
            ])
            setSpecialities(data)
        }
    }

    function formatDate(inputDateString:string) {
        // Step 1: Parse the input date string into a Date object
        const date = new Date(inputDateString);
      
        // Step 2: Extract the year, month, and day components
        const year = date.getFullYear();
        let month = date.getMonth() + 1; // Months are zero-based in JavaScript
        let day = date.getDate();
      
        // Ensure month and day are always two digits
        month = month < 10 ? '0' + month : month;
        day = day < 10 ? '0' + day : day;
      
        // Step 3: Format the components into the desired format
        return `${year}-${month}-${day}`;
      }

    const validate = async () => {
        setLoading(true)
        let data = {
            title: title,
            description: description,
            domain: domain,
            specialities: specialitiesDataChecked,
            date_beg: formatDate(date.toLocaleDateString()),
            date_end: (end_date != null) ? formatDate(end_date.toLocaleDateString()) : null,
        }

        // console.log(data)
        const response = await createExperience(data)
        if(response.res){
            callback(true)
            setLoading(false)
        } else {
            callback(false)
        }
        setLoading(false)
    }

    useEffect(() => {
        // callback(true)
        getDomainData()
        getSpecialitiesData()
    }, [])

    return (
        <>
            <View>

                <View>
                    <Text style={[styles.color_green, {
                        fontSize: 20,
                        textAlign:"center",
                        paddingBottom: 10,
                        fontWeight: "700"
                    }]}>
                            Profesional experience
                    </Text>
                </View>

                <View style={[styles.form_ask, {
                    paddingBottom: 5,
                }]}>
                    <View style={[styles.centered_elem, {width: "100%"}]}>
                        <CustomInputSimple
                        label="Title" 
                        parentValue={title}
                        setParenValue={setTitle}
                        type="text"
                        placeholder=""
                        />
                    </View>

                    <View style={[styles.centered_elem, {width: "100%"}]}>
                        <CustomInputSimple 
                        label="Description" 
                        parentValue={description}
                        setParenValue={setDescription}
                        type={"text"}
                        placeholder=""
                        />
                    </View>

                </View>

                {/* Select domain */}
                <View style={[styles.form_ask]}>

                    <Picker
                    style={{marginBottom:10}}
                    locale={
                        {okText: "Validate",
                            dismissText: "Dismiss"
                        }
                    }
                    data={domainData}
                    cols={3}
                    onChange={(n) => {
                        setDomain(n[0])
                        handleDomainChange(n[0])
                        console.log(n)
                    }}
                    onClose={() => {
                        setVisible(false)
                    }}
                    visible={visible}
                    value={domain}
                    onOk={(v: PickerValue[], ext: PickerValueExtend) => {
                        console.log(v)
                        // alert("Button clicked: "+v)
                        setDomain(v)
                    }}>
                            <View style={{ padding: 5, width: "95%", margin:'auto' }}>
                            {/* <Button title="Cancel" /> */}
                            <CustomButtonWithIcon 
                            text={"Selected domain: "+ domainDesign}
                            type="outlined"
                            buttonClicked={() => setVisible(true)}
                            />
                        </View>
                    </Picker>
                </View>

                <View style={{ padding: 10, width: "98%", margin:'auto' }}>
                    <CustomButtonWithIcon 
                    text={"Select Specialities"}
                    type="outlined"
                    buttonClicked={() => setModal(true)}
                    />
                </View>

                {/* Speciality modal */}
                <Modal
                    style={{
                        width: "75%",
                        position: "absolute",
                        top: 140,
                        left: "12%",
                        backgroundColor: "white",
                        borderRadius: 6
                    }}
                    visible={modal}
                    onClose={() => setModal(false)}>
                    <View style={{ paddingVertical: 20, paddingHorizontal: 10 }}>
                        <View>
                            <Text style={[styles.color_green, {
                                fontSize: 20,
                                textAlign:"center",
                                paddingBottom: 10
                            }]}>
                                Choose specialities
                            </Text>
                        </View>

                        <View>
                            <ScrollView style={{height: 500}} >
                                <List renderHeader="Specialities">
                                    {specialities.map(speciality => (
                                        <CheckboxItem
                                            key={speciality.value}
                                            onChange={(event) => {
                                                const isSelected = specialitiesDataChecked.includes(speciality.value);
                                                let updatedSpeciality: any;
                                                if (isSelected) {
                                                    // If the domain is already selected, filter it out (remove)
                                                    updatedSpeciality = specialitiesDataChecked.filter((selectedSpeciality) => selectedSpeciality!== speciality.value);
                                                } else {
                                                    // If not selected, add it to the array
                                                    updatedSpeciality = [...specialitiesDataChecked, speciality.value];
                                                }
                                                console.log(updatedSpeciality)
                                                setSpecialitiesDataChecked(updatedSpeciality); // Update state with the new selection array
                                            }}>
                                            {speciality.label}
                                        </CheckboxItem>
                                    ))}
                                </List>
                            </ScrollView>
                        </View>

                        <CustomButtonWithIcon 
                        loading={false}
                        text="Close modal"
                        type="warning"
                        buttonClicked={() => setModal(false)}
                        />
                    </View>
                </Modal>

                <View style={{
                    paddingBottom: 10,
                        width: "91%",
                        margin: "auto"
                    }}>
                     <List>
                        <DatePicker
                            locale={{
                                okText: "Validate",
                                dismissText: "Dismiss",
                                DatePickerLocale: {
                                    year: "",
                                    minute: "minute",
                                    month: "",
                                    am: "am",
                                    day: "",
                                    hour: "",
                                    pm: ""

                                }
                            }}
                            value={date}
                            mode="date"
                            defaultDate={new Date()}
                            minDate={new Date(2015, 7, 6)}
                            maxDate={new Date(2054, 11, 3)}
                            onChange={setDate}
                            format="YYYY-MM-DD">
                            <List.Item 
                            style={{
                                borderRadius: 5,
                                borderWidth: 2,
                                borderColor: "#108B54",
                            }}
                            arrow="horizontal">Begining date</List.Item>
                        </DatePicker>
                    </List>
                    {/* <CustomButtonWithIcon 
                    type="outlined"
                    buttonClicked={() => setShow(true)}
                    // icon="clock-o"
                    text="Date of begining"
                    /> */}

                    {/* <DatePicker
                        modal
                        style={{marginVertical: 10}}
                        open={show}
                        date={date}
                        onConfirm={(date:any) => {
                            setShow(false)
                            setDate(date)
                            console.log(date)
                        }}
                        onCancel={() => {
                            setShow(false)
                        }}
                    /> */}
                </View>

                <View>
                    <Text style={{paddingHorizontal: 15, fontSize: 12, opacity: 0.5}}>Do not select ending date if it's not finished yet.</Text>
                </View>
                <View style={{
                    paddingBottom: 15,
                        width: "91%",
                        margin: "auto"
                    }}>
                     <List>
                        <DatePicker
                            locale={{
                                okText: "Validate",
                                dismissText: "Dismiss",
                                DatePickerLocale: {
                                    year: "",
                                    minute: "minute",
                                    month: "",
                                    am: "am",
                                    day: "",
                                    hour: "",
                                    pm: ""

                                }
                            }}
                            value={end_date}
                            mode="date"
                            defaultDate={new Date()}
                            minDate={new Date(2000, 7, 6)}
                            maxDate={new Date(2054, 11, 3)}
                            onChange={setEndDate}
                            format="YYYY-MM-DD">
                            <List.Item 
                            style={{
                                borderRadius: 5,
                                borderWidth: 2,
                                borderColor: "#108B54",
                            }}
                            arrow="horizontal">Ending date</List.Item>
                        </DatePicker>
                    </List>
                </View>

                {/* <View style={{
                        paddingBottom: 10,
                        width: "91%",
                        margin: "auto"
                    }}>
                    <CustomButtonWithIcon 
                    type="outlined"
                    buttonClicked={() => setShowEnd(true)}
                    // icon="clock-o"
                    text="Date of end"
                    />
                    <DatePicker
                        modal
                        style={{marginVertical: 10}}
                        open={show}
                        date={end_date}
                        onConfirm={(date:any) => {
                            setShowEnd(false)
                            setEndDate(date)
                            console.log(date)
                        }}
                        onCancel={() => {
                            setShowEnd(false)
                        }}
                    />
                </View> */}

            </View>

            {/* Validation button */}
            <View style={{marginBottom: 10}}>
                <CustomButtonWithIcon
                type="primary"
                loading={loading}
                text="Validate"
                buttonClicked={validate}
                />
            </View>
        </>
    )
}


export default AddExperience