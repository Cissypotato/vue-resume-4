
const Foo = { template:  ``}
const Bar = { template: `` }



const routes = [
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar }
]


const router = new VueRouter({
  routes // (缩写，ES6语法) 相当于 routes: routes
})


const app = new Vue({
  router:router,//也可以根据ES6语法直接写router
  el:"#app"
})









// export default {
//   computed: {
//     username () {
//       // 我们很快就会看到 `params` 是什么
//       return this.$route.params.username
//     }
//   },
//   methods: {
//     goBack () {
//       window.history.length > 1
//         ? this.$router.go(-1)
//         : this.$router.push('/')
//     }
//   }
// }