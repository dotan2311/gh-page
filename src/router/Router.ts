import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import DataTableExample from '../views/common/DataTableExample.vue';
import Pages from '@/router/Pages';
import SystemAdminRouter from '@/router/system_admin_router';
import Layout from '@/components/layout/Layout.vue';
import UserRouter from '@/router/user_router';
import DormOwnerRouter from '@/router/dorm_owner_router';
import Management from '@/views/dorm-owner/Management.vue';
import AdminMenuAside from '@/views/admin/AdminMenuAside.vue';
import SearchList from '@/views/user/search-list/SearchList.vue';
import Auth from '@/security/Authentication';
import UserEntity from '@/types/classes/UserEntity';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: '/',
        redirect: Pages.home.path,
        component: Layout,
        children: [
            {
                ...Pages.home,
                component: SearchList,
                meta: {
                    title: 'Home'
                }
            },
            ...UserRouter,
            {
                ...Pages.management,
                redirect: Pages.listDorm.path,
                component: Management,
                children: [...DormOwnerRouter]
            },
            {
                ...Pages.adminManagement,
                redirect: Pages.manageAccount.path,
                component: AdminMenuAside,
                children: [...SystemAdminRouter]
            }
        ]
    },
    // {
    //     ...Pages.login,
    //     component: () => import(/* webpackChunkName: "about" */ '../views/login/Login.vue'),
    //     meta: {
    //         title: 'Login Page',
    //         isPublic: true
    //     }
    // },
    {
        ...Pages.maintenance,
        component: () => import(/* webpackChunkName: "about" */ '../views/common/Maintenance.vue'),
        meta: {
            title: 'Maintenance Page',
            isPublic: true
        }
    },
    {
        ...Pages.notFound,
        component: () => import(/* webpackChunkName: "about" */ '../views/common/Error.vue'),
        meta: {
            title: 'Not found',
            error404: true,
            isPublic: true
        }
    },
    {
        ...Pages.forbidden,
        component: () => import(/* webpackChunkName: "about" */ '../views/common/Error.vue'),
        meta: {
            title: 'Access denied',
            error403: true,
            isPublic: true
        }
    },
    {
        path: '/form-item',
        name: 'FormItem',
        component: () => import(/* webpackChunkName: "about" */ '../views/common/FormItem.vue')
    },

    {
        path: '/dataTable',
        name: 'dataTable',
        component: DataTableExample,
        meta: {}
    },
    {
        path: '*',
        redirect: '/'
    }
];

console.log('create router with base ' + process.env.BASE_URL);

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

router.afterEach((to, from) => {
    document.title = to.meta.title;
});

let enableSecurity = process.env.VUE_APP_ENABLE_SECURITY === 'true';

if (enableSecurity) {
    router.beforeEach(async (to, from, next) => {
        let needAuthoritiesToViewPage = to.meta && to.meta.authorities;
        let user = JSON.parse(localStorage.getItem('CurrentUser'));
        if (user != null) {
            let roleNames: Array<string> = [];
            for (let i = 0; i < user.rolename.length; i++) {
                roleNames.push(user.rolename[i].name);
            }
            let currentUser: UserEntity = {
                id: user.id,
                username: user.username,
                avatarUrl: user.avatarUrl,
                roles: roleNames,
                fullName: user.fullName
            };

            let userId = currentUser.id;
            if (!userId) {
                if (to.query.id) Auth.setCurrentUserId(Number(to.query.id));
                else if (to.params.id) Auth.setCurrentUserId(Number(to.params.id));
            }
            var isAuth = false;

            if (user != null  ) {
                isAuth = true;
            }else{
                isAuth = false;
            }

            console.log('checking before enter route ' + to.path + ', auth: ' + isAuth);

            if (needAuthoritiesToViewPage) {
                if (isAuth) {
                    var hasPermission = false;
                    var fakeRoles = currentUser.roles;
                    if (!fakeRoles || fakeRoles.length === 0) {
                        hasPermission = false;
                    }
                    if (fakeRoles.length === 0) {
                        hasPermission = true;
                    }
                    for (let i = 0; i < to.meta.authorities.length; i++) {
                        let valid = fakeRoles.indexOf(to.meta.authorities[i]) > -1;
                        if (valid) {
                            hasPermission = true;
                        }
                    }
                    // let hasPermission = Auth.hasAnyRoles(to.meta.authorities);
                    if (hasPermission) {
                        next();
                    } else {
                        next(Pages.forbidden.path);
                    }
                } else {
                    Auth.logout().then(() => console.log('Un-authenticated'));
                }
            } else {
                // no authorities, so just proceed
                next();
            }
        }else{
            if(to.meta.authorities == 'DORM_OWNER'|| to.meta.authorities == 'USER' || to.meta.authorities == 'SYSTEM_ADMIN'){
                next(Pages.forbidden.path);
            }else{
                next();
            }
            
        }
    });
} else {
    console.log('Disable security');
}

export default router;
