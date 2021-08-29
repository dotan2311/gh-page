<template>
    <div>
        <p class="title">
            <a @click="redirectToListDorm" style="cursor: pointer">Quản lý Dãy</a> >
            {{ detailForm.dormName }}
        </p>
        <el-card class="register-dorm">
            <el-form :model="detailForm" :rules="rules" ref="detail-form" v-loading="loading">
                <text-input-form-item
                    :title="$t('dorm.listDorm.dormName')"
                    :value.sync="detailForm.dormName"
                    propName="dormName"
                    required-label="true"
                    style="width: 70%"
                ></text-input-form-item>
                <image-upload-form-item
                    :file-list="detailForm.dormImages"
                    :title="$t('dorm.listDorm.dormImages')"
                    @on-remove="handleRemoveFile"
                    @on-select="handleSelectFile"
                    propName="dormImages"
                    required-label="true"
                >
                </image-upload-form-item>

                <el-form
                    :model="detailForm.address"
                    :rules="rules"
                    ref="detail-address-form"
                    v-loading="loading"
                >
                    <el-card>
                        <el-row>
                            <h2>Toạ độ</h2>
                            <el-link @click="dialogVisible = true" type="primary"
                                >Hướng dẫn lấy toạ độ
                            </el-link>
                            <el-dialog :visible.sync="dialogVisible">
                                <img
                                    alt="how-to-get-coordinates"
                                    src="../../../../assets/images/how-to-get-coordinates.png"
                                    style="width: 100%"
                                />
                            </el-dialog>
                        </el-row>

                        <el-row>
                            <el-col :span="10">
                                <number-input-form-item
                                    :title="$t('dorm.listDorm.latitude')"
                                    :value.sync="detailForm.address.latitude"
                                    propName="latitude"
                                    required-label="true"
                                ></number-input-form-item>
                            </el-col>
                            <el-col :span="10">
                                <number-input-form-item
                                    :title="$t('dorm.listDorm.longitude')"
                                    :value.sync="detailForm.address.longitude"
                                    propName="longitude"
                                    required-label="true"
                                ></number-input-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="10">
                                <select-form-item
                                    :change-fn="getListDistrict"
                                    :options="detailForm.listDistrict"
                                    :title="$t('dorm.listDorm.district')"
                                    :value.sync="detailForm.address.district"
                                    propName="district"
                                    required-label="true"
                                >
                                </select-form-item>
                            </el-col>
                            <el-col :span="10">
                                <select-form-item
                                    :change-fn="getListSubDistrict"
                                    :options="detailForm.listSubDistrict"
                                    :title="$t('dorm.listDorm.subDistrict')"
                                    :value.sync="detailForm.address.subDistrict"
                                    propName="subDistrict"
                                    required-label="true"
                                >
                                </select-form-item>
                            </el-col>
                        </el-row>
                        <text-input-form-item
                            :title="$t('dorm.listDorm.civilGroup')"
                            :value.sync="detailForm.address.civilGroup"
                            style="width: 70%"
                        ></text-input-form-item>
                        <text-input-form-item
                            :title="$t('dorm.listDorm.specificAddress')"
                            :value.sync="detailForm.address.specificAddress"
                            propName="specificAddress"
                            required-label="true"
                        ></text-input-form-item>
                    </el-card>
                </el-form>

                <el-card style="margin-top: 20px">
                    <check-box-form-item
                        :options="listDormUtility"
                        :title="$t('dorm.listDorm.utilities')"
                        :value.sync="detailForm.utilities"
                    ></check-box-form-item>
                    <text-area-form-item
                            prop-name="description"
                        :title="$t('dorm.listDorm.description')"
                        :value.sync="detailForm.description"
                    ></text-area-form-item>
                </el-card>
            </el-form>
            <ButtonCreateOrUpdate
                :create-fn="onSubmitForm"
                :title="dormCode ? $t('common.button.update') : $t('common.button.create')"
                class="btn-create"
            ></ButtonCreateOrUpdate>
        </el-card>
    </div>
