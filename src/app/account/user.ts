  export class User {
    userId!: string;
    userRole!: string;
    userName!: string;
    firstName!: string;
    lastName!: string;
    gender!: string;
    email!: string;
    creationDate!: Date;
}

export class UserLogin {
    emailOrUserName!: string;
    password!: string;
}

export class UserRegister {
    userName!: string;
    email!: string;
    password!: string;
    repeatPassword!: string;
}