import {httpProject as http} from '../../utils/http-common';

let baseUrl = 'dorm-owner/room';

class RoomApi {

    list(params: any) {
        let config = {
            params: params ? params : {}
        };

        return http.get(baseUrl + '/list', config);
    }

    create(formData: FormData) {
        return http.post(baseUrl + '/create', formData, {
            headers: {
                'Content-Type': undefined
            }
        });
    }

    update(formData: FormData) {
        return http.post(baseUrl + '/update', formData, {
            headers: {
                'Content-Type': undefined
            }
        });
    }

    changeStatus(code: string, status: string) {
        let formData = new FormData();
        formData.append("code", code);
        formData.append("status", status);
        return http.post(baseUrl + '/change-status', formData);
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
  
export default new RoomApi();
