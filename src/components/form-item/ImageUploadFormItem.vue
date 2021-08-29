<template>
    <div>
        <el-form-item :prop="propName">
            <el-row>
                <div class="d-flex inline">
                    <InputLabel
                            :optional="optionalLabel"
                            :required="requiredLabel"
                            :text="title"
                            style="width: 25%"/>
                </div>
            </el-row>
            <el-row>
                <el-upload
                        :auto-upload="false"
                        :disabled="disabled"
                        :file-list="fileList"
                        :limit="limit"
                        :multiple="true"
                        :on-change="onChange"
                        :on-remove="onRemove"
                        accept="image/*"
                        action="#"
                        list-type="picture-card"
                        ref="imageUploadFormItem">

                    <i class="el-icon-plus" slot="default"></i>

                    <div slot="file" slot-scope="{file}" class="image-cover">
                        <img :src="file.url" alt="" class="el-upload-list__item-thumbnail"/>
                        <span class="el-upload-list__item-actions">
                            <span
                                    @click="handlePictureCardPreview(file)"
                                    class="el-upload-list__item-preview">
                            <i class="el-icon-zoom-in"></i>
                            </span>
                            <span
                                    @click="onRemove(file)"
                                    class="el-upload-list__item-delete"
                                    v-if="!isDisabled">
                            <i class="el-icon-delete"></i>
                            </span>
                        </span>
                    </div>
                </el-upload>
            </el-row>
        </el-form-item>
        <el-dialog :visible.sync="dialogVisible">
            <img :src="dialogImageUrl" alt="" width="100%">
        </el-dialog>
    </div>
</template>

<script lang="ts">
    import {Component, Mixins, Prop, Ref, Watch} from 'vue-property-decorator';
    import {Upload as ElUpload} from 'element-ui/types/element-ui';
    import FormItemMixin from './FormItemMixin';
    import AlertService from '@/services/AlertService';
    import i18n from '@/i18n';

    enum Events {
        ON_SELECT = 'on-select',
        ON_REMOVE = 'on-remove',
    }

    @Component
    export default class ImageUploadFormItem extends Mixins(FormItemMixin) {
        //@Prop({required: true}) private imageUrl: string;
        @Prop({required: false}) private fileList: Array<any>;
        @Prop({required: false, default: null}) private limit!: Number;
        @Prop({required: false, default: false}) private requiredLabel!: boolean;
        @Prop({required: false, default: false}) private optionalLabel!: boolean;

        @Ref('imageUploadFormItem')
        private imageUploadFormItem: ElUpload;

        private file: any = null;
        private insideFileList: Array<any> = null;
        private dialogVisible: boolean = false;
        private isDisabled: boolean = false;
        private dialogImageUrl: string = '';

        public clearFiles(): void {
            this.file = null;
            this.insideFileList = null;
            this.formItemValue = null;
            this.imageUploadFormItem.clearFiles();
        }

        created() {
            this.insideFileList = this.fileList;
        }

        @Watch('fileList')
        private onFileListChange(val: any): void {
            this.insideFileList = val;
        }

        private onChange(file: any, fileList: Array<any>): void {
            if (this.handleImageChange(file)) {
                this.file = file;
                this.insideFileList = fileList;
                this.$emit(Events.ON_SELECT, this.insideFileList);
            }
        }

        private onRemove(file: any) {
            let index = this.insideFileList.indexOf(file);
            if (index > -1) {
                this.insideFileList.splice(index, 1);
            }
            this.$emit(Events.ON_REMOVE, this.insideFileList);
        }

        private handlePictureCardPreview(file: any) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        }

        private handleImageChange(file: any): boolean {
            const isValidFormat =
                    file.raw.type === 'image/jpeg' ||
                    file.raw.type === 'image/png' ||
                    file.raw.type === 'image/jpg';
            const isLt20M = file.raw.size / 1024 / 1024 < 20;

            if (!isValidFormat) {
                AlertService.error(String(i18n.t('common.alertTitle.failed')), '画像の形式はJPG、JPEG、PNGです。', 1000);
                this.clearFiles();
                return false;
            }
            if (!isLt20M) {
                AlertService.error(String(i18n.t('common.alertTitle.failed')), '画像サイズは20MBを超えることはできません。', 1000);
                this.clearFiles();
                return false;
            }
            return true;
        }
    }
</script>

<style lang="scss" scoped>
    /deep/ .el-upload {
        width: 200px !important;
        height: 200px !important;
    }

    /deep/ .el-icon-plus {
        font-size: 35px;
        font-weight: 600;
        margin-top: 45px;
        vertical-align: middle;
    }

    /deep/ .el-upload-list--picture-card .el-upload-list__item{
        width: 200px !important;
        height: 200px !important;
    }

    .image-cover {
        width: 200px;
        height: 200px;

        /deep/ .el-upload-list__item-thumbnail {
            object-fit: contain !important;
        }
    }
</style>
