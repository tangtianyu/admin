import * as qiniu from 'qiniu-js'
import axios from 'axios'

export default {

    upload_music: function (file, fn) {

     return   new Promise(function (resolve, reject) {

            axios.get(`http://192.168.0.109:3000/uploader/gettoken`).then((res) => {

                let token = res.data.uploadToken
                let song_serverURL =res.data.song_serverURL
                let config = {
                    useCdnDomain: true,
                    region: qiniu.region.z0
                };

                let putExtra = {
                    fname: "",
                    params: {},
                    mimeType: null
                };

                qiniu.upload(file,
                    file.name,
                    token,
                    putExtra,
                    config
                ).subscribe(
                    {
                        next(qn_res) {

                            fn(qn_res.total.percent)

                        },
                        error(err) {
                            // ...
                            console.log(err)
                        },
                        complete(qn_res) {
                            // ...
                            let url = song_serverURL+file.name
                            resolve(url)
                        }
                    }
                )


            })


        })

    }
}