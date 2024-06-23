export interface Region {
    id: number;
    designation: string;
}

export interface Domain {
    id: number;
    name: string;
}

export interface Speciality {
    id: number;
    name: string;
    domain: number;
}


export interface Avis{
    id: number;
    lawyer: NotificationReciever;
    writer: number;
    text?: string | null
    preference: number;
    date: string;
}


export interface Client {
    id: number;
    profile_img?: string | null;
    cv_file?: string | null;
    date_joined: string;
    last_login: string | null;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    location: string;
    isClient: boolean;
    region: Region;
}

export interface Lawyer {
    id: number;
    profile_img?: string | null;
    cv_file?: string | null;
    date_joined: string;
    region: Region;
    domains: Domain[];
    last_login: string | null;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    location: string;
    isClient: boolean;
    availability?: string | null;
}


export interface LawyerUpdate {
    region: number;
    domains: number[];
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    location: string;
    availability?: string | null;
}

export interface NotificationReciever {
    id: number;
    first_name: string;
    last_name: string;
    profile_img?: string | null;
}

export interface NotificationAppointment {
    id: number;
    speciality: Speciality;
    client: NotificationReciever;
    title: string;
    description: string;
    message: string | null;
    date: string | null;
    created_at: String
}

export interface Notification {
    id: 8;
    receiver:NotificationReciever; // short client object
    appointment: NotificationAppointment
    author: number;
    type: string;
    seen: boolean;
    created_at: string
}


export interface Experience {
    id: number;
    domain: Domain;
    specialities?: Speciality[] | null;
    title: string
    description: string;
    date_beg: string | null;
    date_end: string | null;
    created_at: string;
    owner: number
}


export interface Appointment {
    id: number;
    speciality:Speciality;
    lawyer: NotificationReciever;
    client: NotificationReciever;
    title: string;
    description: string;
    message: string | null;
    date: string;
    isConfirmed: boolean;
    isArchived: boolean;
    isValid: boolean;
    client_id: number;
    created_at: string;
}
