import {JwtPayload} from "jwt-decode"

export interface CustomJwtPayload  extends JwtPayload {
    isClient?: Boolean;
}

export interface TokenManagement {
    getJwt: () => Promise<String | null>;
    setJwt: (token: string) => Promise<Boolean>;
    deleteJwt: () => Promise<Boolean>;

    setRefresh: (refresh:string) => Promise<Boolean>
    getRefresh: () => Promise<String | null>
    deleteRefresh: () => Promise<Boolean>;
}