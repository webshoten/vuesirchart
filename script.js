Vue.config.devtools = true;


const router = new VueRouter({
	routes : [
        { path: '/', component: httpVueLoader('./components/about.vue') },
        { path: '/sirmodel', component: httpVueLoader('./components/sirmodel.vue') },
        { path: '/seirmodel', component: httpVueLoader('./components/seirmodel.vue') },
        { path: '/authentication', component: httpVueLoader('./components/authentication.vue') }
	]
})

router.beforeEach((to, from, next) => {
  next()
})

new Vue({
    el: '#app',
    methods:{
      menu_close(){
        this.nav_lists.forEach( nav_list => nav_list.active = false)
      },
      hamburger_open(){
        //open current route's list
        _routePath = this.$route.path
        this.nav_lists.forEach( nav_list => { 
          if(nav_list.to == _routePath){nav_list.active = true }
          else {
            openflag = false
            if(nav_list.lists !=undefined){
              nav_list.lists.forEach( list => {
                if(list.to == _routePath){openflag = true }
              })
              if(openflag)nav_list.active = true
            }
          }
        })
        return this.drawer=!this.drawer
      }
    },
    data: {
        drawer: false,
        nav_lists:[
            {
              name: 'About',
              icon: 'mdi-party-popper', //speedometer
              active: true,
              lists:undefined,
              to:'/'
            },
            {
              name: 'Calmulations',
              icon: 'mdi-chart-bell-curve',
              active: false,
              lists:[ {name:'SIR model',to:'/sirmodel'},{name:'SEIR model',to:'/seirmodel'}],
              to:''
            },
            {
              name: 'Integration',
              icon: 'mdi-application',
              active: false,
              lists:[ {name:'Authentication',to:'/authentication'}],
              to:''
            },

          ],
    },
    router: router,
    vuetify: new Vuetify(),
})

MathJax.Hub.Config({
  displayAlign: "left",
  displayIndent: "2em"
});