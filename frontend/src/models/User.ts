export type UserRole = "CLIENT" | "ADMIN";

export interface User {
    id: number;
    email: string;
    role: UserRole;
    firstName?: string;
    lastName?: string;
}


