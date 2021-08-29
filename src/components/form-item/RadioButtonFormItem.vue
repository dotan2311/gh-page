<template>
    <div>
        <el-form-item :prop="propName">
            <div class="d-flex inline">
                <InputLabel
                        :optional="optionalLabel"
                        :required="requiredLabel"
                        :text="title"
                        style="width: auto"
                />
            </div>

            <el-radio-group :size="buttonSize" @change="handleChange" v-model="formItemValue">
                <el-radio-button
                        :disabled="disabled"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        v-for="item in options"
                >
                </el-radio-button>
            </el-radio-group>
        </el-form-item>
    </div>
</template>

<script lang="ts">
    import {Component, Mixins, Prop} from 'vue-property-decorator';
    import FormItemMixin from './FormItemMixin';

    @Component
    export default class RadioFormItem extends Mixins(FormItemMixin) {
        @Prop({required: true}) private options!: Array<any>;
        @Prop({required: false}) private buttonSize!: string;
        @Prop({required: false, default: false}) private requiredLabel!: boolean;
        @Prop({required: false, default: false}) private optionalLabel!: boolean;

        public handleChange(): void {
        }
    }
</script>

<style lang="scss" scoped>
    /deep/ .el-radio-button__inner {
        width: 98px;
        background: #ffffff 0% 0% no-repeat padding-box;
    }

    /deep/ .el-radio-button__orig-radio:checked + .el-radio-button__inner {
        color: #108ee9;
        background: #ffffff 0% 0% no-repeat padding-box;;
        border-color: #108ee9;
    }
</style>