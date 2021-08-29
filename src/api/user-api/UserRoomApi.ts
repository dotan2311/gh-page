import {httpProject as http} from '../../utils/http-common';

let baseUrl = 'user/room';

class UserRoomApi{
    list(params: any) {
        let config = {
            params: params ? params : {}
        };
        return http.get(baseUrl + "/list", config)
    }
    detail(code:string){
        return http.get(baseUrl+"/detail?code="+code);
    }

    rate(params: any) {
        let config = {
            params: params ? params : {}
        };
        return http.get(baseUrl + "/rate", config)
    }
    
}
export default new UserRoomApi();
