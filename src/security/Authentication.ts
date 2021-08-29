import { CookieUtils } from '@/utils/CookieUtils';
import UserEntity from '@/types/classes/UserEntity';
import LoginApi from '@/api/login-api/LoginApi';
import UserApi from '@/api/user-api/UserApi';

import { ComparatorUtils } from '@/utils/ComparatorUtils';

class Authentication {
    private ACCESS_KEY: string = 'access_token';
    private isAuth: Boolean = null;
    private currentUser: UserEntity;
    private companyCode: string;

    public removeToken(): void {
        CookieUtils.clearCookie(this.ACCESS_KEY);
    }

    public getAccessToken(): string {
        return CookieUtils.getCookie(this.ACCESS_KEY);
    }

    public getCurrentUser(): UserEntity {
        return this.currentUser;
    }

    public getCurrentUserId(): number {
        return this.currentUser.id;
    }
    public setCurrentUserId(id: number): void {
        this.currentUser.id = id;
    }

    public redirectToLogin(): void {
        window.location.href = 'http://localhost:8080/sign-in';
    }

    public isAuthenticated(): Boolean {
        return this.isAuth;
    }

    public fetchCurrentUser(): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            if (this.getAccessToken()) {
                try {
                    let user = await UserApi.getUserInfor();
                    let roleNames: Array<string> = [];
                    for (let i = 0; i < user.rolename.length; i++) {
                        roleNames.push(user.rolename[i].name);
                    }
                    if (user) {
                        this.currentUser = {
                            id: user.id,
                            username: user.username,
                            avatarUrl: user.avatarUrl,
                            roles: roleNames,
                            fullName: user.fullName
                        };
                        this.isAuth = true;
                    } else {
                        this.currentUser = null;
                        this.isAuth = false;
                    }
                    resolve(this.isAuth.valueOf());
                } catch (e) {
                    this.isAuth = false;
                    this.currentUser = null;
                    resolve(this.isAuth.valueOf());
                }
            } else {
                resolve(false);
            }
        });
    }

    // public async syncUserCached(commonUser: UserEntity) {
    //     const user = await UserApi.getCurrentUser(Server.CP);
    //     if (!ComparatorUtils.compareUser(commonUser, user)) {
    //         UserApi.deleteUserCached(Number(commonUser.id)).then(() => {
    //             console.log(`Cached user [${commonUser.id}] is deleted `)
    //         });
    //     } else {
    //         this.currentUser = user;
    //     }
    // }

    /**
     * get current user roles.
     */
    public getUserRoles(): Array<string> {
        return this.currentUser.roles;
    }

    /**
     * check current user has any roles
     * @param authorities
     */
    public hasAnyRoles(authorities: Array<string>) {
        let roles = this.getUserRoles();
        if (!roles || roles.length == 0) {
            return false;
        }
        if (authorities.length == 0) {
            return true;
        }
        for (let i = 0; i < authorities.length; i++) {
            let valid = roles.indexOf(authorities[i]) > -1;
            if (valid) {
                return true;
            }
        }
        return false;
    }

    public async logout(): Promise<any> {
        console.log('Logout');
        // if (this.getAccessToken()) {
        //     await LoginApi.logout();
        // }
        this.currentUser = null;
        this.removeToken();
        this.redirectToLogin();
    }

    public cliponLogout(): void {
        console.log('Clipon logout');
        this.currentUser = null;
        this.removeToken();
        this.redirectToLogin();
    }
}

let auth = new Authentication();
export default auth;
