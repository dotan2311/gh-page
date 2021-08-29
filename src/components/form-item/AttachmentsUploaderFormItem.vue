<template>
    <div>
        <el-form-item>
            <el-upload
                    :auto-upload="false"
                    :file-list="insideFileList"
                    :limit="limit"
                    :on-change="onChange"
                    :on-remove="onRemove"
                    action="#"
                    drag
                    list-type="text"
                    multiple
                    ref="attachmentUploader"
            >
                <el-button class="btn-upload" size="small" slot="trigger" type="text"
                >{{ buttonTitle ? buttonTitle : $t('common.button.selectFiles') }}
                </el-button>
            </el-upload>
        </el-form-item>
    </div>
</template>

<script lang="ts">
    import {Component, Mixins, Prop, Ref, Watch} from 'vue-property-decorator';
    import {Upload as ElUpload} from 'element-ui/types/element-ui';
    import FormItemMixin from '@/components/form-item/FormItemMixin';

    enum Events {
        ON_SELECT = 'on-select',
        ON_REMOVE = 'on-remove',
    }

    @Component
    export default class AttachmentsUploader extends Mixins(FormItemMixin) {
        @Prop({required: false}) private buttonTitle!: string;
        @Prop({required: false}) private fileList: Array<any>;
        @Prop({required: false, default: null}) private limit!: Number;

        private file: any = null;
        private insideFileList: Array<any> = null;
        @Ref('attachmentUploader')
        private attachmentUploaderFormItem: ElUpload;

        public clearFiles(): void {
            this.file = null;
            this.insideFileList = null;
            this.formItemValue = null;
            this.attachmentUploaderFormItem.clearFiles();
        }

        created() {
            this.insideFileList = this.fileList;
        }

        @Watch('fileList')
        private onFileListChange(val: any): void {
            this.insideFileList = val;
        }

        private onChange(file: any, fileList: Array<any>): void {
            this.file = file;
            this.insideFileList = fileList;
            this.$emit(Events.ON_SELECT, fileList);
        }

        private onRemove(file: any, fileList: Array<any>) {
            this.insideFileList = fileList;
            this.$emit(Events.ON_REMOVE, this.insideFileList);
        }
    }
</script>

<style lang="scss" scoped>
    /deep/ .el-upload-dragger {
        width: 100%;
        height: auto;
        border: none;
    }

    .btn-upload {
        text-decoration: underline;
        font-size: 18px;
        line-height: 29px;
        font-weight: 500;
        letter-spacing: 0px;
        color: #1fa9d8;
    }
</style>