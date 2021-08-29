import { httpProject as http } from '../../utils/http-common';

let baseUrl = 'user/account';

class UserApi {
    getUserInfor() {
        return http.get((baseUrl = '/me'));
    }

    register(userDto: any) {
        return http.post(baseUrl + '/register', userDto);
    }

    update(formData: FormData) {
        return http.post(baseUrl + '/update', formData, {
            headers: {
                'Content-Type': undefined
            }
        });
    }
    
    changePassword(oldAnhNewPassword: any) {
        return http.post(baseUrl + '/changePassword',oldAnhNewPassword);
    }
    changeNewPassword(oldAnhNewPassword: any) {
        return http.post(baseUrl + '/changeNewPassword',oldAnhNewPassword);
    }

    sendVerifyCode(request : any){
        return http.post(baseUrl + '/sendVerifyCode', request)
    }

    checkVerifyCode(request : any){
        return http.get(baseUrl + '/verify',{params : {code :request.code}});
    }

    checkExitEmail(request : any){
        return http.post(baseUrl + '/checkExitEmail',request);
    }
    
    updateEmail(request : any){
        return http.post(baseUrl + '/updateEmail', request);
    }

    forgotPassword(request : any){
        return http.post(baseUrl + '/forgotPassword',request);
    }

    updateRoleDormOwner() {
        return http.post(baseUrl + '/updateRoleDormOwner');
    }

    delete(code: string) {
        let formData = new FormData();
        formData.append('code', code);
        return http.post(baseUrl + '/delete', formData);
    }
}

export default new UserApi();
