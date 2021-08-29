<template>
    <el-button @click="handleAdd" class="btn-custom btn-add">
        {{ title }}
    </el-button>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';

    enum Events {
        ADD_MESSAGE = 'add',
    }

    @Component
    export default class ButtonAdd extends Vue {
        @Prop({required: false, default: 'Add'}) title!: string;

        public handleAdd(): any {
            this.$emit(Events.ADD_MESSAGE);
        }
    }
</script>

<style lang="scss" scoped>
    .btn-add {
        border: none;
        color: #FFFFFF;
        background-color: #0E5BA9 !important;
    }
</style>
