
// const Main = { template:  `<app-main v-bind:mode="mode" v-on:save="handleSave"></app-main>`}
// const Bar = { template: `` }



const routes = [
  { path: '/', component: window.Main },
  { path: '/login', component: window.Login },
  { path: '/register', component: window.Register },
  { path: '/share', component: window.Share },
//   { path: '/bar', component: Bar }
]


const router = new VueRouter({
  routes // (缩写，ES6语法) 相当于 routes: routes
})






var app = new Vue({
    router:router,
    el: '#app',
    data: { 
        currentUser:{email:undefined,objectId:undefined},
    },
    
    watch:{
        'currentUser.objectId':function(newValue,oldValue){
            if(newValue){
                this.getResume(this.currentUser).then((resume)=>{
                    this.resume=resume
                })
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


//获取当前用户
let currentUser=AV.User.current()
if (currentUser){
    app.currentUser=currentUser.toJSON() 
    app.shareLink=location.origin+location.pathname+'?user_id='+app.currentUser.objectId
    app.getResume(app.currentUser).then(resume =>{
        app.resume=resume
    })
    console.log(app.currentUser)
}

//获取预览用户Id
let search=location.search
let pattern=/user_id=([^&]+)/
let matches=search.match(pattern)
let userId


if(matches){
    userId=matches[1]
    app.mode="preview"
    app.getResume({objectId:userId}).then(resume=>{
        app.previewResume=resume
    })
    console.log('预览模式')
    console.log(app.mode)
}else{
    console.log('登录模式')
}

//



// const app = new Vue({
//   router:router,//也可以根据ES6语法直接写router
//   el:"#app"
// })
