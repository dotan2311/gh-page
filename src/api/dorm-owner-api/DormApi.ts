import {httpProject as http} from '../../utils/http-common';

let baseUrl = 'dorm-owner/dorm';

class DormApi {

    list(params: any) {
        let config = {
            params: params ? params : {}
        };

        return http.get(baseUrl + '/list', config);
    }

    listForFloor(userId: number) {
        return http.get(baseUrl + '/list-for-floor?userId=' + userId);
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

    get(code: string) {
        return http.get(baseUrl + '/detail?code=' + code);
    }

    delete(code: string) {
        let formData = new FormData();
        formData.append('code', code);
        return http.post(baseUrl + '/delete', formData);
    }

}

export default new DormApi();
