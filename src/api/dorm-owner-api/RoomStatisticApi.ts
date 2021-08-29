import {httpProject as http} from '../../utils/http-common';

let baseUrl = 'dorm-owner/room-statistic';

class RoomStatisticApi {

    list(year: number, userId: number) {
        return http.get(baseUrl + '/list?year=' + year + '&userId=' + userId);
    }
}

export default new RoomStatisticApi();
