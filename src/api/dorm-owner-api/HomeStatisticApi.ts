import {httpProject as http} from '../../utils/http-common';

let baseUrl = 'dorm-owner/home-statistic';

class HomeStatisticApi {

    getHomeStatistic(year: number, userId: number) {
        return http.get(baseUrl + '/get-home-statistic?year=' + year + '&userId=' + userId);
    }

    getTotalHomeStatistic(year: number, userId: number) {
        return http.get(baseUrl + '/get-total-statistic?year=' + year + '&userId=' + userId);
    }
}

export default new HomeStatisticApi();
