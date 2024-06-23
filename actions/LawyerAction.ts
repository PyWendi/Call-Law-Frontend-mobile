import { Lawyer, LawyerUpdate } from "@/types/modelsType";
import { api } from "./api";

interface lawyerProfileData {
    lawyer: Lawyer | null;
    res: boolean;
}

export const fetchLawyer = async (id:number):Promise<lawyerProfileData> => {
    let data:lawyerProfileData = {
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
    let data:lawyerProfileData = {
        lawyer: null,
        res: false
    }

    try {
        const response = await api({
            url: `lawyer/${id}/`,
            method: "PUT",
            data: body
        })

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