import { Region } from "@/types/modelsType";
import { api } from "./api";
// import { setRegion } from "@/slices/regionSlice";



interface RegionData {
    regions: Region[] | [];
    res: boolean;
} 

export const getRegion = async ():Promise<RegionData> => {
    try {
        let response = await api.get("region/")
        if (response.status === 200){
            console.log(response.data, "Inside region action fetching event****")
        }
        return {
            regions: response.data.results,
            res: true
        }
    } catch (error) {
        console.log(error)
        return {
            regions: [],
            res: false
        }
    }
}
