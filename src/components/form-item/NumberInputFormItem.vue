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

            <el-input-number
                    :disabled="disabled"
                    :max="max"
                    :min="min"
                    :controls="false"
                    v-model="formItemValue"
            ></el-input-number>

            <span class="tail-tag">{{tag}}</span>
        </el-form-item>
    </div>
</template>

<script lang="ts">
    import {Component, Mixins, Prop} from 'vue-property-decorator';
    import FormItemMixin from './FormItemMixin';

    @Component
    export default class NumberInputFormItem extends Mixins(FormItemMixin) {
        @Prop({required: false}) private tag!: string;
        @Prop({required: false, default: false}) private requiredLabel!: boolean;
        @Prop({required: false, default: false}) private optionalLabel!: boolean;
        @Prop({required: false}) private min!: number;
        @Prop({required: false}) private max!: number;
    }
</script>

<style lang="scss" scoped>
    .el-input-number {
        width: 100%;
    }
    .tail-tag {
        margin-left: 5px;
        position: absolute;
        color: #909399;
    }
</style>
