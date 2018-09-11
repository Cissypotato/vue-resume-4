window.Share={
    // props:['share-link'],
    methods:{
        closeShare(){
            this.$router.push('/')
        }
    },
    template:`
    <div class="share" v-cloak>
        <h2>复制以下链接分享</h2>
        <textarea readonly>{{this.$store.state.shareLink}}</textarea>
        <span v-on:click="closeShare">X</span>
    </div>
    `
}

Vue.component('share',window.Share)