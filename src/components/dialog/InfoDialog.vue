<template>
    <el-dialog :visible.sync="dialogVisible">
        <p v-loading="loading">
            {{ dialogMessage ? dialogMessage : $t('common.dialog.infoDialog.infoMessage') }}
        </p>
        <span class="dialog-footer" slot="footer">
            <el-button @click="hide" class="btn-general btn-close">{{
                $t('common.button.close')
            }}</el-button>
        </span>
    </el-dialog>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';

    @Component
    export default class InfoDialog extends Vue {
        @Prop({required: false}) private dialogMessage!: string;

        private loading: boolean = false;
        private dialogVisible: boolean = false;

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

    .btn-close {
        width: 274px;
        background: #ffffff 0% 0% no-repeat padding-box;
        padding: 6.5px;
        border: 2px solid #1fa9d8;
        box-shadow: 0px 2px 6px #0000000a;
        border-radius: 4px;
        font-size: 18px;
        line-height: 40px;
        letter-spacing: 0px;
        color: #1fa9d8;
    }
</style>