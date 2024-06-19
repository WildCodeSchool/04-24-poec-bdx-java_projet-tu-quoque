export class UserRegister {
    constructor(
        public nickname: string,
        public email: string,
        public password: string,
        public avatar?: string
    ) { }
}