
window.Register={
    data:function(){
        return {
            register:{
                email:'',
                password:''
            }
        }
    },
   methods:{
    onRegister(e){
        var user = new AV.User();
        // 设置用户名
        user.setUsername(this.register.email);
        // 设置密码
        user.setPassword(this.register.password);
        // 设置邮箱
        user.setEmail(this.register.email);
        user.signUp().then( (loggedInUser)=> {
            user=loggedInUser.toJSON()
            this.$emit('register',user)
            alert('注册成功,并且已登录')
        }, function (error) {
            alert(error.rawMessage)
        })
    },
    onClickLogin(){
        this.$emit("login")
    }
   },
    template:`
    <div class="register"  v-on:submit.prevent="onRegister">
        <form action="">
        <router-link to="/">关闭</router-link>
            <h2>注册</h2>
            <div class="row">
                <label>邮箱</label>
                <input type="email" v-model="register.email">
            </div>
            <div class="row">
                <label>密码</label>
                <input type="password" v-model="register.password">
            </div>
            <button type="submit">提交</button>
            <router-link to="/login">登录</router-link>
        </form>
    </div>
    `
}
Vue.component('register',window.Register)