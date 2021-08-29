<template>
    <div>
        <p class="title">
            <a @click="redirectToListRoom" style="cursor: pointer">Quản lý Phòng</a> >
            {{ detailForm.roomName }}
        </p>
        <el-card class="register-room">
            <el-form :model="detailForm" :rules="rules" ref="detail-form" v-loading="loading">
                <text-input-form-item
                        prop-name="roomName"
                        :title="$t('room.listRoom.roomName')"
                        :value.sync="detailForm.roomName"
                        required-label="true"
                        style="width: 70%"
                ></text-input-form-item>
                <select-form-item
                        prop-name="floor"
                        :options="detailForm.listFloor"
                        :title="$t('room.listRoom.floor')"
                        :value.sync="detailForm.floor"
                        required-label="true"
                ></select-form-item>
                <image-upload-form-item
                        prop-name="roomImages"
                        :file-list="detailForm.roomImages"
                        :title="$t('room.listRoom.roomImages')"
                        @on-remove="handleRemoveFile" @on-select="handleSelectFile"
                        required-label="true"
                ></image-upload-form-item>
                <el-card>
                    <h2>Thông số kĩ thuật</h2>
                    <el-row>
                        <el-col :span="10">
                            <number-input-form-item
                                    prop-name="square"
                                    :title="$t('room.listRoom.square')"
                                    :value.sync="detailForm.square"
                                    required-label="true"
                                    tag="m²"
                            ></number-input-form-item>
                        </el-col>
                        <el-col :span="10">
                            <number-input-form-item
                                    prop-name="capacity"
                                    :title="$t('room.listRoom.capacity')"
                                    :value.sync="detailForm.capacity"
                                    required-label="true"
                                    tag="người"
                            ></number-input-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="10">
                            <select-form-item
                                    prop-name="isSelfContained"
                                    :options="listIsSelfContained"
                                    :title="$t('room.listRoom.selfContained')"
                                    :value.sync="detailForm.isSelfContained"
                                    required-label="true"
                            ></select-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item prop="price">
                                <div class="d-flex inline">
                                    <InputLabel
                                            :required="true"
                                            :text="$t('room.listRoom.price')"
                                            style="width: auto"
                                    />
                                </div>
                                <currency-input class="currency-input" currency="VND"
                                                locale="vi"
                                                v-model="detailForm.price"/>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-card>
                <el-card style="margin-top: 20px">
                    <check-box-form-item
                            :options="listRoomUtility"
                            :title="$t('room.listRoom.utilities')"
                            :value.sync="detailForm.utilities"
                    ></check-box-form-item>
                    <text-area-form-item
                            prop-name="description"
                            :title="$t('room.listRoom.description')"
                            :value.sync="detailForm.description"
                    ></text-area-form-item>
                </el-card>
                <ButtonCreateOrUpdate
                        :create-fn="onSubmitForm"
                        :title="(roomCode ? $t('common.button.update') : $t('common.button.create'))"
                        class="btn-create"
                ></ButtonCreateOrUpdate>
            </el-form>
        </el-card>
    </div>
</template>

