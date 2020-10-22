export interface User {
    role: string;
    id: number;
    status: number;
}

export class InitData {
    roomId: number = 0;
    userId: number = 0;
}

export interface Users {
    users: Array<User>;
    lastUserTime: number;
}

export interface UserWord {
    word: string;
    first: number;
    u: string;
    c: string;
    b: string;
    lastRoleTime: number;
}


export interface Users {
    users: Array<User>;
}
