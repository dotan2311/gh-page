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

        <el-radio-group @change="handleChange" v-model="formItemValue">
            <el-radio
                    :disabled="disabled"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    v-for="item in options"
            >
            </el-radio>
        </el-radio-group>
    </el-form-item>
</template>

<script lang="ts">
    import {Component, Mixins, Prop} from 'vue-property-decorator';
    import FormItemMixin from './FormItemMixin';

    @Component
    export default class RadioButtonFormItem extends Mixins(FormItemMixin) {
        @Prop({required: true}) private options!: Array<any>;
        @Prop({required: false, default: false}) private requiredLabel!: boolean;
        @Prop({required: false, default: false}) private optionalLabel!: boolean;

        public handleChange(): void {
            console.log(this.formItemValue);
        }
    }
</script>

<style lang="scss" scoped>
</style>
