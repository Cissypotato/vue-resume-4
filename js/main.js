window.Main={
    props:[],
    data(){
        return {
            editingName:false,
            loginVisible:false,
            registerVisible:false,
            shareVisible:false,
            skinVisible:false,
            shareLink:"unknown",
            mode:'edit',//'preview',
            currentUser:{email:undefined,objectId:undefined},
            previewUser:{previewUserId:undefined},
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
            previewResume:{
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
            login:{
                email:'',
                password:''
            },
            register:{
                email:'',
                password:''
            },
            
    
        }
    },
    methods:{
        onlogin(user){
            this.currentUser.objectId=user.objectId
            this.currentUser.email=user.email
            this.loginVisible=false
        },
        onRegister(user){
            this.currentUser.objectId=user.objectId
            this.currentUser.email=user.email
            this.registerVisible=false
        },
        hasShare(){
            if(this.hasLogin()){
                this.$router.push("/share")
            }else{
                alert('请先登录哦')
                this.showLogin()
            }
        }, 
        hasLogin(){
            return !!this.currentUser.objectId
            
        },     
        handleSave(){
            var currentUser = AV.User.current();
            if (currentUser) {
                this.saveResume()
            }else {
               this.showLogin()
            }
        },
        showLogin(){
            this.$router.push('/login')
        },
        saveResume(){
           
            let objectId=AV.User.current().toJSON().objectId;
            var user = AV.Object.createWithoutData('User', objectId);
            // 修改属性
            user.set('resume', this.resume);
            // 保存到云端
            user.save().then(()=>{
                alert('保存成功')
            },(error)=>{
                consol.log(error)
                alert('保存失败')
            });
        },
        getResume(user){
            var query = new AV.Query('User');
            return query.get(user.objectId).then( (loginedUser)=> {
                loginedUser=loginedUser.toJSON()
                let resume= loginedUser.resume 
                return resume
                // Object.assign(this.resume,logined.resume)
                // console.log(this.resume)
            }, function (error) {
                // 异常处理
            });

        },
        logout(){
            AV.User.logOut();
            // 现在的 currentUser 是 null 了
            var currentUser = AV.User.current();
            this.currentUser={email:undefined,objectId:undefined}
            alert("退出成功")
        },
        print(){
            window.print()
        },
       
    },
    computed:{
        displayResume(){
            return this.mode==="preview" ? this.previewResume : this.resume
        }
    },
    template:`
    <div>
        <div class="btns" v-if="mode === 'edit'">
            <button v-on:click="showLogin">登录</button>
            <button >注册</button>
            <button v-on:click="handleSave">保存</button>
            <button v-on:click="hasShare()">分享</button>
            <button v-on:click="print">打印</button>
            <button v-on:click="skinVisible=!skinVisible">换肤</button>
            <button v-on:click="mode='preview'">预览</button>
            <button v-on:click="logout" v-show="hasLogin()">登出</button>
        </div>
        
        <app-resume v-bind:mo="mode" v-bind:display-resume="displayResume" v-bind:resume="resume"></app-resume>

        <div class="quitPreview" v-if="mode==='preview'">
            <button v-on:click="mode='edit'">退出预览</button>
        </div>
    </div>
    
    `
}

Vue.component('app-main',Main)