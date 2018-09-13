window.Share={
    // props:['share-link'],
    methods:{
        closeShare(){
            this.$router.push('/')
        }
    },
    template:`
    <div class="share" v-cloak>
        <textarea readonly>{{this.$store.state.shareLink}}</textarea>
        <h2>复制以下链接分享</h2>
        <span v-on:click="closeShare" class="closeShare">X</span>
    </div>
    `
}

Vue.component('share',window.Share)