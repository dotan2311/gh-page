export default class UserEntity {
    public id: number;
    public username: string;
    public avatarUrl: string;
    public roles?: Array<string>;
    public fullName: string;
}
