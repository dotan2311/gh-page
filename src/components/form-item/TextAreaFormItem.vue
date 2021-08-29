<template>
    <el-form-item :prop="propName" ref="formItem">
        <div class="d-flex inline">
            <InputLabel
                    :optional="optionalLabel"
                    :required="requiredLabel"
                    :text="title"
                    style="width: auto"
            />
        </div>
        <el-input
                :autosize="autoSize"
                :disabled="disabled"
                :maxlength="maxLength"
                :placeholder="placeholder"
                type="textarea"
                v-model="formItemValue"
        />
    </el-form-item>
</template>

<script lang="ts">
    import {Component, Mixins, Prop, Ref} from 'vue-property-decorator';
    import FormItemMixin from './FormItemMixin';
    import {FormItem as ElFormItem} from 'element-ui/types/element-ui';

    @Component
    export default class TextAreaFormItem extends Mixins(FormItemMixin) {
        @Prop({required: false, default: false}) private requiredLabel!: boolean;
        @Prop({required: false, default: false}) private optionalLabel!: boolean;
        @Prop({required: false, default: false}) private autoSize!: any;
        @Prop({required: false, default: false}) private maxLength!: number;

        @Ref('formItem')
        private formItem: ElFormItem;

    }
</script>

<style lang="scss" scoped>
</style>
