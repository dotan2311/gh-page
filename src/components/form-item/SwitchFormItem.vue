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

            <el-switch
                    :active-color="switchBtnActiveColor"
                    :active-text="activeText"
                    :disabled="disabled"
                    :inactive-color="switchBtnInActiveColor"
                    :inactive-text="inactiveText"
                    style="display: block"
                    v-model="formItemValue"
            />
        </el-form-item>
    </div>
</template>

<script lang="ts">
    import {Component, Mixins, Prop} from 'vue-property-decorator';
    import FormItemMixin from './FormItemMixin';

    @Component
    export default class SwitchFormItem extends Mixins(FormItemMixin) {
        @Prop({required: false, default: false}) private requiredLabel!: boolean;
        @Prop({required: false, default: false}) private optionalLabel!: boolean;
        @Prop({required: false, default: 'Active'}) private activeText!: string;
        @Prop({required: false, default: 'Inactive'}) private inactiveText!: string;
        @Prop({required: false, default: 'rgb(98, 189, 98)'}) private switchBtnActiveColor: string;
        @Prop({
            required: false,
            default: 'rgb(232, 123, 29)'
        }) private switchBtnInActiveColor: string;
    }
</script>

<style scoped>
</style>
