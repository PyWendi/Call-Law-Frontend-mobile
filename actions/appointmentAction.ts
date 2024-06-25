import { AppointmentCreateFormat, AppointmentData, AppointmentLawyerValidationFormat, AppointmentMassData } from "@/types/modelsType";
import { api } from "./api";

export const getAppointmentsForLawyer = async ():Promise<AppointmentMassData> => {
    let data: AppointmentMassData = {
        appointments: [],
        res: false
    }


    try {
        const response = await api.get("appointment/for/lawyer")
        if(response.status === 200) {
            data.appointments = response.data
            data.res = true
        }

        return data
    } catch (error) {
        console.log(error)
        return data
    }
}


export const getAppointmentsForClient = async ():Promise<AppointmentMassData> => {
    let data: AppointmentMassData = {
        appointments: [],
        res: false
    }


    try {
        const response = await api.get("appointment/for/client")
        if(response.status === 200) {
            data.appointments = response.data
            data.res = true
        }

        return data
    } catch (error) {
        console.log(error)
        return data
    }
}


export const createAppointment = async (body: AppointmentCreateFormat): Promise<AppointmentData> => {
    let data:AppointmentData = {
        appointments: null,
        res: false
    }

    try {
        const response = await api.post(`appointment/`, body)
        if(response.status === 200) {
            data.appointments = response.data
            data.res = true
        }

        return data
    } catch (error) {
        console.log(error)
        return data
    }
}

export const validateAppointment = async (id:number, body:AppointmentLawyerValidationFormat): Promise<AppointmentData> => {
    let data:AppointmentData = {
        appointments: null,
        res: false
    }

    try {
        const response = await api.put(`appointment/${id}/validate_appointment`, body)        
        if(response.status === 200) {
            data.appointments = response.data
            data.res = true
        }

        return data
    } catch (error) {
        console.log(error)   
        return data
    }
}

export const cancelAppointment = async (id:number): Promise<boolean> => {
    try {
        const response = api.get(`appointment/${id}/cancel_appointment/`)
        console.log(response)
        if ((await response).status === 200) {
            return true
        }

        return false
    } catch (error) {
        console.log(error)
        return false
    }
}


export const archiveAppointment = async (id:number): Promise<boolean> => {
    try {
        const response = api.get(`appointment/${id}/archive/`)
        console.log(response)
        if ((await response).status === 200) {
            return true
        }

        return false
    } catch (error) {
        console.log(error)
        return false
    }
}

