<template>
    <div class="switch_wrapper">
        <el-switch
                :active-value="true"
                :inactive-value="false"
                @change="onSwitch"
                active-color="#13CE66"
                inactive-color="#4B4B4B"
                v-model="isActive"
        />
        <span class="text-status" v-if="isActive">有効</span>
        <span class="text-status" v-else>無効</span>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue, Watch} from 'vue-property-decorator';

    @Component
    export default class ActiveSwitch extends Vue {
        @Prop({required: true}) value: boolean;
        @Prop({required: false}) onSwitchFn!: (arg: boolean) => void;

        private isActive: boolean = false;

        created() {
            this.isActive = this.value; // Save state value for switch
        }

        public onSwitch(isActive: boolean): void {
            try {
                this.onSwitchFn(isActive);
            } catch (err) {
                // Roll back if error
                this.isActive = !isActive;
            }
        }

        @Watch('value')
        private changeValue(val: boolean) {
            this.isActive = val;
        }
    }
</script>

<style lang="scss" scoped>
    .switch_wrapper {
        display: flex;
        justify-content: center;
        place-items: center;
        padding-top: 10px;

        .text-status {
            margin-left: 5px;
        }
    }
</style>
