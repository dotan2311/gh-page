import Roles from "@/security/Roles";
import DataTableExample from "@/views/common/DataTableExample.vue";
import Pages from '@/router/Pages';
import ManageAccount from '@/views/admin/ManageAccount.vue';
import ManageDorm from '@/views/admin/ManageDorm.vue';


let meta: Object = {
    authorities: [
        Roles.ROLE_SYSTEM_ADMIN,
    ],
    functionScope: 'ADMIN'
};

let SystemAdminRouter = [
    {
        name: "Example DataTable",
        path: "/datatable-example",
        component: DataTableExample,
        meta: {
            title: "Datatable Example"
        }
    },
    {
        ...Pages.manageAccount,
        component: ManageAccount,
        meta: {
            title: 'Manage Account',
            ...meta
        }

    },
    {
        ...Pages.manageDorm,
        component: ManageDorm,
        meta: {
            title: 'Manage Dorm',
            ...meta
        }

    }

];
export default SystemAdminRouter;
