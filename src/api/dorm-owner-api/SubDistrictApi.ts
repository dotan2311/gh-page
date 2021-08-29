import {httpProject as http} from '../../utils/http-common';

let baseUrl = 'dorm-owner/sub-district';

class SubDistrictApi {

    listAllByDistrictId(districtId: any) {
        return http.get(baseUrl + '/list-all-by-district-id?districtId=' + districtId);
    }

}

export default new SubDistrictApi();
