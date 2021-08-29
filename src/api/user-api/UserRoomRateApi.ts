import { httpProject as http } from '../../utils/http-common';

let baseUrl = '/user/rate';

class UserRoomRateApi {
    newFeedBack(rateEntity: any) {
        return http.post(baseUrl + "/new", rateEntity);
    }

    deleteFeedBack(code: any) {
        return http.delete(baseUrl + "/delete?code=" + code);
    }
    
    editFeedBack(rateEntity: any) {
        return http.put(baseUrl + "/edit", rateEntity);
    }
    rate(params: any) {
        let config = {
            params: params ? params : {}
        };
        return http.get(baseUrl + "/list", config)
    }
}

export default new UserRoomRateApi();
