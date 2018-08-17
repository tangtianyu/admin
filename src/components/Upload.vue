<template>
    <input  type="file" ref="m_select" @change="upload" style="display: none" />
</template>

<script>

    import uploader  from '../assets/config/upload'

    export default {
        props:{
            index:{
                type:Number
            },
        },
        data() {
            return {
                percentage:0,
                show_text:false,
            }
        },
        created() {

        },
        methods: {
            trigger(){
                this.$refs.m_select.click()
            },
            upload(event){
                uploader.upload_music(event.target.files[0],(per)=>{
                    this.percentage=parseInt(per)
                    this.show_text=true
                }).then((res)=>{
                    this.$emit('setUrl',res,index)
                    let timer=setTimeout(()=>{
                        this.show_text=false
                        clearTimeout(timer)
                    },250)
                })
            },

        }
    }
</script>

<style scoped>
    .box{
        position: relative;
        width: 40px;
        height: 40px;
        font-size: 0;
    }
    .upload{
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
    .upload:hover{
        color: #409EFF;
    }
    .icon-arrow-up{
        margin-left: -1.5px;
    }
</style>