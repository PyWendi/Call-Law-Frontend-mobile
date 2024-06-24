import { LawyerListData, LawyerProfileData, LawyerUpdate, LawyerSignInFormat } from "@/types/modelsType";
import { api } from "./api";

/**
 * 
 * Remain upload Cv and Profile_img
 * Remain update Availability
 */

export const registerLawyer = async (data: LawyerSignInFormat): Promise<LawyerProfileData> => {
    const returnData: LawyerProfileData = {
        lawyer: null,
        res: false
    }
    
    try {
        const response = await api.post("lawyer/", data)
        if (response.status === 201) {
            returnData.lawyer = response.data
            returnData.res = true
        }
        return returnData   
    } catch (error) {
        return returnData
    }
}


export const fetchAllLawyer = async (): Promise<LawyerListData> => {
    let data: LawyerListData = {
        lawyers: [],
        res: false
    }

    try {
        const response = await api.get("lawyer/get_all_lawyer/")
        if (response.status === 200) {
            console.log(response.data)
            // data.lawyers = response.data
            data.res = true
        }
        return data
    } catch (error) {
        console.log(error)
        return data
    }
}

export const fetchSingleLawyer = async (id:number):Promise<LawyerProfileData> => {
    let data:LawyerProfileData = {
        lawyer: null,
        res: false
    }

    try {
        const response = await api.get(`lawyer/${id}/`)
        if (response.status === 200) {
            console.log(response, "Lawyer profile has been FETCHED !!")
            data.lawyer = response.data
            data.res = true
        }
        return data
        
    } catch (error) {
        console.log(error)
        return data
    }
}

export const updateLawyer = async (id:number, body:LawyerUpdate) => {
    let data:LawyerProfileData = {
        lawyer: null,
        res: false
    }

    try {
        const response = await api.put(`lawyer/${id}/`,body)

        if (response.status === 200) {
            console.log(response, "Lawyer update DONE !!")
            data.lawyer = response.data
            data.res = true
        }
        return data
        
    } catch (error) {
        console.log(error)
        return data
    }
}


export const searchLawyerByFirstName = async (search: string): Promise<LawyerListData> => {
    let data: LawyerListData = {
        lawyers: [],
        res: false
    }

    try {
        const response = await api.get(`lawyer/search/${search}`)
        if (response.status === 200) {
            console.log(response.data)
            data.lawyers = response.data
            data.res = true
        }
        return data
    } catch (error) {
        console.log(error)
        return data
    }
}
