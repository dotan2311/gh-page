import { httpProject as http } from '../../utils/http-common';

let baseUrl = 'user/dorm';

class UserDormApi {

    list(params: any) {
        let config = {
            params: params ? params : {}
        };
        return http.get(baseUrl + "/list", config)
    }
    detail(code: string) {
        return http.get(baseUrl + "/detail?code=" + code)
    }
    floors(dormId: string) {
        return http.get(baseUrl + "/floors?dormId=" + dormId)
    }

}

export default new UserDormApi();
