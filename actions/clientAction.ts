import { ClientSignInFormat, ClientProfileData, ClientUpdateFormat, ProfileImage, ProfileImageData } from "@/types/modelsType";
import { api } from "./api";


/**
 * 
 * Remain upload profile pic
 */

export const registerClient = async (data: ClientSignInFormat): Promise<ClientProfileData> => {
    const returnData: ClientProfileData = {
        client: null,
        res: false
    }
    
    try {
        const response = await api.post("client/", data)
        if (response.status === 201) {
            returnData.client = response.data
            returnData.res = true
        }
        return returnData   
    } catch (error) {
        return returnData
    }
}


export const checkAuthentitcation = async (): Promise<boolean> => {
    try {
        const response = await api.get("client/check_auth/")
        console.log(response, "Check for authentication")
        if(response.status === 200) {
            return true
        } else if(response.status === 401){
            return false
        }
        
        return false
    } catch (error) {
        console.log(error)
        return false
    }
}

export const fetchClientProfile = async (id:number): Promise<ClientProfileData> => {
    let data:ClientProfileData = {
        client: null,
        res: false
    } 

    try {
        const response = await api.get(`client/${id}/`)

        if (response.status === 200) {
            data.client = response.data
            data.res = true
        }

        return data
    } catch (error) {
        console.log(error)
        return data
    }
}  


export const updateClientProfile = async (id:number, body:ClientUpdateFormat): Promise<ClientProfileData> => {
    let data:ClientProfileData = {
        client: null,
        res: false
    }

    try {
        const response = await api.put(`client/${id}/`, body)        
        if (response.status === 200){
            data.client = response.data
            data.res = true
        }

        return data
    } catch (error) {
        console.log(error)
        return data
    }
}


export const upload_profile_image = async (id:number, uri:string, fileName:string): Promise<ProfileImageData> => {
    let data: ProfileImageData = {
        profile_img: "",
        res: false
    }
    console.log(uri)
    console.log(fileName)

    const formData = new FormData()
    formData.append("profile_img", {
        uri: uri,
        // type: "image/jpeg",
        // name: fileName
    })
    console.log(formData)
    try {
        const response = await api.put(`client/${id}/update_profile_image/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log(response)
        if (response.status === 200) {
            data.profile_img = response.data.profile_img
            data.res = true
        }

        return data
    } catch (error) {
        console.log(error)
        return data
    }

}
