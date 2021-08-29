<template>
    <div class="home">
        <Header></Header>
        <div>
            <h2>{{ $t('formItem.title') }}</h2>
            <el-row>
                <el-button @click="confirm()" type="default">SweetAlert</el-button>
                <el-button @click="handleSuccess()" type="success">Success</el-button>
                <el-button @click="handleInfor()" type="info">Info</el-button>
                <el-button @click="handleWarning()" type="warning">Warning</el-button>
                <el-button @click="handleErorr()" type="danger">Danger</el-button>
            </el-row>
            <el-form class="demo-form-inline" ref="form">
                <p>Text input value : {{ textValue }}</p>
                <text-input-form-item
                        :placeholder="$t('formItem.formInput.placeholder')"
                        :value.sync="textValue"
                        required-label="true"
                        tag="Max name length is 50 characters"
                        title="TextInputFormItem"
                ></text-input-form-item>

                <p>Text area value : {{ textAreaValue }}</p>
                <text-area-form-item
                        :placeholder="$t('formItem.formInput.placeholder')"
                        :tag="textTag"
                        :value.sync="textAreaValue"
                        optional-label="true"
                        title="TextAreaFormItem"
                ></text-area-form-item>

                <image-upload-form-item
                        :tag="textTag"
                        :value.sync="imageUrl"
                        optional-label="true"
                        title="ImageUploadFormItem"
                ></image-upload-form-item>

                <attachments-uploader
                        :tag="textTag"
                        optional-label="true"
                        title="AttachmentUploader"
                ></attachments-uploader>

                <date-range-form-item
                        :endPlaceholder="$t('formItem.formInput.placeholder')"
                        :startPlaceholder="$t('formItem.formInput.placeholder')"
                        :tag="textTag"
                        :value.sync="dateRangePick"
                        optional-label="true"
                        title="DateRange"
                ></date-range-form-item>

                <date-select-form-item
                        :dateFormat="dateFormat"
                        :placeholder="$t('formItem.formInput.placeholder')"
                        :tag="textTag"
                        :value.sync="datePick"
                        required-label="true"
                        title="DateSelect"
                ></date-select-form-item>

                <number-input-form-item
                        :max="50"
                        :min="0"
                        :tag="textTag"
                        :value.sync="numberValue"
                        required-label="true"
                        title="Number Input"
                ></number-input-form-item>

                <p>Radio value : {{ radioValue }}</p>
                <radio-form-item
                        :options="selectOptions"
                        :tag="textTag"
                        :value.sync="radioValue"
                        required-label="true"
                        title="RadioFormItem"
                ></radio-form-item>

                <select-form-item
                        :multipleSelect="true"
                        :options="selectOptions"
                        :tag="textTag"
                        :value.sync="selectedValue"
                        required-label="true"
                        title="SelectFormItem"
                ></select-form-item>
                <switch-form-item
                        :tag="textTag"
                        :value.sync="switchValue"
                        title="SwitchFormItem"
                ></switch-form-item>
                <rich-text-editor-form-item></rich-text-editor-form-item>
            </el-form>
        </div>
    </div>
</template>

<script lang="ts">
    // @ is an alias to /src
    import {Component, Emit, Prop, Ref, Vue} from 'vue-property-decorator';
    import TextInputFormItem from '@/components/form-item/TextInputFormItem.vue';
    import Header from '@/components/layout/modules/Header.vue';
    import TextAreaFormItem from '@/components/form-item/TextAreaFormItem.vue';
    import ImageUploadFormItem from '@/components/form-item/ImageUploadFormItem.vue';
    import AttachmentsUploader from '@/components/form-item/AttachmentsUploaderFormItem.vue';
    import DateRangeFormItem from '@/components/form-item/DateRangeFormItem.vue';
    import DateSelectFormItem from '@/components/form-item/DateSelectFormItem.vue';
    import NumberInputFormItem from '@/components/form-item/NumberInputFormItem.vue';
    import RadioFormItem from '@/components/form-item/RadioFormItem.vue';
    import SelectFormItem from '@/components/form-item/SelectFormItem.vue';
    import SwitchFormItem from '@/components/form-item/SwitchFormItem.vue';
    import RichTextEditorFormItem from '@/components/form-item/RichTextEditorFormItem.vue';
    import {Form as ElForm} from 'element-ui/types/element-ui';
    import AlertService from '@/services/AlertService';
    import SweetAlert from '@/services/SweetAlert';

    interface itemOfSelectOption {
        label: string;
        value: string;
    }

    @Component({
        components: {
            Header,
            TextInputFormItem,
            TextAreaFormItem,
            ImageUploadFormItem,
            AttachmentsUploader,
            DateRangeFormItem,
            DateSelectFormItem,
            NumberInputFormItem,
            RadioFormItem,
            SelectFormItem,
            SwitchFormItem,
            RichTextEditorFormItem
        }
    })
    export default class FormItem extends Vue {
        @Prop() private msg!: string;
        @Prop() private user!: string;

        @Ref('form')
        private form: ElForm;
        private textTag: string;
        private textPlaceholder: string;
        private textValue: string;
        private textAreaValue: string;
        private selectedValue: string[];
        private radioValue: string;
        private imageUrl: string;
        private datePick: string;
        private dateRangePick: string[];
        private numberValue: number;
        private selectOptions: Array<itemOfSelectOption>;
        private switchValue: boolean;
        private dateFormat: string;

        constructor() {
            super();
            this.textTag = 'Name';
            this.textPlaceholder = 'placeholder ...';
            this.textValue = null;
            this.textAreaValue = null;
            this.selectedValue = null;
            this.radioValue = null;
            this.imageUrl = null;
            this.datePick = null;
            this.dateRangePick = null;
            this.numberValue = 0;
            this.selectOptions = [
                {label: 'item1', value: 'abc'},
                {label: 'item2', value: 'bcd'}
            ];
            this.switchValue = true;
            this.dateFormat = 'yyyy/MM/dd HH:mm:ss';
        }

        public validate(): boolean {
            this.form.validate(function(valid: boolean, invalidFields: object) {
                console.log('form valid : ' + valid);
            });
            return true;
        }

        @Emit('saved')
        public onSave(): void {
            console.log('saved');
        }

        private handleSuccess() {
            AlertService.success('Success', 'AAAAA', 1000);
        }

        private handleInfor() {
            AlertService.info('Infor', 'BB', 1000);
        }

        private handleErorr() {
            AlertService.error('Error', 'AAAAA', 1000);
        }

        private handleWarning() {
            AlertService.warning('Warning', 'AAAAA', 1000);
        }

        private confirm() {
            SweetAlert.confirmDelete('Confirm', 'Message', false, 'OK', 'Cancel');
        }

    }
</script>
<style lang="scss" scoped>
    .home {
        margin: auto;
        width: 50%;
        text-align: left;
    }
</style>
