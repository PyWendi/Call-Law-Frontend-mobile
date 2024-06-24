import { Region, RegionData } from "@/types/modelsType";
import { api } from "./api";


export const getRegion = async ():Promise<RegionData> => {
    let data:RegionData = {
        regions: [],
        res: false
    }
    try {
        let response = await api.get("region/")
        if (response.status === 200){
            data.regions = response.data.results
            data.res = true
        }

        return data

    } catch (error) {
        console.log(error)
        return data
    }
}
