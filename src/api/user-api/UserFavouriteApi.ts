import { httpProject as http } from '../../utils/http-common';

let baseUrl = '/user/favourite';
class UserFavouriteApi {

    list(params: any) {
        let config = {
            params: params ? params : {}
        };
        return http.get(baseUrl + "/list", config)
    }

    new(favouriteEntity: any) {
        return http.post(baseUrl + "/new", favouriteEntity);
    }

    delete(code: any) {
        return http.delete(baseUrl + "/delete?code=" + code);
    }

}
export default new UserFavouriteApi();
