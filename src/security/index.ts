
import Router from '../router/Router';
// @ts-ignore
import Auth from '@/security/Authentication';
import Pages from '@/router/Pages';



    let enableSecurity = process.env.VUE_APP_ENABLE_SECURITY === 'true';

    if (enableSecurity) {
        Router.beforeEach(async (to, from, next) => {
            let needAuthoritiesToViewPage = to.meta && to.meta.authorities;
        
            let userId = Auth.getCurrentUserId();
            if (!userId) {
                if (to.query.id) Auth.setCurrentUserId(Number(to.query.id));
                else if (to.params.id) Auth.setCurrentUserId(Number(to.params.id));
            }

            
            if (Auth.getAccessToken() && !Auth.getCurrentUser()) {
                
            }

            let isAuth = Auth.isAuthenticated();

            console.log("checking before enter route " + to.path + ", auth: " + isAuth);

            if (needAuthoritiesToViewPage) {
                if (isAuth) {
                    let hasPermission = Auth.hasAnyRoles(to.meta.authorities);
                    if (hasPermission) {
                        next();
                    } else {
                        next(Pages.forbidden.path);
                    }
                } else {

                    Auth.logout().then(() => console.log("Un-authenticated"));
                }
            } else {
                // no authorities, so just proceed
                next();
            }
        });
    } else {
        console.log("Disable security");
    }

