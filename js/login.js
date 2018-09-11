
window.Login={
    data:function(){
        return {
            store:store,
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
        <form action="">    
            <router-link to="/">关闭</router-link>
            <h2>登录</h2>
            <div class="row">
                <label>邮箱</label>
                <input type="email" v-model="login.email">
            </div>
            <div class="row">
                <label>密码</label>
                <input type="password" v-model="login.password">
            </div>
            <button type="submit">提交</button>
            <router-link to="/register">注册</router-link>
        </form>
    </div>
    `
}
Vue.component('login',window.Login)