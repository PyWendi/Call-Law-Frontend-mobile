import { Experience, ExperienceCreationData, ExperienceData, ExperienceUpdateDataFormat } from "@/types/modelsType";
import { api } from "./api";


export const getExperiences = async (id:number): Promise<ExperienceData> => {
    let data: ExperienceData = {
        experiences: [],
        res: false
    }


    try {
        const response = await api.get(`experience/${id}/for_lawyer/`)
        if(response.status === 200) {
            data.experiences = response.data
            data.res= true
        }

        return data
    } catch (error) {
        console.log(error)
        return data
    }
}

export const createExperience = async (): Promise<ExperienceCreationData> => {
    let data: ExperienceCreationData = {
        experience: null,
        res: false
    }

    try {
        const response = await api.post("experience/")   
        if (response.status === 201) {
            data.experience = response.data
            data.res = true
        }

        return data
    } catch (error) {
        console.log(error)   
        return data
    }
}

export const updateExperience = async (id:number, body: ExperienceUpdateDataFormat): Promise<ExperienceCreationData> => {
    let data:ExperienceCreationData = {
        experience: null,
        res: false
    }

    try {
        const response = await api.put(`experience/${id}/`,body)
        if (response.status === 200) {
            data.experience = response.data
            data.res = true
        }

        return data
    } catch (error) {
        console.log(error)
        return data
    }
}
