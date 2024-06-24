import { ClientProfileData, ClientUpdateFormat } from "@/types/modelsType";
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

