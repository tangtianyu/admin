<template>
    <div class="div-img" >
        <div class="ul-content">
            <ul class="ul-img">
                <div class="close-btn" @click="closeImg"><i class="el-icon-close"></i></div>
                <li >
                    <img class="showimg" :src="imgUrl"/>
                </li>

            </ul>
        </div>

    </div>
</template>
<script>
    export default {
        props: {
            imgUrl:{
                type:String,
            }
        },
        data() {
            return {
            }
        },
        methods: {
            closeImg() {
                this.$emit('closeImg')
            },
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
        height: 700px;
        background: rgba(0, 0, 0, .5);
    }

    .ul-img {
        position: relative;
        width: 1300px;
        height: 700px;
        margin-left: 50%;
        transform: translateX(-50%);
        -webkit-transform: translateX(-50%);
        background: rgba(0, 0, 0, .4);
    }


    .close-btn {
        cursor: pointer;
        position: absolute;
        width: 100px;
        height: 100px;
        font-size: 60px;
        color: rgba(100, 100, 100, .8);;
        line-height: 100px;
        text-align: center;
        background: rgba(0, 0, 0, .2);
        border-bottom-left-radius: 10px;
        right: 0;
        z-index: 9999999;
    }
    .close-btn:hover {
        color: rgba(250, 250, 250, .8);
        background: rgba(0, 0, 0, .8);
    }


    li {
        position: absolute;
        margin-left: 50%;
        transform: translateX(-50%);
        -webkit-transform: translateX(-50%);
        height: 700px;
        font-size: 0;
        line-height: 700px;
    }

    .showimg {
        height: 700px;
    }
</style>