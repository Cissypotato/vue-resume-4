

window.Main={
    props:[],
    data(){
        return{
            store:store,
            editingName:false,
            skinVisible:false,
            shareLink:"unknown",
            // mode:'edit',//'preview',
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
    computed:{
        displayResume(){
            if(this.$store.state.mode ==="preview"){
                this.previewResume=this.$store.state.resume
                return this.previewResume
            }else{
                return  this.$store.state.resume
            }
            // return this.mode==="preview" ? this.previewResume : this.$store.state.resume
        },
        modeState(){
            return this.$store.state.mode
        }
    },
    watch:{
        'this.$store.state.currentUser.objectId':function(newValue,oldValue){
            if(newValue){
                this.$store.commit('getResume',this.currentUser)
                // this.getResume(this.currentUser).then((resume)=>{
                //     this.resume=resume
                // })
            }
        }
    },
    methods:{
        onlogin(user){
            this.$store.state.currentUser.objectId=user.objectId
            this.$store.state.currentUser.email=user.email
        },
        onRegister(user){
            this.$store.state.currentUser.objectId=user.objectId
            this.$store.state.currentUser.email=user.email
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
            return !!this.$store.state.currentUser.objectId
            
        },     
        handleSave(){
            var currentUser = AV.User.current();
            if (currentUser) {
                this.saveResume()
            }else {
                alert('请先登录哦')
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
            user.set('resume', this.$store.state.resume);
            // 保存到云端
            user.save().then(()=>{
                alert('保存成功')
            },(error)=>{
                consol.log(error)
                alert('保存失败')
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
            var printData = document.getElementById("resume").innerHTML; //获得 div 里的所有 html 数据
            window.document.body.innerHTML = printData;   //把 html 里的数据 复制给 body 的 html 数据 ，相当于重置了 整个页面的 内容
            window.print()
        },
        previewMode(){
            this.$store.commit('changeMode','preview')
        },
        editMode(){
            this.$store.commit('changeMode','edit')
        },
        
    },
   
    template:`
    <div>
        <div class="btns" v-if="this.$store.state.mode === 'edit'">
            <button v-on:click="showLogin">登录</button>
            <button v-on:click="handleSave">保存</button>
            <button v-on:click="hasShare()">分享</button>
            <button v-on:click="print">打印</button>
            <button v-on:click="skinVisible=!skinVisible">换肤</button>
            <button v-on:click="previewMode">预览</button>
            <button v-on:click="logout" v-show="hasLogin()">登出</button>
        </div>
        <app-resume  v-bind:display-resume="displayResume" v-bind:resume="resume" id="resume"></app-resume>

        <div class="quitPreview" v-if="modeState==='preview'">
            <button v-on:click="editMode">退出预览</button>
        </div>
        <skin v-show="skinVisible"></skin>
    </div>
    
    `
}


// Vue.component('app-main',Main)
{/* <app-resume v-bind:mo="mode" v-bind:display-resume="displayResume" v-bind:resume="resume" id="resume"></app-resume> */}

