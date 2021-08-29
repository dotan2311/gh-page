<template>
    <div style="display: inline-block; width: 100%;">
        <label class="label">{{text}}</label>

        <RequiredLabel v-show="required"/>
        <OptionalLabel v-show="optional"/>

        <span class="padding-left-20">
            <el-tag type="danger" v-if="validationTip">{{validationTip}}</el-tag>
        </span>
    </div>
</template>

<script lang="ts">

    import {Component, Prop, Vue} from 'vue-property-decorator';

    @Component
    export default class InputLabel extends Vue {

        @Prop({required: true}) private text!: string;
        @Prop({required: false}) private validationTip!: string;
        @Prop({required: false, default: false}) private required!: boolean;
        @Prop({required: false, default: false}) private optional!: boolean;

    }
</script>

<style lang="scss" scoped>
    .label {
        font-size: 16px;
        line-height: 29px;
        font-weight: bold;
        color: #000000;
    }
</style>
