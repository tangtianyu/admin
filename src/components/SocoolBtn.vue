<template>
    <div>
        <div class="cubeshape cube" v-show="done">
            <div class="first_cube">
                <div class="box">
                    <div class="upload"><span class="icon-checkmark"></span></div>
                    <el-progress type="circle"
                                 :percentage="100"
                                 color="#f56c6c"
                                 :width="40"
                                 :stroke-width="3"
                                 :show-text="false"
                    >

                    </el-progress>
                </div>
            </div>
            <div class="second_cube">
                <div class="box">
                    <div class="upload" @click="trigger(index)"><span class="icon-arrow-up"></span></div>
                    <el-progress type="circle"
                                 :percentage="0"
                                 color="#f56c6c"
                                 :width="40"
                                 :stroke-width="3"
                                 :show-text="false"
                    >
                    </el-progress>
                </div>
            </div>
        </div>
        <div class="default_cube" v-show="!done">
            <div class="box">
                <div class="upload" @click="trigger(index)"><span :class="{'icon-arrow-up':!show_text}"></span></div>
                <el-progress type="circle"
                             :percentage="percentage"
                             color="#f56c6c"
                             :width="40"
                             :stroke-width="3"
                             :show-text="show_text"
                >
                </el-progress>
            </div>
        </div>
    </div>

</template>

<script>

    export default {
        props: ['index', 'percentage', 'show_text', 'done'],
        methods:{
            trigger(index){
                this.$emit('trigger',index)
            }
        }
    }
</script>

<style scoped>


    .cubeshape {
        width: 40px;
        height: 50px;
        margin-left: 18px;
    }

    .cube {

        -webkit-transition: -webkit-transform .33s;
        transition: transform .33s; /* Animate the transform properties */

        -webkit-transform-style: preserve-3d;
        transform-style: preserve-3d;
    }

    .first_cube, .second_cube {
        height: 50px;
        width: 40px;
        position: relative;
    }

    .default_cube {
        height: 50px;
        width: 40px;
        margin-left: 18px;
    }

    .first_cube {
        -webkit-transform: translateZ(30px);
        transform: translateZ(30px);
    }

    .second_cube {

        -webkit-transform: rotateX(-90deg) translateZ(-30px);
        transform: rotateX(-90deg) translateZ(-30px);

    }

    .cube:hover {
        -webkit-transform: rotateX(89deg);
        transform: rotateX(89deg);

    }

    .box {
        position: relative;
        width: 40px;
        height: 40px;
        font-size: 0;
        -webkit-transform: translateY(5px);
        transform: translateY(5px);
    }

    .upload {
        position: absolute;
        left: 0;
        right: 0;
        width: 40px;
        height: 40px;
        z-index: 1000000;
        line-height: 44px;
        text-align: center;
        font-size: 23px;
        border-radius: 20px;
        color: #e5e9f2;
    }

    .icon-arrow-up {
        margin-left: -1.5px;
    }

    .icon-checkmark {
        color: #f56c6c
    }
</style>