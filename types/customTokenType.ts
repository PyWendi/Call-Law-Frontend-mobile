import {JwtPayload} from "jwt-decode"

export interface CustomJwtPayload  extends JwtPayload {
    user_id: number;
    isClient: Boolean;
}

export interface Refresh {
    refresh: string | null;
}

export interface Payload {
    refresh: string;
    access: string;
}


export interface TokenManagement {
    getJwt: () => Promise<string | null>;
    setJwt: (token: string) => Promise<boolean>;
    deleteJwt: () => Promise<boolean>;

    setRefresh: (refresh:string) => Promise<boolean>
    getRefresh: () => Promise<string | null>
    deleteRefresh: () => Promise<boolean>;
}