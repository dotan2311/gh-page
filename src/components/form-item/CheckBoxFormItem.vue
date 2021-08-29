<template>
    <el-form-item :prop="propName">
        <div class="d-flex inline">
            <InputLabel
                    :optional="optionalLabel"
                    :required="requiredLabel"
                    :text="title"
                    style="width: auto"
            />
        </div>

        <el-checkbox-group v-model="formItemValue">
            <el-checkbox
                    :disabled="disabled"
                    :key="item.value"
                    :label="item.value"
                    :value="item.value"
                    v-for="item in options"
            >
                {{item.label}}
            </el-checkbox>
        </el-checkbox-group>
    </el-form-item>

</template>

<script lang="ts">
    import {Component, Mixins, Prop} from 'vue-property-decorator';
    import FormItemMixin from './FormItemMixin';

    @Component
    export default class CheckBoxFormItem extends Mixins(FormItemMixin) {
        @Prop({required: true}) private options!: Array<any>;
        @Prop({required: false, default: false}) private requiredLabel!: boolean;
        @Prop({required: false, default: false}) private optionalLabel!: boolean;
    }
</script>

<style lang="scss" scoped>
</style>

