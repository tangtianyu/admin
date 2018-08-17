<template>
    <div class="wrapper">
        <div class="multiple-op">
            <el-button
                    size="mini"
                    @click="multipleEdit"
            >编辑
            </el-button>
            <el-button
                    size="mini"
                    type="danger"
                    @click="multipleDel"
            >删除
            </el-button>
        </div>
        <el-button
                style="float: right;margin-right: 15px;margin-top: 20px"
                type="info" icon="el-icon-plus"
                circle
                @click="add_new_album">
        </el-button>
        <el-table
                :data="albums"
                style="width: 100%"
                @selection-change="handleSelectionChange">
            <el-table-column
                    type="selection"
                    width="55">
            </el-table-column>
            <el-table-column
                    label="编号"
                    align="center"
                    width="60">
                <template slot-scope="scope">
                    <span>{{ scope.$index+1}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="专辑名"
                    align="center"
                    width="140">
                <template slot-scope="scope">
                    <span>{{ scope.row.albumName }}</span>
                </template>
            </el-table-column>

            <el-table-column
                    label="照片"
                    align="center"
                    width="140">
                <template slot-scope="scope">
                    <img style="width: 60px;cursor: pointer" :src="scope.row.image" alt="" @click="ShowImg(scope.row.image)">
                </template>
            </el-table-column>
            <el-table-column
                    label="简介"
                    align="center"
                    width="100">
                <template slot-scope="scope">
                    <el-popover trigger="click" placement="top">
                        <p style="width: 500px">{{ scope.row.introduction }}</p>
                        <div slot="reference">
                            <el-tag size="medium">简介</el-tag>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>

            <el-table-column
                    label="热度"
                    align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.popularity}}</span>
                </template>
            </el-table-column>

            <el-table-column
                    label="发售日期"
                    align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.sellDay}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="相册"
                    align="center"
                    width="140">
                <template slot-scope="scope">
                    <div class="photos-content" @click="showSlider(scope.row)">
                        <div class="photos">
                            <img style="width: 25px;height:25px;" v-for="image in scope.row.photos" :src="image" alt="">
                        </div>
                    </div>
                </template>
            </el-table-column>

            <el-table-column label="操作"
                             align="center">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="edit(scope.row.id)"
                    >编辑
                    </el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="del(scope.$index,scope.row.id)"
                    >删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>

    export default {
        name: 'home',
        data() {
            return {
                albums: [],
                albumsids:[]
            };
        },
        created() {
            this.$emit('thisActive', this.$route.path)
            this.init()
        },
        methods: {
             init() {
                 this.axios.get(this.myurl+`admin/albums`).then((res) => {
                    this.albums = res.data.albums
                      this.albums.forEach((v) => {
                          v.photos = v.photos.split('|')
                     })
                })
            },
            del(index, id) {
                this.axios.delete(this.myurl+`admin/albums/${id}`).then((res) => {
                    this.albums.splice(index, 1)
                })
            },
            showSlider(row) {
                this.$emit('showPhotos',row.photos)
            },
            ShowImg(imgUrl) {
                this.$emit('showImg',imgUrl)
            },
            add_new_album() {
                this.$router.push({name: 'newalbums'})
            },
            edit(id){
                this.axios.post(this.myurl+`admin/albums/postalbumsid`,{ids:[id]}).then(() => {
                    this.$router.push({name: 'editalbums'})
                })
            },
            handleSelectionChange(val) {
                this.albumsids = val.map((v)=>{
                    return v.id
                });
            },
            multipleEdit(){
                this.axios.post(this.myurl+`admin/albums/postalbumsid`,{ids:this.albumsids}).then(() => {
                    this.$router.push({name: 'editalbums'})
                })
            },
            multipleDel(){
                this.axios.post(this.myurl+`admin/albums/multipledel`,{ids:this.albumsids}).then(() => {
                    this.init()
                })
            }
        }

    }
</script>

<style scoped>
    .wrapper {
        padding: 60px 29px 100px 20px;
    }

    .multiple-op{
        position: absolute;
        top: 80px;
        left: 20px;
    }

    .el-tag {
        cursor: pointer;
    }

    .photos-content {
        cursor: pointer;
        width: 60px;
        height: 60px;
        border: 2px solid black;
        padding: 3px 3px;
        background: #fff;
        margin-left: 31px;
    }

    .photos {
        width: 50px;
        height: 50px;
        line-height: 0;
        font-size: 0;
        text-align: initial;
        overflow: hidden;
    }
</style>
