<template>
    <div class="wrapper">
        <div class="multiple-op">
            <el-button
                    size="mini"
            >编辑
            </el-button>
            <el-button
                    size="mini"
                    type="danger"
            >删除
            </el-button>
        </div>

        <el-button
                style="float: right;margin-right: 15px;margin-top: 20px"
                type="info" icon="el-icon-plus"
                circle
                @click="add_new_song"
        >
        </el-button>
        <div class="el-table el-table--fit el-table--enable-row-hover el-table--enable-row-transition"
             style="width: 100%;">
            <div class="el-table__header-wrapper">
                <table cellspacing="0" cellpadding="0" border="0" class="el-table__header" style="width: 1160px;">
                    <thead>
                    <tr>
                        <th class="   el-table-column--selection  is-leaf" style="width: 40px">
                            <div class="cell">
                                <label role="checkbox" class="el-checkbox">
                                    <span aria-checked="mixed" class="el-checkbox__input">
                                        <span class="el-checkbox__inner"></span>
                                        <input type="checkbox" aria-hidden="true" class="el-checkbox__original" value="">
                                    </span>
                                </label>
                            </div>
                        </th>
                        <th class="  is-center   is-leaf" style="width: 60px">
                            <div class="cell">编号</div>
                        </th>
                        <th class="  is-center   is-leaf" style="width: 80px">
                            <div class="cell">照片</div>
                        </th>
                        <th class="  is-center   is-leaf" style="width: 140px">
                            <div class="cell">歌曲名</div>
                        </th>
                        <th class="  is-center   is-leaf" style="width: 140px">
                            <div class="cell">所属专辑</div>
                        </th>
                        <th class="  is-center   is-leaf" style="width: 100px">
                            <div class="cell">歌手</div>
                        </th>
                        <th class="  is-center   is-leaf" style="width: 70px">
                            <div class="cell">简介</div>
                        </th>
                        <th class="  is-center   is-leaf" style="width: 100px">
                            <div class="cell">热度</div>
                        </th>
                        <th class="  is-center   is-leaf" style="width: 85px">
                            <div class="cell">试听</div>
                        </th>
                        <th class="  is-center   is-leaf" style="width: 120px">
                            <div class="cell">操作</div>
                        </th>
                    </tr>
                    </thead>
                </table>
            </div>
            <div class="el-table__body-wrapper is-scrolling-none">
                <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" style="width: 1160px;">
                    <tbody v-for="(song,index) in songs">
                    <tr class="el-table__row">
                        <td class="  el-table-column--selection" style="width: 40px">
                            <div class="cell">
                                <label role="checkbox" class="el-checkbox">
                                    <span aria-checked="mixed" class="el-checkbox__input">
                                        <span class="el-checkbox__inner"></span>
                                        <input type="checkbox" aria-hidden="true" class="el-checkbox__original"
                                               value="">
                                    </span>
                                </label>
                            </div>
                        </td>
                        <td class=" is-center " style="width: 60px">
                            <div class="cell"><span>{{index+1}}</span></div>
                        </td>
                        <td class=" is-center " style="width: 80px">
                            <div class="cell">
                                <img :src="song.image" @click="ShowImg(song.image)"
                                     style="width: 60px; height: 60px; cursor: pointer;">
                            </div>
                        </td>
                        <td class=" is-center " style="width: 140px">
                            <div class="cell"><span>{{song.songName}}</span></div>
                        </td>
                        <td class=" is-center " style="width: 140px">
                            <div class="cell"><span >{{song.album.albumName}}</span></div>
                        </td>
                        <td class=" is-center " style="width: 100px">
                            <div class="cell"><span >{{song.singer.singerName}}</span></div>
                        </td>
                        <td class=" is-center " style="width: 70px">
                            <div class="cell">
                                <el-popover trigger="click" placement="top">
                                    <p style="width: 500px">{{ song.introduction }}</p>
                                    <div slot="reference">
                                        <el-tag size="medium">简介</el-tag>
                                    </div>
                                </el-popover>
                            </div>
                        </td>
                        <td class=" is-center " style="width: 100px">
                            <div class="cell"><span>{{song.popularity}}</span></div>
                        </td>
                        <td class=" is-center " style="width: 85px">
                            <div class="cell"><span class="my-icon" :class="song.isPlay?'icon-stop':'icon-play'" @click="play(index)"></span></div>
                        </td>
                        <td class=" is-center " style="width: 120px">
                            <div class="cell">
                                <button type="button" class="el-button el-button--default el-button--mini">
                                    <span>编辑</span>
                                </button>
                                <button  type="button" class="el-button el-button--danger el-button--mini">
                                    <span>删除</span>
                                </button>
                            </div>
                        </td>
                    </tr>
                     <tr class="tr-content">
                         <div :class="{'play-area-active':song.isPlay,'play-area-unactive':!song.isPlay}">
                             <component :is="song.isPlay?'Progress':''" :songUrl="song.songUrl" :lyric="song.lyric" :m_Type="song.m_Type"></component>

                         </div>
                     </tr>
                    </tbody>
                </table>

            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
