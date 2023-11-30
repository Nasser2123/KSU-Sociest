export class UserModel {
    id: number;
    firstName: string;
    lastName: string;
    role: string;
    // TODO: I should put which department belongs to the user if he is a Supervisor
    email?: string;
    password?: string;
    confirmPassword?: string;
}
