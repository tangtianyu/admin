<template>
    
</template>

<script>
    export default {
        name: "img",
        created(){
           // this.$emit('showPhotos',['https://img.581gg.com/picdata-watermark/a1/1191/119171-4.jpg'])

            this.axios.get(this.myurl+`imgs`)
            .then(res=>{
                let imgs = res.data.split('\n');
                 this.$emit('showPhotos',imgs)

            })
        }
    }
</script>

<style scoped>

</style>