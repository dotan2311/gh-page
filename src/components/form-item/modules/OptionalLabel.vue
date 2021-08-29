<template>
    <label class="optional  custom-btn-color">{{$t('formItem.modules.optionalLabel')}}</label>
    <!-- <label class="optional custom-btn-color">{{"Optional Label"}}</label> -->
</template>

<script lang="ts">

    import {Component, Vue} from 'vue-property-decorator';

    @Component
    export default class OptionalLabel extends Vue {

    }
</script>

<style scoped>
    .optional {
        color: #FFF;
        background-color: cornflowerblue;
        padding: 2px 5px;
        margin-left: 5px;
        margin-right: 5px;
        border-radius: 3px;
        font-size: 70%;
    }
</style>