<script lang="ts">
    import {Component, Ref, Vue} from 'vue-property-decorator';
    import TextAreaFormItem from '@/components/form-item/TextAreaFormItem.vue';
    import TextInputFormItem from '@/components/form-item/TextInputFormItem.vue';
    import NumberInputFormItem from '@/components/form-item/NumberInputFormItem.vue';
    import SelectFormItem from '@/components/form-item/SelectFormItem.vue';
    import CheckBoxFormItem from '@/components/form-item/CheckBoxFormItem.vue';
    import ImageUploadFormItem from '@/components/form-item/ImageUploadFormItem.vue';
    import ButtonCreateOrUpdate from '@/components/button/ButtonCreateOrUpdate.vue';
    import {ElForm} from 'element-ui/types/form';
    import RoomApi from '@/api/dorm-owner-api/RoomApi';
    import i18n from '@/i18n';
    import AlertService from '@/services/AlertService';
    import Pages from '@/router/Pages';
    import FloorApi from '@/api/dorm-owner-api/FloorApi';
    import {RoomStatus} from '@/types/RoomStatus';
    import ItemOfOption from '@/types/ItemOfOption';
    import RoomForm from '@/types/RoomForm';
     import UserEntity from '@/types/classes/UserEntity';

    @Component({
        components: {
            TextInputFormItem,
            TextAreaFormItem,
            ImageUploadFormItem,
            SelectFormItem,
            ButtonCreateOrUpdate,
            NumberInputFormItem,
            CheckBoxFormItem
        }
    })
    export default class DetailRoom extends Vue {
        private loading: boolean = false;
        private roomCode: string = null;
        private user: UserEntity = null;
        private userId: number = null;
        private detailForm: RoomForm = {
            roomName: null,
            floor: null,
            listFloor: [],
            roomImages: [],
            square: null,
            capacity: null,

            status: RoomStatus.AVAILABLE,
            price: null,
            isSelfContained: true,
            description: null,
            utilities: [],
        };

        private listIsSelfContained: Array<any> = [
            {label: 'Khép kín', value: true},
            {label: 'Không khép kín', value: false},
        ];
        private listRoomUtility: Array<any> = [
            {label: 'Wifi', value: '0'},
            {label: 'Điều hòa', value: '1'},
            {label: 'Máy giặt', value: '2'},
            {label: 'Tủ lạnh', value: '3'},
            {label: 'Bếp nấu', value: '4'},
            {label: 'Tủ quần áo', value: '5'},
            {label: 'Ban công', value: '6'},
        ];

        private listFileRaw: Array<any> = [];
        private listUploadedCode: Array<any> = [];

        private rules: any = {
            roomName: [
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
            floor: [
                {
                    required: true,
                    message: String(i18n.t('common.message.fieldIsRequired')),
                    trigger: ['blur'],
                },
            ],
            roomImages: [
                {
                    required: true,
                    message: String(i18n.t('common.message.imageIsRequired')),
                    trigger: ['blur'],
                },
            ],
            square: [
                {
                    required: true,
                    message: String(i18n.t('common.message.fieldIsRequired')),
                    trigger: ['blur'],
                },
            ],
            capacity: [
                {
                    required: true,
                    message: String(i18n.t('common.message.fieldIsRequired')),
                    trigger: ['blur'],
                },
            ],
            isSelfContained: [
                {
                    required: true,
                    message: String(i18n.t('common.message.fieldIsRequired')),
                    trigger: ['blur'],
                },
            ],
            price: [
                {
                    required: true,
                    message: String(i18n.t('common.message.fieldIsRequired')),
                    trigger: ['blur'],
                },
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
        private form: ElForm;

        created() {
            this.user = JSON.parse(localStorage.getItem('CurrentUser'));
            this.userId = this.user != null ? this.user.id : null;
            this.getListFloor();
            this.roomCode =
                    this.$route.params.roomCode != null ? this.$route.params.roomCode : null;
            if (this.roomCode) {
                this.getRoomByCode();
            }
        }

        public async getListFloor(): Promise<void> {
            try {
                this.loading = true;
                const response = await FloorApi.listForRoom(this.userId);
                if (response) {
                    let size = Array.isArray(response) ? response.length : Object.keys(response).length;
                    for (let index = 0; index < size; index++) {
                        let customFloorList = new ItemOfOption();
                        customFloorList.value = response[index].id;
                        customFloorList.label = response[index].name;
                        this.detailForm.listFloor.push(customFloorList);
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

        public async getRoomByCode(): Promise<void> {
            try {
                this.loading = true;
                const response = await RoomApi.get(this.roomCode);
                if (response) {
                    this.detailForm.roomName = response.name;
                    this.detailForm.floor = response.floorEntity != null ? response.floorEntity.id : null;
                    response.roomImages.forEach((image: { code: string, name: string; bytes: any }) => {
                        let tempImage: any = {
                            code: image.code,
                            name: image.name,
                            url: URL.createObjectURL(this.b64toBlob(image.bytes, 'image/png'))
                        };
                        this.detailForm.roomImages.push(tempImage);
                    });
                    this.detailForm.square = response.square;
                    this.detailForm.capacity = response.capacity;

                    this.detailForm.status = response.status;
                    this.detailForm.price = response.price;
                    this.detailForm.isSelfContained = response.selfContained;
                    this.detailForm.description = response.description;
                    if (response.utilities.includes('HAS_WIFI')) {
                        this.detailForm.utilities.push('0');
                    }
                    if (response.utilities.includes('HAS_AIR_CONDITIONER')) {
                        this.detailForm.utilities.push('1');
                    }
                    if (response.utilities.includes('HAS_WASHING_MACHINE')) {
                        this.detailForm.utilities.push('2');
                    }
                    if (response.utilities.includes('HAS_FRIDGE')) {
                        this.detailForm.utilities.push('3');
                    }
                    if (response.utilities.includes('HAS_STOVE')) {
                        this.detailForm.utilities.push('4');
                    }
                    if (response.utilities.includes('HAS_WARDROBE')) {
                        this.detailForm.utilities.push('5');
                    }
                    if (response.utilities.includes('HAS_BALCONY')) {
                        this.detailForm.utilities.push('6');
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

        private async onCreateRoom(): Promise<void> {
            try {
                this.loading = true;
                const roomDto = {
                    userId: this.userId,
                    name: this.detailForm.roomName,
                    floorId: this.detailForm.floor,
                    square: this.detailForm.square,
                    capacity: this.detailForm.capacity,
                    status: this.detailForm.status,
                    price: this.detailForm.price,
                    selfContained: this.detailForm.isSelfContained,
                    description: this.detailForm.description,
                    utilities: this.detailForm.utilities,
                };
                let params = new FormData();
                params.append(
                        'roomDto',
                        new Blob([JSON.stringify(roomDto)], {type: 'application/json'})
                );
                if (this.detailForm.roomImages) {
                    this.detailForm.roomImages.forEach((element: any) => {
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
                await RoomApi.create(params);
                this.clearForm();
                AlertService.success(
                        String(i18n.t('common.alertTitle.success')),
                        String(i18n.t('common.message.saveSuccess'))
                );
                this.redirectToListRoom();
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

        private async onUpdateRoom(): Promise<void> {
            if (this.roomCode != null) {
                try {
                    this.loading = true;
                    let params = new FormData();
                    if (this.detailForm.roomImages) {
                        this.detailForm.roomImages.forEach((element: any) => {
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
                    const roomDto = {
                        code: this.roomCode,
                        name: this.detailForm.roomName,
                        floorId: this.detailForm.floor,
                        square: this.detailForm.square,
                        capacity: this.detailForm.capacity,
                        status: this.detailForm.status,
                        price: this.detailForm.price,
                        selfContained: this.detailForm.isSelfContained,
                        description: this.detailForm.description,
                        utilities: this.detailForm.utilities,
                        imageUploadedCode: this.listUploadedCode
                    };
                    params.append(
                            'roomDto',
                            new Blob([JSON.stringify(roomDto)], {type: 'application/json'})
                    );
                    await RoomApi.update(params);
                    this.clearForm();
                    AlertService.success(
                            String(i18n.t('common.alertTitle.success')),
                            String(i18n.t('common.message.saveSuccess'))
                    );
                    this.redirectToListRoom();
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
                    if (this.roomCode == null) {
                        await this.onCreateRoom();
                    } else {
                        await this.onUpdateRoom();
                    }
                }
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

            return new Blob([byteArray], {type: contentType});
        }

        private handleSelectFile(fileList: Array<any>): void {
            this.detailForm.roomImages = fileList;
        }

        private handleRemoveFile(fileList: Array<any>) {
            this.detailForm.roomImages = fileList;
        }

        private redirectToListRoom(): void {
            this.$router.push({
                name: Pages.listRoom.name,
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

    .register-room {
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
