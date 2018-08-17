<template>
    <div class="wrapper">
        <el-table
                :data="edit_singers"
                style="width: 100%">
            <el-table-column
                    label="编号"
                    min-width="60"
                    align="center">
                <template slot-scope="scope">
                    <span>{{scope.$index+1}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="姓名"
                    min-width="210"
                    align="center">
                <template slot-scope="scope">
                    <el-input
                            style="width: 150px"
                            v-model="scope.row.singerName"
                            placeholder="请输入姓名">
                    </el-input>
                </template>
            </el-table-column>

            <el-table-column
                    label="照片"
                    min-width="100"
                    align="center">
                <template slot-scope="scope">
                    <div class="cover" @click="sendIndexOrShowImg(scope.row.image,scope.$index)"></div>
                    <el-upload
                            class="avatar-uploader"
                            :action="this.myurl+'upload/img'"
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
                    min-width="115"
                    align="center">
                <template slot-scope="scope">
                    <el-popover
                            :disabled="scope.row.introduction==''"
                            trigger="hover"
                            placement="top">
                        <p style="width: 500px">{{ scope.row.introduction }}</p>
                        <div slot="reference" @click="editIntrod(scope.$index)">
                            <el-tag size="medium">{{scope.row.introduction==''?'添加':'修改'}}</el-tag>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>

            <el-table-column
                    label="热度"
                    min-width="200"
                    align="center">
                <template slot-scope="scope">
                    <el-input
                            style="width: 150px"
                            v-model="scope.row.popularity"
                            placeholder="请输入热度">
                    </el-input>
                </template>
            </el-table-column>

            <el-table-column
                    label="生日"
                    min-width="220"
                    align="center">
                <template slot-scope="scope">
                    <el-date-picker style="width: 180px"
                                    v-model="scope.row.birthday"
                                    type="date"
                                    placeholder="选择日期">
                    </el-date-picker>
                </template>
            </el-table-column>

            <el-table-column
                    label="相册"
                    align="center"
                    min-width="100">
                <template slot-scope="scope">
                    <div class="edit-photos-content"
                         @click="uploadPicOrshowSlider(scope.$index,scope.row)">
                        <div class="edit-photos">
                            <i class="el-icon-plus" id="pppp"></i>
                            <img style="width: 25px;height:25px;" v-for="image in scope.row.photos" :src="image" alt="">
                        </div>
                    </div>
                </template>
            </el-table-column>

            <el-table-column label="操作"
                             min-width="100"
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
            <el-button @click="cancel_edit">取 消</el-button>
            <el-button type="primary" @click="confirm_edit">确 定</el-button>

        </div>

        <el-dialog
                :modal="false"
                title="上传图片"
                :visible.sync="dialogPhotosVisible"
                :close-on-click-modal="false"
                width="685px"
                @close="clearFileList"
                center
        >
            <el-upload
                    class="m-multiple-upload"
                    :action="this.myurl+'upload/img'"
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :on-success="handleOnSuccess"
                    :file-list="fileList"
                    multiple
                    :on-remove="handleRemove">

                <i class="el-icon-plus"></i>
            </el-upload>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogPhotosVisible=false">取 消</el-button>
                <el-button type="primary" @click="confirm_edit_pts">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog :modal="false"
                   :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>


        <el-dialog
                :modal="false"
                width="540px"
                :title="edit_Introd?'添加简介':'修改简介'"
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
                <el-button type="primary" @click="confirm_edit_Introd">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    export default {
        name: "EditSingers",
        data() {
            return {
                edit_singers: [],
                index: 0,
                textarea: '',
                edit_Introd: true,
                dialogIntrodVisible: false,
                dialogPhotosVisible: false,
                dialogImageUrl: '',
                dialogVisible: false,
                fileList: [],
                mytime: null,
                isDblClick: false,
            }
        },
        created() {
            this.$emit('thisActive', this.$route.path)
            this.axios.get(this.myurl+`admin/singers/editsingersid`).then((res) => {
                this.edit_singers = res.data.singers
                this.edit_singers.forEach((v) => {
                    if (v.photos != '')
                        v.photos = v.photos.split('|')
                    else
                        v.photos = []
                })
            })
        },
        methods: {
            handleAvatarSuccess(res, file) {
                this.edit_singers[this.index].image = res.url;
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
                this.edit_singers.splice(index, 1)

                let ids = this.edit_singers.map((v) => {
                    return v.id
                });
                this.axios.post(this.myurl+`admin/singers/postsingersid`, {ids: ids})
                if (this.edit_singers.length == 0)
                    this.$router.push({name: 'singers'})
            },
            handleRemove(file, fileList) {
                this.fileList = fileList
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },

            handleOnSuccess(response, file, fileList) {
                this.fileList = fileList
            },
            clearFileList() {
                this.fileList = []
            },
            uploadPicOrshowSlider(index, row) {
                if (!this.isDblClick) {
                    this.isDblClick = true
                    this.mytime = setTimeout(() => {
                        this.dialogPhotosVisible = true
                        this.index = index
                        row.photos.forEach(v => {
                            this.fileList.push({name: '', url: v})
                        })
                        this.isDblClick = false
                    }, 200)
                } else {
                    if (row.photos.length > 0) {
                        this.$emit('showPhotos', row.photos)
                    } else {
                        this.$message.error('请先上传照片后再查看!');
                    }
                    clearTimeout(this.mytime)
                    this.isDblClick = false

                }
            },
            confirm_edit_pts() {
                this.dialogPhotosVisible = false
                this.edit_singers[this.index].photos = []
                this.fileList.forEach(v => {
                    this.edit_singers[this.index].photos.push(v.url)
                })
            },
            editIntrod(index) {
                this.index = index
                this.edit_Introd = this.edit_singers[index].introduction == ''
                this.textarea = this.edit_singers[index].introduction
                this.dialogIntrodVisible = true
            },
            confirm_edit_Introd() {
                this.edit_singers[this.index].introduction = this.textarea
                this.dialogIntrodVisible = false
            },
            cancel_edit() {
                this.$router.push({name: 'singers'})
            },
            confirm_edit() {
                this.edit_singers.forEach(value => {
                    value.photos = value.photos.join("|")
                })
                this.axios.post(this.myurl+`admin/singers/edit`, this.edit_singers).then(() => {
                    this.$router.push({name: 'singers'})
                })
            },
            sendIndexOrShowImg(imgUrl, index) {
                if (!this.isDblClick) {
                    this.isDblClick = true
                    this.mytime = setTimeout(() => {
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
                    clearTimeout(this.mytime)
                    this.isDblClick = false

                }

            }
        },
    }
</script>

<style scoped>
    .wrapper {
        padding: 80px 29px 100px 20px;
    }

    .avatar-uploader {
        margin-left: 11px;
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

    .edit-photos-content {
        cursor: pointer;
        display: block;
        cursor: pointer;
        width: 60px;
        height: 60px;
        border: 2px solid black;
        padding: 3px 3px;
        background: #fff;
        margin-left: 12px;
        color: rgba(0, 0, 0, .3);
    }

    .edit-photos-content:hover {
        color: #409EFF;
    }

    .edit-photos {
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
        left: 21px;
    }
</style>