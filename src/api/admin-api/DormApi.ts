import {httpProject as http} from '../../utils/http-common';

let baseUrl = 'admin/dorm';

class DormApi{
    list(params: any) {
        let config = {
            params: params ? params : {}
        };
        return http.get(baseUrl + "/list", config)
    }
}
export default new DormApi();
