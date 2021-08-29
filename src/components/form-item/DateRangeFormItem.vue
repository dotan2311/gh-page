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
                :start-placeholder="startPlaceholder"
                range-separator="~"
                type="daterange"
                v-model="formItemValue"
        >
        </el-date-picker>
    </el-form-item>
</template>
<script lang="ts">
    import {Component, Mixins, Prop} from 'vue-property-decorator';
    import FormItemMixin from './FormItemMixin';

    @Component
    export default class DateRangeFormItem extends Mixins(FormItemMixin) {
        @Prop({required: false}) private noteText!: string;
        @Prop({required: false, default: false}) private requiredLabel!: boolean;
        @Prop({required: false, default: false}) private optionalLabel!: boolean;
        @Prop({required: false}) private startPlaceholder!: string;
        @Prop({required: false}) private endPlaceholder!: string;
        @Prop({required: false}) private dateFormat: string;
    }
</script>
<style lang="scss" scoped>
    /deep/
    .el-range-editor.el-input__inner {
        max-width: 500px;
    }
</style>