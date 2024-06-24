import { SpecialityData } from "@/types/modelsType";
import { api } from "./api";

export const fetchSpeciality = async (): Promise<SpecialityData> => {
    let data: SpecialityData = {
        specialities: [],
        res: false
    }


    try {
        const response = await api.get("speciality")
        if(response.status === 200) {
            data.specialities = response.data.results
            data.res = true
        }

        return data 
    } catch (error) {
        console.log(error)
        return data
    }
}