import { LawyerListData, LawyerProfileData, LawyerUpdate, LawyerSignInFormat, ProfileCv, ProfileImage, Availability, ProfileCvData, ProfileImageData, AvailabilityData } from "@/types/modelsType";
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
            // console.log(response.data)
            data.lawyers = response.data
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

export const upload_cv = async (id:number, body:ProfileCv): Promise<ProfileCvData> => {
    let data: ProfileCvData = {
        cv_file: "",
        res: false
    }

    try {
        const response = await api.put(`lawyer/${id}/upload_cv`, body)
        console.log(response)
        if (response.status === 200) {
            data.cv_file = response.data.cv_file
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
        const response = await api.put(`lawyer/${id}/update_profile_image/`, body)
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


export const update_availability = async (body:Availability): Promise<AvailabilityData> => {
    let data: AvailabilityData = {
        availability: "",
        res: false
    }

    try {
        const response = await api.put(`lawyer/update_profile_image/`, body, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        console.log(response)
        if (response.status === 200) {
            data.availability = response.data.availability
            data.res = true
        }

        return data
    } catch (error) {
        console.log(error)
        return data
    }

}
