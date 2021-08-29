<template>
    <el-row>
        <el-dialog :visible.sync="dialogVisible" ref="confirmDialog" v-loading="loading">
            <p>
                {{ dialogMessage ? dialogMessage : $t('common.dialog.confirmDialog.confirmMessage')
                }}
            </p>

            <span class="dialog-footer" slot="footer">
                <el-button @click="cancelConfirm" class="btn-general btn-cancel">{{
                        $t('common.button.cancel')
                    }}</el-button>
                <el-button @click="confirm" class="btn-general btn-confirm">{{
                        $t('common.button.OK')
                    }}</el-button>
            </span>
        </el-dialog>
        <InfoDialog :dialog-message="dialogSuccess? dialogSuccess: $t('common.dialog.infoDialog.infoMessage')"
                    ref="info-dialog"></InfoDialog>
    </el-row>
</template>

<script lang="ts">
    import {Component, Prop, Ref, Vue} from 'vue-property-decorator';
    import InfoDialog from '@/components/dialog/InfoDialog.vue';
    import AlertService from '@/services/AlertService';
    import i18n from '@/i18n';

    enum Events {
        CONFIRM_MESSAGE = 'confirm',
        HIDE_MESSAGE = 'hide',
    }

    @Component({
        components: {
            InfoDialog
        }
    })
    export default class ConfirmDialog extends Vue {
        public dialogVisible: boolean = false;
        @Prop({required: true}) private confirmFn: any;
        @Prop({required: false}) private dialogTitle!: string;
        @Prop({required: false}) private dialogMessage!: string;
        @Prop({required: false}) private dialogSuccess!: string;
        @Ref('info-dialog')
        private infoDialog: InfoDialog;
        private loading: boolean = false;

        public async confirm(): Promise<any> {
            this.loading = true;
            const self = this;
            await this.confirmFn().then((response: any) => {
                if (response && response.error) {
                    //error custom
                    if (response.title) {
                        self.confirmFail(response.title, response.mes);
                    } else {
                        self.confirmFail();
                    }
                } else {
                    //success
                    self.confirmSuccess();
                }
            }).catch((error: any) => {
                //error default
                self.confirmFail();
            });
            this.loading = false;
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

        public confirmSuccess() {
            this.hide();
            this.infoDialog.show();
            this.$emit(Events.CONFIRM_MESSAGE);
        }

        public confirmFail(title: string = String(i18n.t('common.alertTitle.failed')),
                           mes: string = String(i18n.t('common.message.serverErrorMessage'))) {
            this.hide();
            AlertService.error(title, mes);
        }
    }
</script>

<style lang="scss" scoped>
    /deep/ .el-dialog {
        top: 100px !important;
        width: 702px !important;
        height: 324px !important;
        background: #ffffff 0% 0% no-repeat padding-box !important;
        border: 2px solid #dedede !important;
        border-radius: 27px !important;
        text-align: center !important;
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
        content: unset !important;
    }

    /deep/ .el-button + .el-button {
        margin-left: 26px !important;
    }

    .btn-general {
        width: 274px;
        box-shadow: 0px 2px 6px #0000000a;
        border-radius: 4px;
    }

    .btn-confirm {
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
