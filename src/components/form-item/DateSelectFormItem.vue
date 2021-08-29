<template>
    <el-form-item :prop="propName">
        <div class="d-flex inline">
            <InputLabel
                    :optional="optionalLabel"
                    :required="requiredLabel"
                    :text="title"
                    style="width: auto"
            />
            <span class="text-note" v-if="noteText">{{noteText}}</span>
        </div>

        <el-date-picker
                :disabled="disabled"
                :editable="false"
                :format="displayFormat"
                :placeholder="placeholder"
                :value-format="valueFormat"
                style="width: 100%"
                type="datetime"
                v-model="formItemValue"
        >
        </el-date-picker>
    </el-form-item>
</template>
<script lang="ts">
    import {Component, Mixins, Prop} from 'vue-property-decorator';
    import FormItemMixin from './FormItemMixin';

    @Component
    export default class DateSelectFormItem extends Mixins(FormItemMixin) {
        @Prop({required: false}) private noteText!: string;
        @Prop({required: false, default: false}) private requiredLabel!: boolean;
        @Prop({required: false, default: false}) private optionalLabel!: boolean;
        @Prop({required: false}) private displayFormat: string;
        @Prop({required: false}) private valueFormat: string;
    }
</script>
<style scoped>
</style>