
window.Login={
    data:function(){
        return {
            // store:store,
            login:{
                email:'',
                password:''
            }
        }
    },
    methods:{
        onLogin(e){
            AV.User.logIn(this.login.email, this.login.password).then( (user)=> {
                user=user.toJSON()
                this.$store.state.currentUser.objectId=user.objectId
                this.$store.state.currentUser.email=user.email
                // console.log(user)
                
                // this.$emit('login',user)
                this.$store.commit("getResume",user)
                this.$router.push('/')
              }, function (error) {
                  if(error.code===211){
                      alert("该邮箱没有被注册")
                  }else if (error.code===210){
                      alert('密码与邮箱不匹配')
                  }
              })
        },
        OnClickRegister(){
            this.$router.push('/register')
        }
    },
    template:`
    <div class="login" v-on:submit.prevent="onLogin">
        <form action="" class="loginForm">    
            <router-link to="/" class="closeLogin">x</router-link>
            <h2>登录</h2>
            <div class="row">
                <label>邮箱:</label>
                <input type="email" v-model="login.email">
            </div>
            <div class="row">
                <label>密码:</label>
                <input type="password" v-model="login.password">
            </div>
            <div class="lbtns">
                <button type="submit" class="Lsubmit">提交</button>
                <router-link to="/register" class="lregister">注册</router-link>
            </div>
            
        </form>
    </div>
    `
}
Vue.component('login',window.Login)