<template>
    <div>
        <div ref="cropper-parent" v-show="showCropper == true">
            <cropper
                ref="cropper"
                class="cropper"
                style="width: 50%;"
                :src="image"
                :stencil-props="{
                    aspectRatio: 1/1
                }"
            />
        </div>
        <div class="profile-flex">
            <div id="setting-i1" class="card">
                <div style="border-bottom: solid 1px #e0e0e0;">
                    <h2 class="mt8 mb8 mr16 ml16" style="font-weight: 300;">Profile</h2>
                </div>

                <div class="pr16 pl16 pt16 pb16">
                    <div class="profile-img" @click="$refs.input.click()">
                        <img v-if="image != ''" :src="image" alt="" style="width: inherit; height: inherit;">
                        <font-awesome-icon v-else style="width: inherit; height: 40%; opacity: 0.2; margin: auto;" :icon="['fas', 'plus']"></font-awesome-icon>
                    </div>

                    <input ref="input" @change="changeImg" style="display: none;" type="file" accept="image/*">
                </div>
            </div>

            <div id="setting-i2">           
                <the-setting :pageId="3">
                    <template #table-head>
                        <div style="border-bottom: solid 1px #e0e0e0;">
                            <h2 class="mt8 mb8 mr16 ml16" style="font-weight: 300;">Settings</h2>
                        </div> 
                    </template>
                </the-setting>
            </div>
        </div>
    </div>
</template>

<script>
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css';
import swal from 'sweetalert'
import axios from '../api/axiosInstance.js';

import TheSetting from './TheSetting.vue';
    export default {
        components: { Cropper, TheSetting },
        name: 'TheProfile',
        data() {
            return {
                image: '',
                showCropper: false
            }
        },
        mounted() {
            this.$store.dispatch('images/fetchProfilePic', {
                userId: -1,
                width: 100,
                height: 100
            })
            .then(() => {
                this.image = this.$store.getters['images/getProfilePic']('-1_100x100')
            })
        },
        methods: {
            changeImg(e) {
                const selectedImage = e.target.files[0]
                this.createBase64Image(selectedImage)
            },
            createBase64Image(fileObject) {
                const reader = new FileReader()
                reader.onload = (e) => {
                    this.image = e.target.result
                    this.showCropper = true
                    swal({
                        content: this.$refs['cropper-parent']
                    })
                    .then(value => {
                        if (value == null) throw null

                        const {canvas} = this.$refs.cropper.getResult()
                        this.image = canvas.toDataURL()


                        const formData = new FormData();
                        canvas.toBlob(async blob => {
                            formData.append(
                                "File",
                                blob,
                                "profilePic.jpeg"
                            );

                            axios.post('settings/profile-pic', formData, {
                                withCredetials: true,
                                headers: {
                                    "Content-Type": "multipart/form-data"
                                }
                            })
                            .then(() => {
                                this.$toast.success('success')
                            })
                            .catch(() => {
                                this.$toast.error(`Oops! We can't perform this action right now`)
                            })
                        }, "image/jepg")
                    })
                    .catch(err => {
                        console.log(err)
                    })
                    .finally(() => this.showCropper = false)
                }
                reader.readAsDataURL(fileObject)
            }
        }
    }
</script>

<style scoped>
#setting-i1 {
    width: 30%;
    height: fit-content;
}
#setting-i2 {
    width: calc(70% - 36px);
}
.profile-flex {
    width: 100%;
    display: flex;
    margin: 12px;
    gap: 12px;
}
.profile-img img,
.profile-img {
    border: solid 1px #e0e0e0;
    border-radius: 100%;
    width: 100px;
    height: 100px;
    margin: 0 auto;
    cursor: pointer;
    display: flex;
}
</style>