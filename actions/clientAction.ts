import { ClientProfileData, ClientUpdateFormat, ProfileImage, ProfileImageData } from "@/types/modelsType";
import { api } from "./api";


/**
 * 
 * Remain upload profile pic
 */

export const fetchClientProfile = async (id:number): Promise<ClientProfileData> => {
    let data:ClientProfileData = {
        client: null,
        res: false
    } 

    try {
        const response = await api.get(`client/${id}/`)

        if (response.status === 200) {
            console.log(response.data)
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


export const upload_profile_image = async (id:number, body:ProfileImage): Promise<ProfileImageData> => {
    let data: ProfileImageData = {
        profile_img: "",
        res: false
    }

    try {
        const response = await api.put(`client/${id}/update_profile_image/`, body)
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