import Progress from '../../components/Progress'

    export default {
        name: 'home',
        components:{
            Progress
        },
        data() {
            return {
                songs: [],
                songsids: [],

            };
        },
        mounted(){

        },
        created() {
            this.$emit('thisActive', this.$route.path)
            this.init()
        },
        methods: {
            init() {
                this.axios.get(this.myurl+`admin/songs`).then((res) => {
                    this.songs = res.data.songs
                    this.songs[0].lyric.split('↵')
                    this.songs.forEach(v=>{
                        v.isPlay=false
                        if(v.lyric!==null)
                        v.lyric= v.lyric.split('↵')
                        else
                            v.lyric=[]

                    })
                })
            },
            del(index, id) {
                this.axios.delete(this.myurl+`admin/songs/${id}`).then((res) => {
                    this.songs.splice(index, 1)
                })
            },
            ShowImg(imgUrl) {
                this.$emit('showImg', imgUrl)
            },
            add_new_song() {
                this.$router.push({name: 'newsongs'})
            },
            play(index){
                if(!this.songs[index].isPlay) {
                    this.songs.forEach(v => {
                        v.isPlay = false
                    })
                    this.songs[index].isPlay = true
                    Vue.set(this.songs, index, this.songs[index]);
                }else {
                    this.songs[index].isPlay = false
                    Vue.set(this.songs, index, this.songs[index]);
                }

            },
            edit(id) {
                this.axios.post(this.myurl+`admin/songs/postsongsid`, {ids: [id]}).then(() => {
                    this.$router.push({name: 'editsongs'})
                })
            },
            handleSelectionChange(val) {
                this.songsids = val.map((v) => {
                    return v.id
                });
            },
            multipleEdit() {
                this.axios.post(this.myurl+`admin/songs/postsongsid`, {ids: this.songsids}).then(() => {
                    this.$router.push({name: 'editsongs'})
                })
            },
            multipleDel() {
                this.axios.post(this.myurl+`admin/songs/multipledel`, {ids: this.songsids}).then(() => {
                    this.init()
                })
            },
        }

    }
</script>

<style scoped>
    .wrapper {
        padding: 60px 29px 100px 20px;
        position: relative;
    }

    .multiple-op {
        position: absolute;
        top: 80px;
        left: 20px;
    }

    .el-tag {
        cursor: pointer;
    }
    .tr-content{
        width: 100%;
    }
    .play-area-active{
        transition: all .3s;
        width: 1160px;
        height: 79px;
        overflow: hidden;
        border-bottom: 1px solid #ebeef5;

    }
    .play-area-unactive{
        transition: all .3s;
        width: 1160px;
        height: 0;
        overflow: hidden;
        border-bottom: 0px solid #ebeef5;

    }
    .my-icon {
        font-size: 22px;
    }

    .my-icon:hover {
        color: #409EFF;
    }
</style>
