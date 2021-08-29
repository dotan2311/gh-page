<template>
    <p>Redirecting....</p>
</template>

<script lang="ts">

    import {Component, Vue} from 'vue-property-decorator';
    //import Auth from "@/security/Authentication";

    @Component
    export default class RedirectComponent extends Vue {

        beforeMount() {
            // let companyCode = this.$route.query.code;
            //
            // if (companyCode != null && Auth.hasAnyRoles([Roles.ROLE_SYSTEM_ADMIN])) {
            //     companyCode = String(companyCode);
            // } else {
            //     companyCode = Auth.getCurrentUser().company.code;
            // }
            //
            // Auth.setCompanyCode(companyCode);
            //
            // this.$router.push({name: Pages.appManage.name, params: {companyCode: companyCode}});
            /**
             * TODO: perform redirect here.
             */
        }
    }
</script>

<style scoped>

</style>
