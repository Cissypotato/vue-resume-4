
window.Register={
    data:function(){
        return {
            store:store,
            register:{
                email:'',
                password:''
            },
            resume:{
                name:"姓名",
                jobIntention:"求职意向",
                birthday:"年龄",
                gender:"性别",
                email:"邮箱",
                phone:"手机",
                skills:[
                    {name:"1",description:"11"},
                    {name:"2",description:"22"},
                    {name:"3",description:"33"},
                    {name:"4",description:"44"},
                ],
                projects:[
                    {name:"项目名称",keywords:"关键字",link:"项目链接",description:"项目描述"},
                    {name:"项目名称",keywords:"关键字",link:"项目链接",description:"项目描述"},
                ]
            },
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
        user.set('resume', this.resume);
        user.signUp().then( (loggedInUser)=> {
            user=loggedInUser.toJSON()
            console.log(user)
            // user=Object.assign(user,this.resume)
            // console.log(user)
            this.$router.push('/login')
            alert('注册成功,请登录')
        }, function (error) {
            alert(error.rawMessage)
        })
    },
    onClickLogin(){
        this.$router.push("/login")
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