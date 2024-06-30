import { DomainData, DomainWithSpeciality, DomainWithSpecialityData } from "@/types/modelsType";
import { api } from "./api";


export const fetchAllDomain = async (): Promise<DomainData> => {
    let data:DomainData = {
        domains: [],
        res: false
    }


    try {
        const response = await api.get("domain/")
        if ( response.status === 200 ) {
            console.log(response) 
            data.domains = response.data.results
            data.res = true
        }
        console.log(response)
        return data
    } catch (error) {
        console.log(error)
        return data
    }
}

export const fetchDomainSpecialities = async (id: number): Promise<DomainWithSpecialityData> => {
    let data:DomainWithSpecialityData = {
        domains: null,
        res: false
    }


    try {
        const response = await api.get(`domain/${id}/get+_speciality/`)
        if(response.status === 200) {
            data.domains = response.data
            data.res = true
        }

        return data
    } catch (error) {
        console.log(error)
        return data   
    }
}


