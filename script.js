Vue.config.devtools = true;


const router = new VueRouter({
	routes : [
        { path: '/', component: httpVueLoader('./components/main.vue') },
        { path: '/sirmodel', component: httpVueLoader('./components/sirmodel.vue') }
	]
})

new Vue({
    el: '#app',
    data: {

        drawer: null,
        nav_lists:[
            {
              name: 'Getting Started',
              icon: 'mdi-speedometer',
              lists:[ {item:'main',to:'/'}]
            },
            {
              name: 'Simulations',
              icon: 'mdi-view-dashboard',
              lists:[ {item:'SIR model',to:'/sirmodel'}]
            },
            {
              name: 'Preminum themes',
              icon: 'mdi-vuetify'
            },
          ],
    },
    router: router,
    vuetify: new Vuetify(),
})