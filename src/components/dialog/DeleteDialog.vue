<template>
    <el-row>
        <el-dialog :visible.sync="dialogVisible" ref="deleteDialog" v-loading="loading">
            <p>
                {{ dialogMessage ? dialogMessage : $t('common.dialog.deleteDialog.deleteMessage') }}
            </p>
            <span class="dialog-footer" slot="footer">
                <el-button @click="cancelConfirm" class="btn-general btn-cancel">{{
                        $t('common.button.cancel')
                    }}</el-button>
                <el-button @click="deleteConfirm" class="btn-general btn-ok">{{
                        $t('common.button.OK')
                    }}</el-button>
            </span>
        </el-dialog>
        <InfoDialog :dialog-message="$t('common.dialog.infoDialog.infoDeleteMessage')"
                    ref="info-dialog"></InfoDialog>
    </el-row>
</template>

<script lang="ts">
    import {Component, Prop, Ref, Vue} from 'vue-property-decorator';
    import InfoDialog from '@/components/dialog/InfoDialog.vue';

    enum Events {
        DELETE_MESSAGE = 'delete',
        HIDE_MESSAGE = 'hide',
    }

    @Component({
        components: {
            InfoDialog
        }
    })
    export default class DeleteDialog extends Vue {
        @Prop({required: true}) private deleteFn: Function;
        @Prop({required: false}) private dialogMessage!: string;

        @Ref('info-dialog')
        private infoDialog: InfoDialog;

        private loading: boolean = false;
        private dialogVisible: boolean = false;
        private entityCode: string = null;

        public setCode(code: string) {
            this.entityCode = code;
        }

        public async deleteConfirm(): Promise<any> {
            this.loading = true;
            await this.deleteFn(this.entityCode);
            this.loading = false;
            this.hide();
            this.$emit(Events.DELETE_MESSAGE);
            this.infoDialog.show();
        }

        public cancelConfirm(): void {
            this.$emit(Events.HIDE_MESSAGE);
            this.hide();
        }

        public show(): void {
            this.dialogVisible = true;
        }

        public hide(): void {
            this.dialogVisible = false;
        }
    }
</script>

<style lang="scss" scoped>
    /deep/ .el-dialog {
        top: 100px;
        width: 702px;
        height: 324px;
        background: #ffffff 0% 0% no-repeat padding-box;
        border: 2px solid #dedede;
        border-radius: 27px;
        text-align: center;
    }

    /deep/ .el-dialog__body {
        margin-top: 40px;
        color: #000000;
        font-size: 20px;
        line-height: 29px;
        font-weight: bold;
        letter-spacing: 0px;
    }

    /deep/ .el-dialog__footer {
        margin-top: 40px;
        text-align: center;
    }

    /deep/ .el-icon-close:before {
        content: unset;
    }

    /deep/ .el-button + .el-button {
        margin-left: 26px;
    }

    .btn-general {
        width: 274px;
        box-shadow: 0px 2px 6px #0000000a;
        border-radius: 4px;
    }

    .btn-ok {
        background: #1fa9d8 0% 0% no-repeat padding-box;
        padding: 7.5px;
        font-size: 18px;
        line-height: 40px;
        letter-spacing: 0px;
        color: #ffffff;
    }

    .btn-cancel {
        background: #ffffff 0% 0% no-repeat padding-box;
        padding: 6.5px;
        border: 2px solid #1fa9d8;
        font-size: 18px;
        line-height: 40px;
        letter-spacing: 0px;
        color: #1fa9d8;
    }

</style>
