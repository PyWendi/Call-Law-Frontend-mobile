import { 
    AppointmentCreateFormat, 
    AppointmentData, 
    AppointmentLawyerValidationFormat, 
    AppointmentMassData } from "@/types/modelsType";
import { api } from "./api";


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


export const getArchivedAppointmentsForClient = async ():Promise<AppointmentMassData> => {
    let data: AppointmentMassData = {
        appointments: [],
        res: false
    }


    try {
        const response = await api.get("appointment/archived/for/client")
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

export const getSingleAppointmentsForClient = async (id:number):Promise<AppointmentData> => {
    let data: AppointmentData = {
        appointments: null,
        res: false
    }


    try {
        const response = await api.get(`appointment/${id}`)
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

export const searchAppointmentsForClient = async (search:string):Promise<AppointmentMassData> => {
    let data: AppointmentMassData = {
        appointments: [],
        res: false
    }


    try {
        const response = await api.get(`appointment/search/${search}/`)
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



export const searchArchivedAppointmentsForClient = async (search:string):Promise<AppointmentMassData> => {
    let data: AppointmentMassData = {
        appointments: [],
        res: false
    }


    try {
        const response = await api.get(`appointment/search/archive/${search}/`)
        if(response.status === 200) {
            console.log(response)
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
        console.log(response) 
        if(response.status === 201) {
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
        const response = await api.put(`appointment/${id}/validate_appointment/`, body)        
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

