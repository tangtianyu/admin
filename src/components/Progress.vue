<template>
    <div style="width: 100%">
    <div class="m-content">
        <div class="pause"><span class="my-icon" :class="isPause?'icon-play':'icon-pause'" @click="m_Pause"></span></div>
        <div class="start">{{playing_time | S_To_M}}</div>
        <div class="progress-bar">
            <div class="progress-bar__outer" @click="setPt($event)">
                <div class="progress-bar__inner" :style="{ width: progress + 'px' }" >
                    <div class="progress-bar__innerbtn" @mousedown="startMovePt($event)">
                        <div class="progress-bar__innerpt"></div>
                    </div>
                </div>
            </div>
            <video controls="" autoplay="" name="media" loop style="display: none" @play="play" @timeupdate="playing" ref="audioPlay" >
                <source :src="songUrl" :type="m_Type">
            </video>
        </div>
        <div class="end">{{duration | S_To_M}}</div>
    </div>

    <div class="lyric" >
        <ul class="lyric-scroll" ref="lyric_ctrl">
            <li class="nothing"></li>
            <li class="nothing"></li>
            <li class="nothing"></li>
            <li v-for="item in m_lyric">{{item}}</li>
            <li class="nothing"></li>
            <li class="nothing"></li>
        </ul>
        <div class="cover">
            <img src="../assets/cover.png" style="width: 480px;height: 79px" alt="">
        </div>
    </div>
    </div>
</template>

<script>
    export default {
        props:{
            songUrl:{
                type:String
            },
            lyric:{
                type:Array
            },
            m_Type:{
                type:String
            }

        },
        data() {
            return {
                progress: 0,
                e_clientX: 0,
                isDrag: false,
                len:0,
                duration:0,
                playing_time:0,
                isPause:false,
                m_lyric:[],
                lyric_Time:[],
                lyric_Y:0,
                mycount:0
            }
        },
        created(){

            this.lyric.forEach(v=>{
              let l= v.split(']')
                if(l[1]!=''){
                    let t= this.m_format(l[0])
                    this.lyric_Time.push(t)
                    this.m_lyric.push(l[1])
                }
            })
        },
        mounted(){
            this.globalMove(this.movePt);
            this.globalStopMove(this.stopMovePt);
        },
        filters:{
          S_To_M(val){
              let m=parseInt(val/60)
              let s=parseInt(val-m*60)
              if(m<10)
                  m='0'+m
              if(s<10)
                  s='0'+s
              return m+':'+s
          }
        },
        methods: {
            m_format(val){
                let a=val.replace('[','')
                let b=a.split(':')
                let c = Number(b[0])*60+Number(b[1])
                return c
            },
            startMovePt(event) {
                this.e_clientX = event.clientX
                this.isDrag = true
            },
            movePt(event){
                if (this.isDrag) {
                    this.len = event.clientX - this.e_clientX
                    this.e_clientX = event.clientX
                    this.progress+=this.len
                    if(this.progress>500)
                        this.progress=500
                    if(this.progress<0)
                        this.progress=0
                }
            },
            stopMovePt(){
                if(this.isDrag){
                    this.$refs.audioPlay.currentTime=this.progress*this.duration/500
                    this.setLyricY(this.$refs.audioPlay.currentTime)
                }
                this.isDrag=false
            },
            setPt(event){
                if(event.target.className==="progress-bar__innerbtn"){
                    this.progress=this.progress+event.layerX-9
                    this.$refs.audioPlay.currentTime=this.progress*this.duration/500
                    this.setLyricY(this.$refs.audioPlay.currentTime)
                }
                else if(event.target.className==="progress-bar__innerpt"){
                    this.progress=this.progress+event.layerX-11
                    this.$refs.audioPlay.currentTime=this.progress*this.duration/500
                    this.setLyricY(this.$refs.audioPlay.currentTime)

                }
                else {
                    this.progress=event.layerX
                    this.$refs.audioPlay.currentTime=this.progress*this.duration/500
                    this.setLyricY(this.$refs.audioPlay.currentTime)
                }
            },
            setLyricY(time){
                this.lyric_Time.forEach((v,i,a)=>{
                    if(v<time&&a[i+1]>time){
                        this.mycount=i
                        this.lyric_Y=this.mycount*20
                    }
                })

            },
            play(event){
                this.duration=event.target.duration
            },
            playing(event){
                if(!this.isDrag) {
                        this.progress= 500*event.target.currentTime/this.duration
                        let m=parseInt(event.target.currentTime/60)
                        let s=parseInt(event.target.currentTime-m*60)
                        this.playing_time=event.target.currentTime

                    if(event.target.currentTime>this.lyric_Time[this.mycount]){
                       // this.lyricMove()
                        this.mycount++
                        this.lyric_Y+=20
                        this.$refs.lyric_ctrl.scrollTop = this.lyric_Y

                    }
                }

            },
            m_Pause(){
                this.isPause = !this.isPause
                if(this.isPause)
                this.$refs.audioPlay.pause()
                else
                    this.$refs.audioPlay.play()
            },
            lyricMove(){
                this.mycount++
                let timer= setInterval(()=>{
                             this.lyric_Y += 1
                             if(this.lyric_Y<20*this.mycount+1){
                                 this.$refs.lyric_ctrl.scrollTop = this.lyric_Y
                             }
                             else{
                                 clearInterval(timer)
                                 this.lyric_Y-=1
                             }
                    },10)
            }
        },
    }
</script>

<style scoped>
    .m-content{
        position: relative;
        width:675px;
    }
    .start{
        position: absolute;
        top:15px;
        width: 40px;
        height: 50px;
        text-align: center;
        line-height: 50px;
        left: 50px;
    }
    .pause{
        position: absolute;
        top:15px;
        width: 50px;
        height: 50px;
        font-size: 0;
        text-align: center;
        line-height: 68px;
        left: 0;
    }
    .end{
        position: absolute;
        top:15px;
        width: 40px;
        height: 50px;
        text-align: center;
        line-height: 50px;
        right: 0;
    }
    .progress-bar {
        position: absolute;
        left: 90px;
        height: 8px;
        width: 500px;
        padding: 0 20px;
    }
    .progress-bar__outer {
        cursor: pointer;
        height: 8px;
        width: 100%;
        border-radius: 4px;
        background: #ebeef5;
        -webkit-transform:translateY(36px);
        transform: translateY(36px);
    }

    .progress-bar__inner {
        cursor: pointer;
        position: relative;
        height: 100%;
        border-radius: 4px;
        background: #f56c6c;
    }

    .progress-bar__innerbtn {
        cursor: pointer;
        position: absolute;
        background: #fff;
        top: -5px;
        right: -9px;
        border-radius: 8px;
        border: 1px solid #ebeef5;
        width: 16px;
        height: 16px;
    }

    .progress-bar__innerpt {
        border-radius: 4px;
        width: 8px;
        height: 8px;
        background: #f56c6c;
        margin: 4px auto;
    }
    .my-icon {
        font-size: 22px;
        color: #f56c6c;
        text-align: center;

    }

    .my-icon:hover {
    }

    .lyric{
        position: relative;
        float: right;
        width: 480px;
        height: 100%;
        overflow: hidden;
    }
    .lyric-scroll{
        width: 489px;
        padding-right: 9px;
        height: 79px;
        overflow-x:hidden;
        overflow-y:scroll;
        transition: all .3s;
        text-align: center;
    }
    .cover{
        position: absolute;
        width: 100%;
        height: 100%;
        font-size: 0;
        left: 0;
        top:0;
    }
    .nothing{
        height: 17px;
    }
</style>