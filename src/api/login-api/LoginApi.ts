import {httpProject as http} from '../../utils/http-common';

let baseUrl ='/';

class LoginApi {
    getUserEmail(username: any){
        return http.post(baseUrl = '/mapping-user',username )
    }

    onLoginSuccess(loginForm : any){
        return http.post(baseUrl = '/login',loginForm)
    }

    
}
export default new LoginApi();