

const routes = [
  { path: '/', component: window.Main },
  { path: '/login', component: window.Login },
  { path: '/register', component: window.Register },
  { path: '/share', component: window.Share },
]


const router = new VueRouter({
  routes // (缩写，ES6语法) 相当于 routes: routes
})

const store = new Vuex.Store({
    state: {
        currentUser:{email:undefined,objectId:undefined},
        shareLink:"unknown",
        mode:'edit',
        resume:{
            name:"姓名",
            jobIntention:"求职意向",
            birthday:"年龄",
            gender:"性别",
            email:"邮箱",
            phone:"手机",
            skills:[
                {name:"技能名称",description:"技能描述"},
                {name:"技能名称",description:"技能描述"},
                {name:"技能名称",description:"技能描述"},
                {name:"技能名称",description:"技能描述"},
            ],
            projects:[
                {name:"项目名称",keywords:"项目描述",link:"项目链接",description:"项目描述"},
                {name:"项目名称",keywords:"项目描述",link:"项目链接",description:"项目描述"},
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
    },

    
    mutations: {
        getResume(state,user){
            var query = new AV.Query('User');
             query.get(user.objectId).then( (loginedUser)=> {
                loginedUser=loginedUser.toJSON()
                state.resume= loginedUser.resume 
                
            }, function (error) {
                // 异常处理
            });

        },
        changeMode(state,aaa){
            state.mode=aaa
        }

    }
  })





var app = new Vue({
    router:router,
    el: '#app',
    store:store,
    data: { 
        // currentUser:{email:undefined,objectId:undefined},
        // editing:false,
        
    },

    watch:{
        'this.store.state.currentUser.objectId':function(newValue,oldValue){
            if(newValue){
                this.store.commit('getResume',this.currentUser)
                // this.getResume(this.currentUser).then((resume)=>{
                //     this.resume=resume
                // })
            }
        }
    },
    methods:{
   
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
    }
   
})




//
//获取当前用户
let currentUser=AV.User.current()
if (currentUser){
    store.state.currentUser=currentUser.toJSON() 
    console.log(store.state.currentUser)
    store.state.shareLink=location.origin+location.pathname+'?user_id='+store.state.currentUser.objectId
    store.commit("getResume",store.state.currentUser)
    
}



//获取预览用户Id
let search=location.search
let pattern=/user_id=([^&]+)/
let matches=search.match(pattern)
let userId


if(matches){
    userId=matches[1]
    store.commit('changeMode',"preview")
    store.commit('getResume',{objectId:userId})
    console.log('预览模式')
    console.log(store.state.mode)
}else{
    console.log('编辑模式')
}


