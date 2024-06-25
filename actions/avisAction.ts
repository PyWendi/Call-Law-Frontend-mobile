import { AvisData } from "@/types/modelsType";
import { api } from "./api";

export const fetchAvisForLawyer = async (id: number): Promise<AvisData> => {
    let data: AvisData = {
        avis: [],
        res: false
    }

    try {
        const response = await api.get(`avis/${id}/for_lawyer/`)
        if( response.data === 200) {
            data.avis = response.data
            data.res = true
        }

        return data
    } catch (error) {
        console.log(error)
        return data
    }
}


