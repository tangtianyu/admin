<template>
    <div class="wrapper">
        <el-button
                style="float: right; margin-right: 15px ; margin-top: 20px"
                type="info" icon="el-icon-plus"
                circle
                @click="add_new_song">
        </el-button>

        <el-table
                :data="new_songs"
                style="width: 100%">
            <el-table-column
                    label="编号"
                    width="60"
                    align="center">
                <template slot-scope="scope">
                    <span>{{scope.$index+1}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="歌手"
                    min-width="160"
                    align="center">
                <template slot-scope="scope">
                    <el-select
                            :change="setAlbums(scope.row.singerId)"
                            style="width: 150px"
                            v-model="scope.row.singerId" filterable placeholder="请选择">
                        <el-option
                                v-for="singer in singers"
                                :key="singer.id"
                                :label="singer.singerName"
                                :value="singer.id">
                        </el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column
                    label="专辑名"
                    min-width="160"
                    align="center">
                <template slot-scope="scope">
                    <el-select
                            :change="setSinger(scope.row.albumId,scope.$index)"
                            style="width: 150px"
                            v-model="scope.row.albumId" filterable placeholder="请选择">
                        <el-option
                                v-for="album in albums"
                                :key="album.id"
                                :label="album.albumName"
                                :value="album.id">
                        </el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column
                    label="歌名"
                    min-width="160"
                    align="center">
                <template slot-scope="scope">
                    <el-input
                            style="width: 150px"
                            v-model="scope.row.songName"
                            placeholder="请输入歌名">
                    </el-input>
                </template>
            </el-table-column>

            <el-table-column
                    label="热度"
                    min-width="140"
                    align="center">
                <template slot-scope="scope">
                    <el-input
                            style="width: 120px"
                            v-model="scope.row.popularity"
                            placeholder="请输入热度">
                    </el-input>
                </template>
            </el-table-column>
            <el-table-column
                    label="照片"
                    min-width="80"
                    align="center">
                <template slot-scope="scope">
                    <div class="cover" @click="sendIndexOrShowImg(scope.row.image,scope.$index)"></div>
                    <el-upload
                            class="avatar-uploader"
                            :action="imgUrlHeader+'upload/img'"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                        <img ref="upload"
                             style="width: 60px;height: 60px"
                             v-if="scope.row.image"
                             :src="scope.row.image"
                             class="avatar">
                        <i ref="upload" v-else class="avatar-uploader-icon"><i class="el-icon-plus"></i></i>
                    </el-upload>
                </template>
            </el-table-column>

            <el-table-column
                    label="简介"
                    min-width="60"
                    align="center">
                <template slot-scope="scope">
                    <el-popover
                            :disabled="scope.row.introduction==''"
                            trigger="hover"
                            placement="top">
                        <p style="width: 500px">{{ scope.row.introduction }}</p>
                        <div slot="reference" @click="addIntrod(scope.$index)">
                            <el-tag size="medium">{{scope.row.introduction==''?'添加':'修改'}}</el-tag>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>


            <el-table-column
                    label="上传歌曲"
                    min-width="80"
                    align="center">
                <template slot-scope="scope">
                    <SocoolBtn @trigger="trigger" :index="scope.$index" :done="scope.row.done" :percentage="scope.row.percentage" :show_text="scope.row.show_text"/>
                    <input type="file" :ref="'m_select_'+scope.$index" @change="upload($event,scope.$index)" style="display: none"/>
                </template>
            </el-table-column>

            <el-table-column label="操作"
                             min-width="80"
                             align="center">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="btncontent">
            <el-button @click="cancel_add">取 消</el-button>
            <el-button type="primary" @click="confirm_add">确 定</el-button>

        </div>


        <el-dialog
                :modal="false"
                width="540px"
                :title="add_Introd?'添加简介':'修改简介'"
                :visible.sync="dialogIntrodVisible"
                :close-on-click-modal="false"
                center
                @close="textarea=''">
            <el-input
                    style="width: 500px"
                    type="textarea"
                    :autosize="{ minRows: 12, maxRows: 12}"
                    placeholder="请输入内容"
                    v-model="textarea">
            </el-input>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogIntrodVisible=false">取 消</el-button>
                <el-button type="primary" @click="confirm_add_Introd">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import uploader from '../../assets/config/upload'

    import SocoolBtn from '../../components/SocoolBtn'

    export default {
        components: {
            SocoolBtn
        },
        data() {
            return {
                imgUrlHeader:this.myurl,
                singers: [],
                albums: [],
                new_songs: [
                    {
                        singerId: '',
                        albumId: '',
                        songName: '',
                        songUrl: '',
                        m_Type: 'audio/mpeg',
                        introduction: '',
                        popularity: 0,
                        image: '',
                        photos: '',
                        done: false,
                        percentage: 0,
                        show_text: false,
                    }
                ],
                index: 0,
                textarea: '',
                add_Introd: true,
                dialogIntrodVisible: false,
                dialogImageUrl: '',
                dialogVisible: false,
                isDblClick: false,
            }
        },
        created() {
            this.$emit('thisActive', this.$route.path)
            this.axios.get(this.myurl + `admin/singers/real`).then((res) => {
                this.singers = res.data.singers
            })

            this.axios.get(this.myurl + `admin/albums/real`).then((res) => {
                this.albums = res.data.albums
            })
        },
        methods: {
            add_new_song() {
                this.new_songs.push(
                    {
                        singerId: '',
                        albumId: '',
                        songName: '',
                        songUrl: '',
                        m_Type: 'audio/mpeg',
                        introduction: '',
                        popularity: 0,
                        image: '',
                        photos: '',
                        done: false,
                        percentage: 0,
                        show_text: false,
                    }
                )
            },
            setAlbums(id) {
                this.singers.forEach(v=>{
                    if(v.id===id){
                        this.albums=v.albums
                    }
                })
            },
            setSinger(id,index){
                this.albums.forEach(v=>{
                    if(v.id===id){
                        this.new_songs[index].singerId=v.singerId
                    }
                })
            },
            trigger(index) {
                this.$refs["m_select_"+index].click()
            },
            upload(event,index) {
                this.new_songs[index].done = false
                this.new_songs[index].percentage = 0
                this.new_songs[index].show_text = true
                uploader.upload_music(event.target.files[0], (per) => {
                    this.new_songs[index].percentage = parseInt(per)
                }).then((res) => {
                    this.new_songs[index].songUrl=res
                    event.target.value=''
                    let timer = setTimeout(() => {
                        this.new_songs[index].done = true
                        clearTimeout(timer)
                    }, 300)
                })
            },

            handleAvatarSuccess(res, file) {
                this.new_songs[this.index].image = res.url;
            },

            beforeAvatarUpload(file) {
                // const isJPG = file.type === 'image/jpeg';
                // const isPNG = file.type === 'image/png';
                // const isGIF = file.type === 'image/gif';
                //
                // const isLt2M = file.size / 1024 / 1024 < 2;
                //
                // if (!isJPG&&!isPNG&&isGIF) {
                //     this.$message.error('上传头像图片只能是 JPG / PNG / GIF 格式!');
                // }
                // if (!isLt2M) {
                //     this.$message.error('上传头像图片大小不能超过 2MB!');
                // }
                // return isJPG && isLt2M;
            },
            handleDelete(index) {
                this.new_songs.splice(index, 1)
                if (this.new_songs.length == 0)
                    this.$router.push({name: 'songs'})
            },
            addIntrod(index) {
                this.index = index
                this.add_Introd = this.new_songs[index].introduction == ''
                this.textarea = this.new_songs[index].introduction
                this.dialogIntrodVisible = true
            },
            confirm_add_Introd() {
                this.new_songs[this.index].introduction = this.textarea
                this.dialogIntrodVisible = false
            },
            cancel_add() {
                this.$router.push({name: 'songs'})
            },
            confirm_add() {
                let Idck = true
                this.new_songs.forEach(value => {
                    if (value.singerId === '' || value.albumId === '') {
                        this.$message.error('必须选择歌手和专辑才能进行新增操作!');
                        Idck = false
                        return
                    }
                })
                if (Idck) {
                    this.new_songs.forEach(value => {
                        delete value.done
                        delete value.percentage
                        delete value.show_text
                    })
                    this.axios.post(this.myurl + `admin/songs/new`, this.new_songs).then(() => {
                        this.$router.push({name: 'songs'})
                    })
                }
            },
            sendIndexOrShowImg(imgUrl, index) {
                let mytime = null
                if (!this.isDblClick) {
                    this.isDblClick = true
                    mytime = setTimeout(() => {
                        this.$refs.upload.click()
                        this.index = index
                        this.isDblClick = false
                    }, 200)
                } else {
                    if (imgUrl != '') {
                        this.$emit('showImg', imgUrl)
                    } else {
                        this.$message.error('请先上传照片后再查看!');
                    }
                    clearTimeout(mytime)
                    this.isDblClick = false

                }

            }
        },
    }
</script>

<style scoped>
    .wrapper {
        padding: 60px 29px 100px 20px;
    }

    .avatar-uploader {
        margin-left: 3px;
        height: 60px;
        width: 60px;
        border: 1px dashed #dcdfe6;
        border-radius: 5px;
        background: #fff;
        overflow: hidden;
        z-index: 100000;
        font-size: 0;
    }

    .avatar-uploader:hover {
        border: 1px dashed #409EFF;
    }

    .avatar-uploader-icon {
        display: block;
        font-size: 20px;
        line-height: 58px;
        text-align: center;
        height: 58px;
        width: 58px;
    }

    .m-multiple-upload {
        margin-top: 20px;
        margin-left: 10px;
    }

    .add-photos-content {
        cursor: pointer;
        display: block;
        cursor: pointer;
        width: 60px;
        height: 60px;
        border: 2px solid black;
        padding: 3px 3px;
        background: #fff;
        margin-left: 3px;
        color: rgba(0, 0, 0, .3);
    }

    .add-photos-content:hover {
        color: #409EFF;
    }

    .el-tag {
        cursor: pointer;
    }

    .add-photos {
        position: relative;
        width: 50px;
        height: 50px;
        line-height: 0;
        font-size: 0;
        text-align: initial;
        overflow: hidden;
    }

    #pppp {
        display: block;
        position: absolute;
        font-size: 30px;
        left: 10px;
        top: 10px;
    }

    .btncontent {
        margin-top: 30px;
        text-align: center;
    }

    .cover {
        cursor: pointer;
        position: absolute;
        width: 60px;
        height: 60px;
        left: 13px;
    }
</style>