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
              name: 'About',
              icon: 'mdi-party-popper', //speedometer
              active: true,
              to:'/'
            },
            {
              name: 'Simulations',
              icon: 'mdi-chart-bell-curve',
              active: true,
              lists:[ {name:'SIR model',to:'/sirmodel'}],
              to:''
            },
          ],
    },
    router: router,
    vuetify: new Vuetify(),
})