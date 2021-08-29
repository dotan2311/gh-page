<template>
    <label class="required">{{ $t('common.formItem.requiredLabel') }}</label>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component
    export default class RequireLabel extends Vue {
    }
</script>

<style scoped>
    .required {
        position: absolute;
        color: #ff6a6a;
        margin-top: -7px;
        font-size: 18px;
        letter-spacing: 0px;
    }
</style>