</template>

<script lang="ts">
    import { Component, Ref, Vue } from 'vue-property-decorator';
    import TextInputFormItem from '@/components/form-item/TextInputFormItem.vue';
    import TextAreaFormItem from '@/components/form-item/TextAreaFormItem.vue';
    import SelectFormItem from '@/components/form-item/SelectFormItem.vue';
    import NumberInputFormItem from '@/components/form-item/NumberInputFormItem.vue';
    import ImageUploadFormItem from '@/components/form-item/ImageUploadFormItem.vue';
    import CheckBoxFormItem from '@/components/form-item/CheckBoxFormItem.vue';
    import ButtonCreateOrUpdate from '@/components/button/ButtonCreateOrUpdate.vue';
    import Pages from '@/router/Pages';
    import DormApi from '@/api/dorm-owner-api/DormApi';
    import AlertService from '@/services/AlertService';
    import i18n from '@/i18n';
    import { ElForm } from 'element-ui/types/form';
    import DistrictApi from '@/api/dorm-owner-api/DistrictApi';
    import ItemOfOption from '@/types/ItemOfOption';
    import SubDistrictApi from '@/api/dorm-owner-api/SubDistrictApi';
    import DormForm from '@/types/DormForm';
    import UserEntity from '@/types/classes/UserEntity';

    @Component({
        components: {
            SelectFormItem,
            TextInputFormItem,
            ButtonCreateOrUpdate,
            ImageUploadFormItem,
            TextAreaFormItem,
            CheckBoxFormItem,
            NumberInputFormItem
        }
    })
    export default class DetailDorm extends Vue {
        private loading: boolean = false;
        private dormCode: string = null;
        private userId: number = null;
        private dialogVisible: boolean = false;
        private user: UserEntity = null;
        private detailForm: DormForm = {
            dormName: null,
            dormImages: [],
            address: {
                code: null,
                specificAddress: null,
                longitude: null,
                latitude: null,
                district: null,
                subDistrict: null,
                civilGroup: null
            },
            listDistrict: [],
            listSubDistrict: [],
            description: null,
            utilities: []
        };

        private listDormUtility: Array<any> = [
            { label: 'Chỗ để xe', value: '0' },
            { label: 'Dịch vụ dọn phòng', value: '1' },
            { label: 'Dịch vụ đưa đón', value: '2' }
        ];

        private listFileRaw: Array<any> = [];
        private listUploadedCode: Array<any> = [];

        private rules: any = {
            dormName: [
                {
                    required: true,
                    message: String(i18n.t('common.message.fieldIsRequired')),
                    trigger: ['blur']
                },
                {
                    max: 100,
                    message: "Nhập tối đa 100 ký tự",
                    trigger: ['blur', 'change']
                }
            ],
            dormImages: [
                {
                    required: true,
                    message: String(i18n.t('common.message.imageIsRequired')),
                    trigger: ['blur']
                }
            ],
            longitude: [
                {
                    required: true,
                    message: String(i18n.t('common.message.fieldIsRequired')),
                    trigger: ['blur']
                },
                {
                    pattern: /^-?([1]?[0-7][1-9]|[1]?[1-8][0]|[1-9]?[0-9])\.{1}\d{1,6}/,
                    message: String(i18n.t('common.message.fieldIsRequired')),
                    trigger: ['blur', 'change']
                }
            ],
            latitude: [
                {
                    required: true,
                    message: String(i18n.t('common.message.fieldIsRequired')),
                    trigger: ['blur']
                },
                {
                    pattern: /^-?([1-8]?[1-9]|[1-8]0)\.{1}\d{1,6}/,
                    message: String(i18n.t('common.message.fieldIsRequired')),
                    trigger: ['blur', 'change']
                }
            ],
            district: [
                {
                    required: true,
                    message: String(i18n.t('common.message.fieldIsRequired')),
                    trigger: ['blur', 'change']
                }
            ],
            subDistrict: [
                {
                    required: true,
                    message: String(i18n.t('common.message.fieldIsRequired')),
                    trigger: ['blur', 'change']
                }
            ],
            specificAddress: [
                {
                    required: true,
                    message: String(i18n.t('common.message.fieldIsRequired')),
                    trigger: ['blur']
                }
            ],
            description: [
                {
                    max: 500,
                    message: "Nhập tối đa 500 ký tự",
                    trigger: ['blur', 'change']
                }
            ]
        };

        @Ref('detail-form')
        private detailFormRef: ElForm;

        @Ref('detail-address-form')
        private detailAddressFormRef: ElForm;

        created() {
            this.user = JSON.parse(localStorage.getItem('CurrentUser'));
            this.userId = this.user != null ? this.user.id : null;
            this.dormCode =
                this.$route.params.dormCode != null ? this.$route.params.dormCode : null;
            if (this.dormCode) {
                this.getDormByCode();
            }
        }

        public async getDormByCode(): Promise<void> {
            try {
                this.loading = true;
                const response = await DormApi.get(this.dormCode);
                if (response) {
                    this.detailForm.dormName = response.name;
                    response.dormImages.forEach(
                        (image: { code: string; name: string; bytes: any }) => {
                            let tempImage: any = {
                                code: image.code,
                                name: image.name,
                                url: URL.createObjectURL(this.b64toBlob(image.bytes, 'image/png'))
                            };
                            this.detailForm.dormImages.push(tempImage);
                        }
                    );
                    this.detailForm.address.code = response.address.code;
                    this.detailForm.address.specificAddress = response.address.specificAddress;
                    this.detailForm.address.longitude = response.address.longitude;
                    this.detailForm.address.latitude = response.address.latitude;
                    await this.getListDistrict();
                    this.detailForm.address.district =
                        response.address.district != null ? response.address.district.id : null;
                    await this.getListSubDistrict();
                    this.detailForm.address.subDistrict =
                        response.address.subDistrict != null
                            ? response.address.subDistrict.id
                            : null;
                    this.detailForm.address.civilGroup = response.address.civilGroupEntity.name;
                    this.detailForm.description = response.description;
                    if (response.utilities.includes('HAS_PARKING')) {
                        this.detailForm.utilities.push('0');
                    }
                    if (response.utilities.includes('HAS_SANITIZATION')) {
                        this.detailForm.utilities.push('1');
                    }
                    if (response.utilities.includes('HAS_TRANSPORTATION')) {
                        this.detailForm.utilities.push('2');
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

        private async getListDistrict(): Promise<void> {
            try {
                this.loading = true;
                this.detailForm.listDistrict = [];
                const response = await DistrictApi.listAll();
                if (response) {
                    let size = Array.isArray(response)
                        ? response.length
                        : Object.keys(response).length;
                    for (let index = 0; index < size; index++) {
                        let customDistrictList = new ItemOfOption();
                        customDistrictList.value = response[index].id;
                        customDistrictList.label = response[index].name;
                        this.detailForm.listDistrict.push(customDistrictList);
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

        private async getListSubDistrict(): Promise<void> {
            try {
                this.loading = true;
                if (this.detailForm.address.district) {
                    this.detailForm.listSubDistrict = [];
                    const response = await SubDistrictApi.listAllByDistrictId(
                        this.detailForm.address.district
                    );
                    if (response) {
                        let size = Array.isArray(response)
                            ? response.length
                            : Object.keys(response).length;
                        for (let index = 0; index < size; index++) {
                            let customSubDistrictList = new ItemOfOption();
                            customSubDistrictList.value = response[index].id;
                            customSubDistrictList.label = response[index].name;
                            this.detailForm.listSubDistrict.push(customSubDistrictList);
                        }
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

        private async onCreateDorm(): Promise<void> {
            try {
                this.loading = true;
                const dormDto = {
                    userId: this.userId,
                    name: this.detailForm.dormName,
                    address: {
                        longitude: this.detailForm.address.longitude,
                        latitude: this.detailForm.address.latitude,
                        districtId: this.detailForm.address.district,
                        subDistrictId: this.detailForm.address.subDistrict,
                        civilGroup: this.detailForm.address.civilGroup,
                        specificAddress: this.detailForm.address.specificAddress
                    },
                    utilities: this.detailForm.utilities,
                    description: this.detailForm.description
                };
                let params = new FormData();
                params.append(
                    'dormDto',
                    new Blob([JSON.stringify(dormDto)], { type: 'application/json' })
                );
                if (this.detailForm.dormImages) {
                    this.detailForm.dormImages.forEach((element: any) => {
                        if (element.status == 'ready') {
                            this.listFileRaw.push(element.raw);
                        }
                    });
                    if (this.listFileRaw) {
                        for (let i = 0; i < this.listFileRaw.length; i++) {
                            params.append('fileImages', this.listFileRaw[i]);
                        }
                    }
                }
                await DormApi.create(params);
                this.clearForm();
                AlertService.success(
                    String(i18n.t('common.alertTitle.success')),
                    String(i18n.t('common.message.saveSuccess'))
                );
                this.redirectToListDorm();
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

        private async onUpdateDorm(): Promise<void> {
            if (this.dormCode != null) {
                try {
                    this.loading = true;
                    let params = new FormData();
                    if (this.detailForm.dormImages) {
                        this.detailForm.dormImages.forEach((element: any) => {
                            if (element.status == 'ready') {
                                this.listFileRaw.push(element.raw);
                            } else if (element.status == 'success' || element.code) {
                                this.listUploadedCode.push(element.code);
                            }
                        });
                        if (this.listFileRaw) {
                            for (let i = 0; i < this.listFileRaw.length; i++) {
                                params.append('fileImages', this.listFileRaw[i]);
                            }
                        }
                    }

                    const dormDto = {
                        userId: this.userId,
                        code: this.dormCode,
                        name: this.detailForm.dormName,
                        address: {
                            code: this.detailForm.address.code,
                            longitude: this.detailForm.address.longitude,
                            latitude: this.detailForm.address.latitude,
                            districtId: this.detailForm.address.district,
                            subDistrictId: this.detailForm.address.subDistrict,
                            civilGroup: this.detailForm.address.civilGroup,
                            specificAddress: this.detailForm.address.specificAddress
                        },
                        imageUploadedCode: this.listUploadedCode,
                        utilities: this.detailForm.utilities,
                        description: this.detailForm.description
                    };
                    params.append(
                        'dormDto',
                        new Blob([JSON.stringify(dormDto)], { type: 'application/json' })
                    );
                    await DormApi.update(params);
                    this.clearForm();
                    AlertService.success(
                        String(i18n.t('common.alertTitle.success')),
                        String(i18n.t('common.message.saveSuccess'))
                    );
                    this.redirectToListDorm();
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
            await this.detailFormRef.validate(async valid => {
                await this.detailAddressFormRef.validate(async valid => {
                    if (valid) {
                        if (this.dormCode == null) {
                            await this.onCreateDorm();
                        } else {
                            await this.onUpdateDorm();
                        }
                    }
                });
            });
        }

        private b64toBlob(b64Data: any, contentType: string) {
            contentType = contentType || 'image/png';
            const byteCharacters = atob(b64Data);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);

            return new Blob([byteArray], { type: contentType });
        }

        private handleSelectFile(fileList: Array<any>): void {
            this.detailForm.dormImages = fileList;
        }

        private handleRemoveFile(fileList: Array<any>) {
            this.detailForm.dormImages = fileList;
        }

        private redirectToListDorm(): void {
            this.$router.push({
                name: Pages.listDorm.name,
                params: { userId: this.user.id.toString() }
            });
        }

        private clearForm(): void {
            this.detailFormRef.resetFields();
            this.detailAddressFormRef.resetFields();
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

    .register-dorm {
        margin: auto;
        width: 50%;
        text-align: left;
        padding-bottom: 20px;

        /deep/ .el-col {
            margin-right: 45px;
        }

        .btn-create {
            margin-top: 20px;
            float: right;
        }
    }
</style>
