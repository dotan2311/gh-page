<template>
    <div >
    <el-card class="sign-in-user">    
        <el-form>
            <h2>Kiểm tra hộp thư của bạn  </h2>
            <p class="txt-noti" >Chúng tôi đã gửi bạn hướng dẫn và đường link cài lại mật khẩu đến Email của bạn này có thể mất vài phút để đến hộp thư. </p>
            
            
            <div class="returnSign-btn">
                <el-button class="btn-returnSign" @click="returnSigIn()">
                    Bấm để tạo mới mật khẩu
                </el-button>
            </div>
            
            
        </el-form>

    </el-card>
    </div>

</template>


<script lang="ts">
    import router from "@/router/Router";
    import {Component, Vue} from 'vue-property-decorator';
    import TextInputFormItem from '@/components/form-item/TextInputFormItem.vue';
import Pages from "@/router/Pages";

    @Component({
        components: {
            TextInputFormItem
        }

    })


    export default class SendEmailForgotPassword extends Vue {
        
        private username : string = null;
        created() {
            this.username =
                this.$route.params.username != null ? this.$route.params.username : null;
            console.log(this.username);
            console.log(this.$router);
        }
        
        private  returnSigIn () : void{
            router.push({ path : `/change-forgotPassword/${this.username}`});
        }

        
    }

</script>


<style scoped>
    .txt-noti{
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
    }
    
    .sign-in-user {
        margin: auto;
        width: 25%;
        text-align: left;
        margin-top: 20px;
        height:380px;
    }
    .returnSign-btn{
        text-align: center;
    }
    .btn-returnSign{
        position: relative;
        color: #fff;
        vertical-align : middle;
        border: 1px solid #0071c2;
        border-radius: 2px;
        align-items: center;
        background-color: #0071c2;
        width: 100%;

    }
</style>