import { View, Text, ScrollView } from "react-native"
import { Picker, List, Checkbox } from "@ant-design/react-native"
import type { PickerValue, PickerValueExtend } from "@ant-design/react-native"
import { Toast, Modal } from "@ant-design/react-native"
import { styles } from "@/styles/mainstyle"
import { useRouter } from "expo-router"
import { useEffect, useState } from "react"

import CustomButtonWithIcon from "@/components/ButtonComponent"
import CustomInputSimple from "../CustomWithoutLineComponent"
import { getRegion } from "@/actions/RegionAction"

import { LawyerSignInFormat } from "@/types/modelsType"
import { fetchAllDomain } from "@/actions/domainAction"
import { registerLawyer } from "@/actions/LawyerAction"



const AgreeItem = Checkbox.AgreeItem
const CheckboxItem = Checkbox.CheckboxItem

interface SelectFormat {
    label: string;
    value: any;
}

export default function SignLawyerForm () {

    const router = useRouter()
    const [modal, setModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [first_name, setFirstName] = useState("")
    const [last_name, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [location, setLocation] = useState("")
    const [region, setRegion] = useState<any>()
    const [regionDesign, setRegionDesign] = useState("")
    const [regionData, setRegionData] = useState<SelectFormat[] | []>([])
    const [domains, setDomain] = useState<SelectFormat[] | []>([
        {label: "D1", value: 1},
        {label: "D2", value: 2},
        {label: "D3", value: 3},
        {label: "D4", value: 4},
    ])
    const [domainDataChecked, setDomainDataChecked] = useState([])
    const [password, setPassword] = useState("")
    const [password1, setPassword1] = useState("")


    const [visible, setVisible] = useState(false)
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);

    const regions = [
        { value: 'Africa', label: 'Africa' },
        { value: 'Asia', label: 'Asia' },
        { value: 'Europe', label: 'Europe' },
    ];


    // const dispatch = useDispatch<AppDispatch>()
    // const loading = useSelector((state:RootState) => state.interactions)

    const validateEmail = (email:string) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };

    const openSelect = () => {
        setVisible(true)
    }

    const closeModal = () => {
        console.log(domainDataChecked, "Data checked")
        setModal(false)
    }

    const InputIsvalid = (): boolean => {
        if(validateEmail(email)) {
            setIsValidEmail(true)
            if(password.length >= 8) {
                setIsPasswordValid(true)
                return true
            } else {
                setIsPasswordValid(false)
                return false
            }
        }else {
            setIsValidEmail(false)
            return false
        }
    }   

    const validatePassword = () => {
        if( (password === password1) && (password.length >= 8) && (password1.length >= 8)) {
            return true
        }
        return false
    }

    const regionMap = regionData.reduce((acc:any, curr:any) => {
        acc[curr.value] = curr.label;
        return acc;
    }, {});
    
    const handleRegionChange = (value:any) => {
        const label = regionMap[value]
        if (label){
            setRegionDesign(label)
        }
    }


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
            console.log(response.domains)
            let data: SelectFormat[] = []
            response.domains.map((elem) => [
                data.push({
                    label: elem.name,
                    value: elem.id
                })
            ])
            setDomain(data)
        }
    }

    const validate = async () => {
        setLoading(true)
        if(InputIsvalid() && validatePassword()){
            let data:LawyerSignInFormat = {
                first_name: first_name,
                last_name: last_name,
                email: email,
                phone: phone,
                region: region,
                location: location,
                password: password,
                domains: domainDataChecked
            }
            console.log(data)
            
            const response = await registerLawyer(data)
            if(response.res) {
                Toast.success("You have been registered.", 2)
                setLoading(false)
                router.navigate("/login")
            }
            else {
                Toast.fail("Error while performing register.", 2)
            }
        }
        setLoading(false)
    }

    function navigateToChoice(){
        router.navigate("/choice")
    }

    useEffect(() => {
        getRegionData() 
        getDomainData()
    }, [])


    return (
        <View style={{width: "90%", margin: "auto", borderRadius: 7, paddingBottom: 20}}>
            {/* Welcome text */}

            <Modal
                style={{
                    width: "75%",
                    position: "absolute",
                    top: "40%",
                    left: "12%",
                    transform: [
                        { translateX: '50%' },
                        { translateY: '50%' }
                    ],
                    borderRadius: 6
                }}
                popup
                visible={modal}
                onClose={() => closeModal()}>
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


            <View style={{flex: 1, alignItems: "center", paddingBottom: 40}}>
                <Text style={[styles.auth_action_title, {fontFamily: "dm-sans"}]}>
                    Create your account
                </Text>
            </View>

            {/* Button section */}

            <ScrollView>
                <View style={{height: 500}}>
                    
                    <View style={[styles.form_ask, {
                        paddingBottom: 5,
                        flexDirection: "row"
                        }]}>
                        <View style={[styles.centered_elem, {width: "45%"}]}>
                            <CustomInputSimple
                            label="First Name" 
                            parentValue={first_name}
                            setParenValue={setFirstName}
                            type="text"
                            placeholder=""
                            />
                        </View>

                        <View style={[styles.centered_elem, {width: "45%"}]}>
                            <CustomInputSimple 
                            label="Last Name" 
                            parentValue={last_name}
                            setParenValue={setLastName}
                            type={"text"}
                            placeholder=""
                            />
                        </View>

                    </View>

                    <View>

                        <View style={[styles.centered_elem, {width: "100%"}]}>
                            <CustomInputSimple
                            label="Email Adress" 
                            parentValue={email}
                            setParenValue={setEmail}
                            type="email"
                            placeholder="you@mail.com"
                            />
                        </View>
                    </View>

                    <View style={[styles.form_ask, {
                        // paddingBottom: 1,
                        flexDirection:"row",
                        }]}>

                        <View style={[styles.centered_elem, {width: "45%"}]}>
                            <CustomInputSimple 
                            label="Phone number" 
                            parentValue={phone}
                            setParenValue={setPhone}
                            type={"number"}
                            placeholder="+261"
                            />
                        </View>

                        <View style={[styles.centered_elem, {width: "45%"}]}>
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
                             <View style={{ padding: 10, width: "95%", margin:'auto' }}>
                                {/* <Button title="Cancel" /> */}
                                <CustomButtonWithIcon 
                                text={"Selected region: "+ regionDesign}
                                type="outlined"
                                buttonClicked={openSelect}
                                />
                            </View>
                        </Picker>

                        <View style={{ padding: 10, width: "95%", margin:'auto' }}>
                            {/* <Button title="Cancel" /> */}
                            <CustomButtonWithIcon 
                            text={"Select domains"}
                            type="outlined"
                            buttonClicked={() => setModal(true)}
                            />
                        </View>

                        <View style={[styles.centered_elem, {width: "100%"}]}>
                            <CustomInputSimple 
                            label="Password" 
                            parentValue={password}
                            setParenValue={setPassword}
                            type={"password"}
                            placeholder=""
                            />
                            {/* {!isValidEmail && <Text style={{paddingStart: 20, fontSize:16, color:"red"}}>Email is invalid</Text>}
                            {!isPasswordValid && <Text style={{paddingStart: 20, fontSize:16, color:"red"}}>Password length must be over 8 chars</Text>} */}
                        </View>

                        <View style={[styles.centered_elem, {width: "100%"}]}>
                            <CustomInputSimple 
                            label="Confirm your password" 
                            parentValue={password1}
                            setParenValue={setPassword1}
                            type={"password"}
                            placeholder=""
                            />
                            {!isValidEmail && <Text style={{paddingStart: 20, fontSize:16, color:"red"}}>Email is invalid</Text>}
                            {!isPasswordValid && <Text style={{paddingStart: 20, fontSize:16, color:"red"}}>Password length must be over 8 chars</Text>}
                        </View>

                    </View>

                    

                </View>


            </ScrollView>

            <View>
                
                <View style={{width: "90%", marginBottom:20, margin: "auto"}}>
                    <CustomButtonWithIcon 
                    loading={loading}
                    text="Validate"
                    type="primary"
                    buttonClicked={validate}
                    />
                </View>

                <View>
                    <View style={{width: "90%", paddingTop: 20, margin: "auto"}}>
                        <CustomButtonWithIcon 
                        loading={false}
                        text="Go back to choice screen"
                        type="outlined"
                        buttonClicked={navigateToChoice}
                        />
                    </View>
                </View>
            </View>

        </View>
    )
}