<template>
    <div class="div-img" >
        <div class="ul-content">
            <ul class="ul-img">
                <div class="close-btn" @click="closeImg"><i class="el-icon-close"></i></div>
                <div class="lbtn" @click="preImg"><i class="el-icon-arrow-left"></i></div>
                <div class="rbtn" @click="nextImg"><i class="el-icon-arrow-right"></i></div>
                <li v-for="(imgUrl,index) in imgUrls" v-show="isShow===index">
                    <img class="showimg" :src="imgUrl"/>
                </li>

            </ul>
        </div>
    </div>
</template>
<script>
    export default {
        name: "Slider",
        props: {
            imgUrls:{
                type:Array,
            }
        },
        data() {
            return {
                isShow: 0,
            }
        },

        methods: {
            closeImg() {
                this.$emit('closePhotos')
                this.isShow = 0
            },
            preImg() {
                if(this.isShow === 0)
                    this.isShow = this.imgUrls.length
                this.isShow--

            },
            nextImg() {
                if(this.isShow === this.imgUrls.length - 1)
                    this.isShow = -1
                this.isShow++;

            }
        }
    }
</script>

<style scoped>
    .div-img {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, .3);
        transition: all .3s;
        z-index: 9999;
    }

    .ul-content {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        -webkit-transform: translateY(-50%);
        width: 100%;
        height: 900px;
        background: rgba(0, 0, 0, .5);
    }

    .ul-img {
        position: relative;
        width: 1300px;
        height: 900px;
        margin-left: 50%;
        transform: translateX(-50%);
        -webkit-transform: translateX(-50%);
        background: rgba(0, 0, 0, .4);
    }

    .lbtn, .rbtn {
        transform: translateY(300px);
        -webkit-transform: translateY(300px);
    }

    .lbtn, .rbtn, .close-btn {
        cursor: pointer;
        position: absolute;
        width: 100px;
        height: 100px;
        font-size: 60px;
        color: rgba(100, 100, 100, .8);;
        line-height: 100px;
        text-align: center;
        background: rgba(0, 0, 0, .2);
        z-index: 9999999;
    }

    .lbtn:hover, .rbtn:hover, .close-btn:hover {
        color: rgba(250, 250, 250, .8);
        background: rgba(0, 0, 0, .8);
    }

    .lbtn {
        left: 0;
        border-bottom-right-radius: 10px;
        border-top-right-radius: 10px;
    }

    .rbtn {
        border-bottom-left-radius: 10px;
        border-top-left-radius: 10px;
    }

    .close-btn {
        border-bottom-left-radius: 10px;
    }

    .rbtn, .close-btn {
        right: 0;
    }

    li {
        position: absolute;
        margin-left: 50%;
        transform: translateX(-50%);
        -webkit-transform: translateX(-50%);
        height: 900px;
        font-size: 0;
        line-height: 900px;
    }

    .showimg {
        height: 900px;
    }
</style>