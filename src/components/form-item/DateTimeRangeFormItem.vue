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
                :end-placeholder="endPlaceholder"
                :format="dateFormat"
                :prefix-icon="'hide'"
                :start-placeholder="startPlaceholder"
                :unlink-panels="true"
                range-separator="~"
                type="datetimerange"
                v-model="formItemValue"
        >
        </el-date-picker>
    </el-form-item>
</template>
<script lang="ts">
    import {Component, Mixins, Prop} from 'vue-property-decorator';
    import FormItemMixin from './FormItemMixin';

    enum Events {
        UPDATE_VALUE = '"update:value"'
    }

    @Component
    export default class DateTimeRangeFormItem extends Mixins(FormItemMixin) {
        @Prop({required: false}) private noteText!: string;
        @Prop({required: false, default: false}) private requiredLabel!: boolean;
        @Prop({required: false, default: false}) private optionalLabel!: boolean;
        @Prop({required: false}) private startPlaceholder!: string;
        @Prop({required: false}) private endPlaceholder!: string;
        @Prop({required: false}) private dateFormat: string;
    }
</script>
<style lang="scss" scoped>
    /deep/ .el-range-editor.el-input__inner {
        max-width: 500px;
        border: none;

        .el-range-separator {
            font-size: 20px;
        }

        .el-range-input {
            border: 2px solid #767778;
            border-radius: 5px;
        }

    }
</style>