<template>
    <div>
        <p class="title">
            <a @click="redirectToListFloor" style="cursor: pointer">Quản lý Tầng</a> >
            {{ detailForm.floorName }}
        </p>
        <el-card class="register-floor">
            <el-form :model="detailForm" :rules="rules" ref="detail-form" v-loading="loading">
                <text-input-form-item
                        :title="$t('floor.listFloor.floorName')"
                        :value.sync="detailForm.floorName"
                        propName="floorName"
                        required-label="true"
                        style="width: 70%"
                ></text-input-form-item>
                <select-form-item
                        :options="detailForm.listDorm"
                        :title="$t('floor.listFloor.dorm')"
                        :value.sync="detailForm.dorm"
                        propName="dorm"
                        required-label="true"
                ></select-form-item>
            </el-form>
            <ButtonCreateOrUpdate
                    :create-fn="onSubmitForm"
                    :title="(floorCode ? $t('common.button.update') : $t('common.button.create'))"
                    class="btn-create"
            ></ButtonCreateOrUpdate>
        </el-card>
    </div>
</template>


<script lang="ts">
    import {Component, Ref, Vue} from 'vue-property-decorator';
    import TextInputFormItem from '@/components/form-item/TextInputFormItem.vue';
    import SelectFormItem from '@/components/form-item/SelectFormItem.vue';
    import ImageUploadFormItem from '@/components/form-item/ImageUploadFormItem.vue';
    import ButtonCreateOrUpdate from '@/components/button/ButtonCreateOrUpdate.vue';
    import Pages from '@/router/Pages';
    import DormApi from '@/api/dorm-owner-api/DormApi';
    import AlertService from '@/services/AlertService';
    import i18n from '@/i18n';
    import {ElForm} from 'element-ui/types/form';
    import FloorApi from '@/api/dorm-owner-api/FloorApi';
    import ItemOfOption from '@/types/ItemOfOption';
    import FloorForm from '@/types/FloorForm';
    import UserEntity from '@/types/classes/UserEntity';
    @Component({
        components: {
            SelectFormItem,
            TextInputFormItem,
            ButtonCreateOrUpdate,
            ImageUploadFormItem
        }
    })
    export default class DetailFloor extends Vue {
        private loading: boolean = false;
        private floorCode: string = null;
        private user: UserEntity = null;
        private userId: number = null;
        private detailForm: FloorForm = {
            floorName: null,
            dorm: null,
            listDorm: [],
        };

        private rules: any = {
            floorName: [
                {
                    required: true,
                    message: String(i18n.t('common.message.fieldIsRequired')),
                    trigger: ['blur'],
                },
                {
                    max: 100,
                    message: "Nhập tối đa 100 ký tự",
                    trigger: ['blur', 'change']
                }
            ],
            dorm: [
                {
                    required: true,
                    message: String(i18n.t('common.message.fieldIsRequired')),
                    trigger: ['blur', 'change'],
                },
            ],
        };

        @Ref('detail-form')
        private form: ElForm;

        created() {
            this.user = JSON.parse(localStorage.getItem('CurrentUser'));
            this.userId = this.user != null ? this.user.id : null;
            this.getListDorm();
            this.floorCode =
                    this.$route.params.floorCode != null ? this.$route.params.floorCode : null;
            if (this.floorCode) {
                this.getFloorByCode();
            }
        }

        public async getListDorm(): Promise<void> {
            try {
                this.loading = true;
                this.detailForm.listDorm = [];
                const response = await DormApi.listForFloor(this.userId);
                if (response) {
                    let size = Array.isArray(response) ? response.length : Object.keys(response).length;
                    for (let index = 0; index < size; index++) {
                        let customDormList = new ItemOfOption();
                        customDormList.value = response[index].id;
                        customDormList.label = response[index].name;
                        this.detailForm.listDorm.push(customDormList);
                    }
                }
            } catch (error) {
                AlertService.error(
                        String(i18n.t('common.alertTitle.failed')),
                        String(i18n.t('common.message.serverErrorMessage')),
                        2000
                );
            } finally {
                this.loading = false;
            }
        }

        public async getFloorByCode(): Promise<void> {
            try {
                this.loading = true;
                const response = await FloorApi.get(this.floorCode);
                if (response) {
                    this.detailForm.floorName = response.name;
                    this.detailForm.dorm = response.dormId;
                }
            } catch (error) {
                AlertService.error(
                        String(i18n.t('common.alertTitle.failed')),
                        String(i18n.t('common.message.serverErrorMessage')),
                        2000
                );
            } finally {
                this.loading = false;
            }
        }

        private async onCreateFloor(): Promise<void> {
            try {
                this.loading = true;
                const floorDto = {
                    name: this.detailForm.floorName,
                    dormId: this.detailForm.dorm,
                    userId: this.userId
                };
                await FloorApi.create(floorDto);
                this.clearForm();
                AlertService.success(
                        String(i18n.t('common.alertTitle.success')),
                        String(i18n.t('common.message.saveSuccess'))
                );
                this.redirectToListFloor();
            } catch (error) {
                if (error.response.data === 'DUPLICATE_CREATE') {
                    AlertService.error(
                            String(i18n.t('common.alertTitle.error')),
                            String(i18n.t('common.message.duplicateCreate'))
                    );
                } else {
                    AlertService.error(
                            String(i18n.t('common.alertTitle.error')),
                            String(i18n.t('common.message.serverErrorMessage')),
                            2000
                    );
                }
            } finally {
                this.loading = false;
            }
        }

        private async onUpdateFloor(): Promise<void> {
            if (this.floorCode != null) {
                try {
                    this.loading = true;
                    const floorDto = {
                        code: this.floorCode,
                        name: this.detailForm.floorName,
                        dormId: this.detailForm.dorm,
                    };
                    await FloorApi.update(floorDto);
                    this.clearForm();
                    AlertService.success(
                            String(i18n.t('common.alertTitle.success')),
                            String(i18n.t('common.message.saveSuccess'))
                    );
                    this.redirectToListFloor();
                } catch (error) {
                    if (error.response.data === 'DUPLICATE_CREATE') {
                        AlertService.error(
                                String(i18n.t('common.alertTitle.error')),
                                String(i18n.t('common.message.duplicateCreate'))
                        );
                    } else {
                        AlertService.error(
                                String(i18n.t('common.alertTitle.error')),
                                String(i18n.t('common.message.serverErrorMessage')),
                                2000
                        );
                    }
                } finally {
                    this.loading = false;
                }
            }
        }

        private async onSubmitForm(): Promise<void> {
            await this.form.validate(async (valid) => {
                if (valid) {
                    if (this.floorCode == null) {
                        await this.onCreateFloor();
                    } else {
                        await this.onUpdateFloor();
                    }
                }
            });
        }

        private redirectToListFloor(): void {
            this.$router.push({
                name: Pages.listFloor.name,
                params: { userId: this.user.id.toString() }
            });
        }

        private clearForm(): void {
            this.form.resetFields();
        }

    }

</script>


<style lang="scss" scoped>
    .title {
        height: 49px;
        text-align: left;
        font-size: 34px;
        font-weight: bold;
    }

    .register-floor {
        margin: auto;
        width: 50%;
        text-align: left;
        padding-bottom: 20px;

        /deep/ .el-col {
            margin-right: 20px;
        }

        .btn-create {
            margin-top: 20px;
            float: right;
        }
    }

</style>
