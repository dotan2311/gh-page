import {httpProject as http} from '../../utils/http-common';

let baseUrl = 'admin/account';

class AccountApi {
    list(params: any) {
        let config = {
            params: params ? params : {}
        };
        return http.get(baseUrl + "/list", config)
    }
    
    update(accountDto: any) {
        return http.post(baseUrl + '/update', accountDto);
    }

    get(code: string) {
        return http.get(baseUrl + '/detail?code=' + code);
    }

    delete(code: string) {
        let formData = new FormData();
        formData.append('code', code);
        return http.post(baseUrl + '/delete', formData);
    }
    unDelete(code: string) {
        let formData = new FormData();
        formData.append('code', code);
        return http.post(baseUrl + '/unDelete', formData);
    }

}

export default new AccountApi();
