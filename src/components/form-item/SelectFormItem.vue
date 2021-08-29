<template>
    <div>
        <el-form-item :prop="propName">
            <div class="d-flex inline">
                <InputLabel
                        style="width: auto"
                        :required="requiredLabel"
                        :optional="optionalLabel"
                        :text="title"
                />
            </div>
            <el-select
                    ref="selectForm"
                    filterable
                    v-model="formItemValue"
                    :multiple="multipleSelect"
                    :placeholder="placeholder"
                    :disabled="disabled"
                    @visible-change="handleChange"
                    @change="onSelect"
            >
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        :disabled="itemDisabled"
                >
                </el-option>
            </el-select>
        </el-form-item>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop, Ref, Emit, Watch, Mixins } from 'vue-property-decorator';
    import { Select as ElSelect } from 'element-ui/types/element-ui';
    import FormItemMixin from './FormItemMixin';

    enum Events {
        CHANGE_SELECT = 'on-change',
        ON_SELECT = 'on-select'
    }

    @Component
    export default class SelectFormItem extends Mixins(FormItemMixin) {
        @Prop({ required: true }) private options!: Array<any>;
        @Prop({required: false}) changeFn?: Function;
        @Prop({required: false}) selectFn?: Function;
        @Prop({ required: false, default: false }) private requiredLabel!: boolean;
        @Prop({ required: false, default: false }) private optionalLabel!: boolean;
        @Prop({ required: false, default: false }) private multipleSelect!: boolean;
        @Prop({ required: false, default: false }) private itemDisabled!: boolean;

        @Ref('selectForm')
        private selectForm: ElSelect;

        public async handleChange(): Promise<any> {
            await this.changeFn();
            this.$emit(Events.CHANGE_SELECT);
        }

        public async onSelect(val: any): Promise<any> {
            await this.selectFn(val);
            this.$emit(Events.ON_SELECT);
        }
    }
</script>

<style lang="scss" scoped>
</style>