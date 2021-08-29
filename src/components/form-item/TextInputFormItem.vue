<template>
    <el-form-item :prop="propName" ref="formItem">
        <div style="display: flex; margin-bottom: 10px;">
            <InputLabel
                    :optional="optionalLabel"
                    :required="requiredLabel"
                    :text="title"
                    style="width: auto"
            />
            <span class="text-note" v-if="noteText">{{noteText}}</span>
        </div>

        <el-input :disabled="disabled"
                  :placeholder="placeholder"
                  class="input"
                  v-model="formItemValue"
        />
    </el-form-item>
</template>

<script lang="ts">
    import {Component, Mixins, Prop, Ref} from 'vue-property-decorator';
    import FormItemMixin from './FormItemMixin';
    import {FormItem as ElFormItem} from 'element-ui/types/element-ui';

    @Component
    export default class TextInputFormItem extends Mixins(FormItemMixin) {
        @Prop({required: false, default: false}) private requiredLabel!: boolean;
        @Prop({required: false, default: ''}) private noteText!: string;
        @Prop({required: false, default: false}) private optionalLabel!: boolean;

        @Ref('formItem')
        private formItem: ElFormItem;

    }
</script>

<style lang="scss" scoped>
    .input-label {
        /deep/ .required {
            color: #FF6A6A;
            font-size: 20px !important;
        }
    }
</style>
