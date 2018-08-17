<template>
    <div class="main">
        <el-menu :default-active="activePath" class="el-menu-demo" mode="horizontal" router>
            <el-menu-item index="/singers">歌手管理</el-menu-item>
            <el-menu-item index="/singers/new" v-show="isNewSingers">》 新增歌手</el-menu-item>
            <el-menu-item index="/singers/edit" v-show="isEditSingers">》 编辑歌手</el-menu-item>
            <el-menu-item index="/albums">专辑管理</el-menu-item>
            <el-menu-item index="/albums/new" v-show="isNewAlbums">》 新增专辑</el-menu-item>
            <el-menu-item index="/albums/edit" v-show="isEditAlbums">》 编辑专辑</el-menu-item>
            <el-menu-item index="/songs">歌曲管理</el-menu-item>
        </el-menu>
        <div class="hidden">
            <div class="mycontent">
                <router-view @thisActive="thisActive" @showImg="showImg" @showPhotos="showPhotos"/>
            </div>
        </div>
        <Slider v-show="showphotos" :imgUrls="photosUrl" @closePhotos="closePhotos"></Slider>
        <ShowImg v-show="showimg" :imgUrl="imgUrl" @closeImg="closeImg"></ShowImg>
    </div>
</template>
<script>
    import Slider from './components/Slider'
    import ShowImg from './components/ShowImg'
    export default {
        components: {
            Slider,
            ShowImg,
        },
        data() {
            return {
                showimg: false,
                imgUrl: '',
                showphotos: false,
                photosUrl: [],
                activePath: "",
                isNewSingers: false,
                isEditSingers:false,
                isNewAlbums: false,
                isEditAlbums:false,
            };
        },
        created() {

        },
        methods: {
            thisActive(path) {
                this.activePath = path
                if (path === "/singers/new")
                    this.isNewSingers = true
                else
                    this.isNewSingers = false
                if (path === "/singers/edit")
                    this.isEditSingers = true
                else
                    this.isEditSingers = false
                if (path === "/albums/new")
                    this.isNewAlbums = true
                else
                    this.isNewAlbums = false
                if (path === "/albums/edit")
                    this.isEditAlbums = true
                else
                    this.isEditAlbums = false
            },
            closeImg() {
                this.imgUrl = ''
                this.showimg = false
            },
            closePhotos() {
                this.showphotos = false
                this.photosUrl = []
            },
            showImg(imgUrl){
                this.imgUrl = imgUrl
                this.showimg = true
            },
            showPhotos(photosUrl){
                this.photosUrl = photosUrl
                this.showphotos = true
            }
        }
    }
</script>
<style>
    * {
        margin: 0;
        padding: 0;
         -moz-user-select:none;
      -webkit-user-select:none;
      user-select:none;  
    }

    html, body {
        width: 100%;
        height: 100%;
    }

    .main {
        width: 100%;
        height: 100%;
        background: #fff;
        overflow: hidden;

    }

    .hidden {
        margin: auto;
        width: 1200px;
        height: 100%;
        overflow-x: hidden;
        overflow-y: hidden;
    }

    .mycontent {
        width: 1209px;
        height: 100%;
        transform: translateY(-60px);
        -webkit-transform: translateY(-60px);
        overflow: scroll;
    }


    .el-menu-demo {
        position: fixed;
        left: 50%;
        transform: translateX(-50%);
        -webkit-transform: translateX(-50%);
        width: 1200px;
    }
</style>
