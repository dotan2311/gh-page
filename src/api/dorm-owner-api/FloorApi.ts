import {httpProject as http} from '../../utils/http-common';

let baseUrl = 'dorm-owner/floor';

class FloorApi {

    list(params: any) {
        let config = {
            params: params ? params : {}
        };

        return http.get(baseUrl + '/list', config);
    }

    listForRoom(userId: number) {
        return http.get(baseUrl + '/list-for-room?userId=' + userId);
    }

    create(floorDto: any) {
        return http.post(baseUrl + '/create', floorDto);
    }

    update(floorDto: any) {
        return http.post(baseUrl + '/update', floorDto);
    }

    get(code: string) {
        return http.get(baseUrl + '/detail?code=' + code);
    }

    delete(code: string) {
        let formData = new FormData();
        formData.append('code', code);
        return http.post(baseUrl + '/delete', formData);
    }
}

export default new FloorApi();
