<template>
    <el-row class="room-image" justify="center" type="flex">
        <router-link :to="{ name: 'roomList', params: { code: code } }">
            <el-image :src="'data:image/png;base64,' + imageByte" fit="cover">
                <div class="image-slot" slot="error">
                    <i class="el-icon-picture-outline"></i>
                </div>
            </el-image>
        </router-link>
        <span
            v-if="favourite || isFavourite"
            @click="deleteFavourite"
            class="like-btn"
            style="color: rgba(234, 80, 80, 1)"
        >
            <i class="fad fa-heart-square"></i>
        </span>
        <span v-else class="like-btn" @click="addFavourite">
            <i class="fal fa-heart-square"></i>
        </span>

        <el-dialog title="Warning" :visible.sync="centerDialogVisible" width="30%" center>
            <p style="text-align: center">Bạn cần đăng nhập để thực hiện chức năng này</p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisible = false">Xác nhận</el-button>
                <el-button type="primary" @click="goToLogin">Đăng nhập</el-button>
            </span>
        </el-dialog>
    </el-row>
</template>

<script lang='ts'>
import UserEntity from '@/types/classes/UserEntity';
import { Component, Prop, Vue } from 'vue-property-decorator';
import FavouriteDormEntity from '@/types/classes/FavouriteDormEntity';
import UserFavouriteApi from '@/api/user-api/UserFavouriteApi';
import Pages from '@/router/Pages';

@Component
export default class RoomImage extends Vue {
    @Prop({ required: false }) private imageByte: any;
    @Prop({ required: false }) private code: string;
    @Prop({ required: false }) private id: number;
    @Prop({ required: false }) private favourite: any;
    @Prop({ required: false }) private userId: number;

    private src: string;
    //GetUser
    private user: UserEntity = null;
    private favouriteDormEntity: FavouriteDormEntity = null;
    private centerDialogVisible: boolean = false;
    private favouriteCode: string = null;
    private isFavourite: boolean = false;
    constructor() {
        super();
        this.src = this.imageByte;
    }

    created() {
        this.favouriteCode = this.favourite != null ? this.favourite.code : null;
        this.favouriteDormEntity = {
            userId: this.userId,
            dormId: this.id,
        };
    }
    private async addFavourite(): Promise<any> {
        if (this.userId) {
            try {
                const newFavourite = await UserFavouriteApi.new(this.favouriteDormEntity);
                this.favouriteCode = newFavourite.code;
            } catch (error) {
                console.log(error);
            } finally {
                this.isFavourite = true;
            }
        } else {
            this.centerDialogVisible = true;
        }
    }

    private async deleteFavourite(): Promise<any> {
        if (this.userId) {
            try {
                await UserFavouriteApi.delete(this.favouriteCode);
            } catch (error) {
                console.log(error);
            } finally {
                this.favourite = null;
                this.isFavourite = false;
            }
        } else {
            this.centerDialogVisible = true;
        }
    }

    private goToLogin() {
        this.$router.push({ path: Pages.signIn.path });
    }

}
</script>
<style lang="scss" scoped>
.room-image {
    background-color: rgba(234, 234, 227, 1);
}
.room-image .el-image {
    min-height: 250px;
    max-height: 250px;
}
.like-btn {
    position: absolute;
    top: 5px;
    right: 5px;
    font-size: 30px;
    color: white;
    fill: red;
    cursor: pointer;
}
:hover {
    color: orangered;
}
</style>