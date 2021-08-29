<!--<template>-->
<!--    <div>-->
<!--        <el-form-item id="text-editor" :prop="propName">-->
<!--            <div class="d-flex inline">-->
<!--                <InputLabel-->
<!--                    style="width: auto"-->
<!--                    :required="requiredLabel"-->
<!--                    :optional="optionalLabel"-->
<!--                    :text="title"-->
<!--                />-->
<!--            </div>-->
<!--            <editor-->
<!--                ref="tinyeditor"-->
<!--                :disabled="disabled"-->
<!--                v-model="formItemValue"-->
<!--                api-key="no-api-key"-->
<!--                :initialValue="init"-->
<!--                :init="editorConfig"-->
<!--            />-->
<!--        </el-form-item>-->
<!--    </div>-->
<!--</template>-->

<!--<script lang="ts">-->
<!--import Editor from '@tinymce/tinymce-vue';-->
<!--import FileService from '@/services/FileService';-->
<!--import AlertService from '@/services/AlertService';-->
<!--import $ from 'jquery';-->
<!--import i18n from '@/i18n';-->
<!--import { Component, Vue, Prop, Watch, Emit, Mixins, Ref } from 'vue-property-decorator';-->
<!--import FormItemMixin from './FormItemMixin';-->

<!--enum Events {-->
<!--    /* Update content of text editor when display content changed */-->
<!--    UPDATE_DISPLAY_CONTENT = 'update:displayContent',-->
<!--}-->

<!--interface config {-->
<!--    height: number;-->
<!--    menuBar: boolean;-->
<!--    schema: string;-->
<!--    verify_html: boolean;-->
<!--    valid_children: string;-->
<!--    valid_elements: string;-->
<!--    language: string;-->
<!--    convert_urls: boolean;-->
<!--    plugins: string;-->
<!--    toolbar: string;-->
<!--    default_link_target: string;-->
<!--    image_dimensions: boolean;-->
<!--    file_picker_types: string;-->
<!--    file_picker_callback: Function;-->
<!--}-->

<!--@Component({-->
<!--    components: {-->
<!--        Editor,-->
<!--    },-->
<!--})-->
<!--export default class RichTextEditorFormItem extends Mixins(FormItemMixin) {-->
<!--    @Prop({ required: false, default: 200 }) private height!: number;-->
<!--    @Prop({ required: false }) private type!: string;-->
<!--    @Prop({ required: false }) private plugins!: Array<any>;-->
<!--    @Prop({ required: false, default: false }) private requiredLabel!: boolean;-->
<!--    @Prop({ required: false, default: false }) private optionalLabel!: boolean;-->

<!--    created() {-->
<!--        this.init = this.formItemValue;-->
<!--        this.displayContent = this.formItemValue;-->
<!--        if (this.type === 'BASE') {-->
<!--            this.editorConfig.plugins = this.basePlugins;-->
<!--        }-->
<!--        if (this.plugins && this.plugins.length > 0) {-->
<!--            this.editorConfig.plugins = this.editorConfig.plugins + ' ' + this.plugins.join(' ');-->
<!--        }-->
<!--    }-->

<!--    private init: string;-->
<!--    private displayContent: string;-->
<!--    private basePlugins: string;-->
<!--    private editorConfig: config;-->

<!--    constructor() {-->
<!--        super();-->
<!--        this.init = null;-->
<!--        this.displayContent = null;-->
<!--        this.basePlugins =-->
<!--            'print preview paste importcss searchreplace autolink autosave save directionality visualblocks visualchars fullscreen template codesample charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap emoticons';-->
<!--        this.editorConfig = {-->
<!--            height: this.height,-->
<!--            menuBar: false,-->
<!--            schema: 'html5',-->
<!--            verify_html: false,-->
<!--            valid_children: '+body[style]',-->
<!--            valid_elements: 'script,style[type]',-->
<!--            language: i18n.getCurrentLang() === 'en' ? 'en' : 'jp',-->
<!--            convert_urls: false,-->
<!--            plugins:-->
<!--                'print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap emoticons',-->
<!--            toolbar:-->
<!--                'fontsizeselect formatselect | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | numlist bullist | forecolor backcolor removeformat | link media charmap table image code preview fullscreen',-->
<!--            default_link_target: '_blank',-->
<!--            image_dimensions: true,-->
<!--            file_picker_types: 'file image media',-->
<!--            file_picker_callback: function (callback: any, value: any, meta: any) {-->
<!--                if (meta.filetype === 'image' || meta.filetype === 'media') {-->
<!--                    $('#text-editor').append("<input name=\"image\" type=\"file\" id=\"text-upload\" class=\"hidden\">");-->
<!--                    let textUpload = $('#text-upload');-->
<!--                    textUpload.click();-->
<!--                    textUpload.on('change', function (event: any) {-->
<!--                        $('.is-fullscreen').removeClass('hidden');-->
<!--                        let input: HTMLInputElement = <HTMLInputElement>this;-->
<!--                        FileService.uploadPublicFile(input.files[0])-->
<!--                            .then(function (response) {-->
<!--                                callback(response);-->
<!--                                $('.is-fullscreen').addClass('hidden');-->
<!--                                textUpload.remove();-->
<!--                            })-->
<!--                            .catch(function (error) {-->
<!--                                $('.is-fullscreen').addClass('hidden');-->
<!--                                AlertService.error(String(i18n.t('common.alertTitle.failed')), 'Upload Error');-->
<!--                                textUpload.remove();-->
<!--                            });-->
<!--                    });-->
<!--                }-->
<!--            },-->
<!--        };-->
<!--    }-->

<!--    @Watch('displayContent')-->
<!--    private displayContentChanged(val: string): void {-->
<!--        this.$emit(Events.UPDATE_DISPLAY_CONTENT, val);-->
<!--    }-->

<!--}-->
<!--</script>-->

<!--<style lang="scss" scoped>-->
<!--    .el-form-item.is-error {-->
<!--        /deep/ .tox.tox-tinymce {-->
<!--            border: 1px solid #F56C6C;-->
<!--        }-->
<!--    }-->
<!--</style>-->
