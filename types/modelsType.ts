/**
 *  Region section
 */
export interface Region {
    id: number;
    designation: string;
}

export interface RegionData {
    regions: Region[] | [];
    res: boolean;
} 

/**
 *  Domain section
 */
export interface Domain {
    id: number;
    name: string;
}

export interface DomainData {
    domains: Domain[];
    res: boolean
}

export interface DomainWithSpeciality {
    id: number;
    name: string;
    specialities: Speciality[];
}

export interface DomainWithSpecialityData {
    domains: DomainWithSpeciality | null;
    res: boolean
}

/**
 * Speciality section
 */
export interface Speciality {
    id: number;
    name: string;
    domain: number;
}

export interface SpecialityData {
    specialities: Speciality[] | [];
    res: boolean
}

/**
 * Avis section
 */
export interface Avis{
    id: number;
    lawyer: NotificationReciever;
    writer: number;
    text?: string | null
    preference: number;
    date: string;
}

/**
 * Client section
 */
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

export interface ClientSignInFormat {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    password: string;
    region: number; // Region Id
    location: string;
}

export interface ClientUpdateFormat {
    first_name: string;
    last_name: string;
    phone: string;
    location: string;
    region: number; // Region Id
}

export interface ClientProfileData {
    client: Client | null;
    res: boolean;
}

/**
 * Lawyer section
 */
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

export interface MassLawyerFormat {
    id: number;
    first_name: string;
    last_name: string;
    profile_img?: string | null;
    domains: Domain[];
}

export interface LawyerSignInFormat {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    password: string;
    region: number; // Region Id
    domains: number[]; // Array of domain id
    location: string;
}

export interface LawyerProfileData {
    lawyer: Lawyer | null;
    res: boolean;
}

export interface LawyerListData { 
    lawyers: MassLawyerFormat[] | [];
    res: boolean
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

/**
 * Notification section
 */
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

export interface NotificationListData{
    notifications: Notification[];
    res: boolean
}


export interface NotificationData{
    notification: Notification | null;
    res: boolean
}

/**
 * Experience section
 */
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

/**
 * Appointment section
 */
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
