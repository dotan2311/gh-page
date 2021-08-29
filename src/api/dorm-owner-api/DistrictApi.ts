import {httpProject as http} from '../../utils/http-common';

let baseUrl = 'dorm-owner/district';

class DistrictApi {

    listAll() {
        return http.get(baseUrl + '/list-all');
    }

}

export default new DistrictApi();
