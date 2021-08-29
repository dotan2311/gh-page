import Roles from "@/security/Roles";
import Pages from '@/router/Pages';
import MapView from "@/views/user/search-list/MapView.vue";
import SignIn from '@/views/login/SignIn.vue';
import SignInPassword from '@/views/login/SignInPassword.vue';
import RegisterPassword from '@/views/login/RegisterPassword.vue';
import ProfileUser from '@/views/user/user-info/ProfileUser.vue';
// import UserProfile from '@/views/user/user-info/UserProfile.vue';
import RoomList from '@/views/user/room-list/RoomList.vue';
import ForgotPassword from '@/views/login/ForgotPassword.vue';
import SendEmailForgotPassword from '@/views/login/SendEmailForgotPassword.vue';
import ChangePassword from '@/views/login/ChangePassword.vue';
import EnterEmailToVerify from '@/views/login/EnterEmailToVerify.vue';
import EnterVerifyCode from '@/views/login/EnterVerifyCode.vue';
import ChangeForgotPassword from '@/views/login/ChangeForgotPassword.vue';
import Favourite from '@/views/user/favourite-dorm/Favourite.vue';
let meta: Object = {
    authorities: [
        Roles.ROLE_USER,
    ],
    functionScope: 'USER'
};

let UserRouter = [
    {
        ...Pages.signIn,
        component: SignIn,
        meta: {
            title: 'Sign In',
            
        }

    },
    {
        ...Pages.signInPassword,
        component: SignInPassword,
        meta: {
            title: 'Sign In Password',
            
        }

    },
    {
        ...Pages.registerPassword,
        component: RegisterPassword,
        meta: {
            title: 'Register User',
            
        }

    },
    {
        ...Pages.forgotPassword,
        component: ForgotPassword,
        meta: {
            title: ' Forgot Password',
            
        }

    },
    {
        ...Pages.changePassword,
        component: ChangePassword,
        meta: {
            title: ' Change Password',
            ...meta
        }

    },
    {
        ...Pages.changeForgotPassword,
        component: ChangeForgotPassword,
        meta: {
            title: ' Change Forgot Password',
            
        }
    },
    {
        ...Pages.sendEmailForgotPassword,
        component: SendEmailForgotPassword,
        meta: {
            title: ' Forgot Password',
            
        }

    },
    {
        ...Pages.enterEmailToVerify,
        component: EnterEmailToVerify,
        meta: {
            title: ' Enter Email to verify',
            
        }
    },
    {
        ...Pages.enterVerifyCode,
        component: EnterVerifyCode,
        meta: {
            title: ' Enter verify code ',
            
        }
    },
    {
        ...Pages.homeMap,
        component: MapView,
        meta: {
            title: 'Map',
            
        }
    },
    {
        ...Pages.roomList,
        component: RoomList,
        meta: {
            title: 'Room List',
            
        }
    },
    {
        ...Pages.updateProfileUser,
        component: ProfileUser,
        meta: {
        title: 'Profile User',
        ...meta
        }
        
    },
    {
        ...Pages.favouriteDorm,
        component: Favourite,
        meta: {
            title: 'Favourite Dorm',
            ...meta
        }
    },

    
    

  // // {
  // //   ...Pages.updateProfileUser,
  // //   component: UserProfile,
  // //   meta: {
  // //     title: 'User Profile',
  // //     ...meta
  // //   }

    // {
    //   ...Pages.updateProfileUser,
    //   component: UserProfile,
    //   meta: {
    //     title: 'User Profile',
    //     ...meta
    //   }

    // },

    // },

];
export default UserRouter;
