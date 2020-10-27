declare var SERVER_URL: string;

declare interface User {
    role: string;
    id: number;
    status: number;
}

declare interface Users {
    users: Array<User>;
    lastUserTime: number;
}

declare interface UserWord {
    word: string;
    first: number;
    u: string;
    c: string;
    b: string;
    lastRoleTime: number;
}


declare interface Users {
    users: Array<User>;
}
