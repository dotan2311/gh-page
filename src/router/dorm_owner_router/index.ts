import Roles from '@/security/Roles';
import Pages from '@/router/Pages';
import DetailRoom from '@/views/dorm-owner/components/room/DetailRoom.vue';
import RoomChart from '@/views/dorm-owner/components/room/RoomStatistic.vue';
import DetailDorm from '@/views/dorm-owner/components/dorm/DetailDorm.vue';
import ListDorm from '@/views/dorm-owner/components/dorm/ListDorm.vue';
import ListRoom from '@/views/dorm-owner/components/room/ListRoom.vue';
import ListFloor from '@/views/dorm-owner/components/floor/ListFloor.vue';
import DetailFloor from '@/views/dorm-owner/components/floor/DetailFloor.vue';
import HomeStatistic from '@/views/dorm-owner/components/HomeStatistic.vue';

let meta: Object = {
    authorities: [
        Roles.ROLE_DORM_OWNER,
    ],
    functionScope: 'ADMIN'
};

let DormOwnerRouter = [
    {
        ...Pages.homeStatistic,
        component: HomeStatistic,
        meta: {
            title: 'Home Statistic',
            ...meta
        }
    },
    {
        ...Pages.listDorm,
        component: ListDorm,
        meta: {
            title: 'List Dorm',
            ...meta
        }
    },
    {
        ...Pages.createDorm,
        component: DetailDorm,
        meta: {
            title: 'Create Dorm',
            ...meta
        }
    },
    {
        ...Pages.updateDorm,
        component: DetailDorm,
        meta: {
            title: 'Update Dorm',
            ...meta
        }
    },
    {
        ...Pages.listFloor,
        component: ListFloor,
        meta: {
            title: 'List Floor',
            ...meta
        }
    },
    {
        ...Pages.createFloor,
        component: DetailFloor,
        meta: {
            title: 'Create Floor',
            ...meta
        }
    },
    {
        ...Pages.updateFloor,
        component: DetailFloor,
        meta: {
            title: 'Update Floor',
            ...meta
        }
    },
    {
        ...Pages.roomChart,
        component: RoomChart,
        meta: {
            title: 'Room Chart',
            ...meta
        }
    },
    {
        ...Pages.listRoom,
        component: ListRoom,
        meta: {
            title: 'List Room',
            ...meta
        }
    },
    {
        ...Pages.createRoom,
        component: DetailRoom,
        meta: {
            title: 'Create Room',
            ...meta
        }
    },
    {
        ...Pages.updateRoom,
        component: DetailRoom,
        meta: {
            title: 'Update Room',
            ...meta
        }
    },
];
export default DormOwnerRouter;
