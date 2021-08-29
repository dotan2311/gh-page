<template>
    <el-button @click="handleDownloadUseAchievementDL" class="btn-custom btn-download-excel">
        {{ $t('common.button.downloadUseAchievementDL') }}
    </el-button>
</template>

<script lang="ts">

    import {Component, Prop, Vue} from 'vue-property-decorator';

    enum Events {
        DOWNLOAD_MESSAGE = 'download'
    }

    @Component
    export default class ButtonDownloadUseAchievementDL extends Vue {

        @Prop({required: true}) downloadFn!: Function;

        public async handleDownloadUseAchievementDL(): Promise<any> {
            await this.downloadFn();
            this.$emit(Events.DOWNLOAD_MESSAGE);
        }
    }
</script>

<style lang="scss" scoped>
    .btn-download-excel {
        border: none;
        background-color: #D8AD1F !important;
    }
</style>
