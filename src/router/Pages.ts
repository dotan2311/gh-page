const dormOwnerPrefix = '/dorm-owner/:userId';

let Pages = {
    /** common pages **/
    // login: { name: 'login', path: '/login' },
    // home: { name: 'home', path: '/home' },
    redirect: { name: 'redirect', path: '/redirect' },
    notFound: { name: 'notFound', path: '/not-found' },
    forbidden: { name: 'forbidden', path: '/forbidden' },
    maintenance: { name: 'maintenance', path: '/maintenance' },

    // exception: {name: "exception", path: `${companyFunctionPrefix}/exception`},

    /* admin pages*/
    manageAccount: { name: 'manageAccount', path: '/admin/manage-account', label: 'Manage Account' },
    manageDorm: { name: 'manageDorm', path: '/admin/manage-dorm', label: 'Manage Dorm' },
    adminManagement: { name: 'management', path: `/admin`, label: 'Management' },

    /* user pages*/
    home: { name: 'home', path: `/home`, label: 'Home Page' },
    homeMap: { name: 'homeMap', path: `/home/map`, label: 'Home Page Map' },
    favouriteDorm: { name: 'favouriteDorm', path: `/favourite-dorm`, label: 'Favourite Dorm' },
    
    signIn: { name: 'signIn', path: `/sign-in`, label: 'Sign In' },
    signInPassword: {
        name: 'signInPassword',
        path: `/sign-in-password/:username`,
        label: 'Sign In password'
    },
    registerPassword: {
        name: 'registerPassword',
        path: `/register-password/:username`,
        label: 'Register Password'
    },
    forgotPassword: {
        name: 'forgotPassword',
        path: `/recover-password/:username`,
        label: 'Forgot Password'
    },
    updateProfileUser: {
        name: 'updateProfileUser',
        path: `/update-profile-user`,
        label: 'Update Profile User'
    },
    changePassword: { name: 'changePassword', path: `/change-password`, label: 'Change Password' },
    changeForgotPassword: {
        name: 'changeForgotPassword',
        path: `/change-forgotPassword/:username`,
        label: 'Change Forgot Password'
    },
    sendEmailForgotPassword: {
        name: 'sendEmailForgotPassword',
        path: `/recoverToEmail-password/:username`,
        label: 'Send Email Forgot Password'
    },
    enterEmailToVerify: {
        name: 'enterEmailToVerify',
        path: `/email-to-verify/:username`,
        label: 'Enter Email To Verify'
    },
    enterVerifyCode: {
        name: 'enterVerifyCode',
        path: `/verify/:email`,
        label: 'Enter verify code'
    },
    // updateProfileUser: {name: "editProfileUser", path: `/edit-profile-user` , label: "Edit Profile User"},
    roomList: { name: 'roomList', path: `/room-list/:code/`, label: 'Room List' },

    /* dorm owner pages*/
    management: { name: 'management', path: `${dormOwnerPrefix}/management`, label: 'Management' },

    listDorm: { name: 'listDorm', path: `${dormOwnerPrefix}/dorm/list`, label: 'List Dorm' },
    createDorm: {
        name: 'createDorm',
        path: `${dormOwnerPrefix}/dorm/create`,
        label: 'Create Dorm'
    },
    updateDorm: {
        name: 'updateDorm',
        path: `${dormOwnerPrefix}/dorm/update/:dormCode`,
        label: 'Update Dorm'
    },

    listFloor: { name: 'listFloor', path: `${dormOwnerPrefix}/floor/list`, label: 'List Floor' },
    createFloor: {
        name: 'createFloor',
        path: `${dormOwnerPrefix}/floor/create`,
        label: 'Create Floor'
    },
    updateFloor: {
        name: 'updateFloor',
        path: `${dormOwnerPrefix}/floor/update/:floorCode`,
        label: 'Update Floor'
    },
    roomChart: { name: 'listChart', path: `${dormOwnerPrefix}/room/chart`, label: 'Room Chart' },
    listRoom: { name: 'listRoom', path: `${dormOwnerPrefix}/room/list`, label: 'List Room' },
    createRoom: {
        name: 'createRoom',
        path: `${dormOwnerPrefix}/room/create`,
        label: 'Create Room'
    },
    updateRoom: {
        name: 'updateRoom',
        path: `${dormOwnerPrefix}/room/update/:roomCode`,
        label: 'Update Room'
    },
    homeStatistic: {
        name: 'homeStatistic',
        path: `${dormOwnerPrefix}/statistic`,
        label: 'Home Statistic'
    }
};

export default Pages;
