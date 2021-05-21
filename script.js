Vue.config.devtools = true;


const router = new VueRouter({
	routes : [
        { path: '/', component: httpVueLoader('./components/main.vue') },
        { path: '/about', component: httpVueLoader('./components/about.vue') },
	]
})

new Vue({
    el: '#app',
    data: {
        labels:[1,2,3,4,5,6],
        Susceptible:{
            title:'感受性保持者(Susceptible)',
            data: [0, 0, 0, 0, 0, 0]
        },
        Infected:{
            title:'感染者(Infected)',
            data: [0, 0, 0, 0, 0, 0]
        },
        Recovered:{
            title:'免疫保持者(Recovered)',
            data: [0, 0, 0, 0, 0, 0]
        },                 
        firstInfected:10,
        contactPerDay:10,
        recoverdate:14,
        NN:10000,
        s:10000-10,
        i:10,
        r:0,
        beta:0.02,
        gamma:0.07,
        dt:1,   
        tmax:120, 
    },
    watch: {
        MathObject: {
            handler:function (newValue,oldValue) {

                if(newValue[8] != oldValue[8] || newValue[7] != oldValue[7] || newValue[6] != oldValue[6] || newValue[5] != oldValue[5] || newValue[4] != oldValue[4]){
                    this.Susceptible.data.splice(0)
                    this.Infected.data.splice(0)
                    this.Recovered.data.splice(0)
                    this.SIR()
                }
               this.canvas.data.datasets[0].data = this.Susceptible.data;
               this.canvas.data.datasets[1].data = this.Infected.data;
               this.canvas.data.datasets[2].data = this.Recovered.data;
               this.canvas.data.labels = this.labels
               this.canvas.update();
            },
            deep: true,
        }
    },
    computed: {
        MathObject() {
        return [this.labels,this.Susceptible,this.Infected,this.Recovered,this.beta,this.gamma,this.firstInfected,this.contactPerDay,this.recoverdate];
        }
       },
    mounted() {
        this.SIR();
        this.chart();
    },
    methods: {
        chart() {
            var vm = this;
            var ctx = document.getElementById("charts");
            vm.canvas = new Chart(ctx, {
                type: 'line',  
                data: {
                    labels: vm.labels, 
                    datasets: [{
                        label: vm.Susceptible.title, 
                        fill: false,
                        borderColor: '#20B2AA',
                        data: vm.Susceptible.data 
                    },
                    {
                        label: vm.Infected.title, 
                        fill: false,
                        borderColor: '#fd7e14',
                        data: vm.Infected.data 
                    },
                    {
                        label: vm.Recovered.title, 
                        fill: false,
                        borderColor: '#28a745',
                        data: vm.Recovered.data 
                    }
                    ]
                },
                options: { 
                    elements: { 
                        point: { radius: 0 } 
                    },
                    scales: {                         
                        xAxes: [                          
                            {
                                scaleLabel: {                
                                    display: true,              
                                    labelString: 'Days',   
                                    fontColor: "black",           
                                    fontSize: 16               
                                },
                            }
                        ],
                        yAxes: [                         
                            {
                                scaleLabel: {               
                                    display: true,             
                                    labelString: 'Population', 
                                   // fontFamily: "sans-serif",
                                    fontColor: "black",         
                                   // fontFamily: "sans-serif",
                                    fontSize: 16                
                                },
                            }
                        ]
                    }


                }
            });

        },
        f1(t,s,i,r,beta,gamma){
            return -1*beta*s*i;
        },
        f2(t,s,i,r,beta,gamma){
            return beta*s*i - gamma*i;
        },
        f3(t,s,i,r,beta,gamma){
            return gamma*i;
        },
        SIR() {

            beta = this.beta*this.contactPerDay/this.NN

            this.gamma = 1.0/this.recoverdate
            this.gamma = Math.round(this.gamma * 100) / 100
            gamma = this.gamma

            k1 = []
            k2 = []
            k3 = []
            k4 = []
            Tarray = []
            Sarray = []
            Iarray = []
            Rarray = []
            this.s = 10000-this.firstInfected
            this.i = this.firstInfected
            this.r = 0
            for(this.t=0;this.t<this.tmax;this.t+=this.dt) {
                 k1.push(this.dt*this.f1(this.t,this.s,this.i,this.r,beta,gamma))
                 k1.push(this.dt*this.f2(this.t,this.s,this.i,this.r,beta,gamma))
                 k1.push(this.dt*this.f3(this.t,this.s,this.i,this.r,beta,gamma))
                 
                 k2.push(this.dt*this.f1(this.t+this.dt/2.0,this.s+k1[0]/2.0,this.i+k1[1]/2.0,this.r+k1[1]/2.0,beta,gamma))
                 k2.push(this.dt*this.f2(this.t+this.dt/2.0,this.s+k1[0]/2.0,this.i+k1[1]/2.0,this.r+k1[1]/2.0,beta,gamma))
                 k2.push(this.dt*this.f3(this.t+this.dt/2.0,this.s+k1[0]/2.0,this.i+k1[1]/2.0,this.r+k1[1]/2.0,beta,gamma))

                 k3.push(this.dt*this.f1(this.t+this.dt/2.0,this.s+k2[0]/2.0,this.i+k2[1]/2.0,this.r+k2[1]/2.0,beta,gamma))
                 k3.push(this.dt*this.f2(this.t+this.dt/2.0,this.s+k2[0]/2.0,this.i+k2[1]/2.0,this.r+k2[1]/2.0,beta,gamma))
                 k3.push(this.dt*this.f3(this.t+this.dt/2.0,this.s+k2[0]/2.0,this.i+k2[1]/2.0,this.r+k2[1]/2.0,beta,gamma))

                 k4.push(this.dt*this.f1(this.t+this.dt,this.s+k3[0],this.i+k3[1],this.r+k3[1],beta,gamma))
                 k4.push(this.dt*this.f2(this.t+this.dt,this.s+k3[0],this.i+k3[1],this.r+k3[1],beta,gamma))
                 k4.push(this.dt*this.f3(this.t+this.dt,this.s+k3[0],this.i+k3[1],this.r+k3[1],beta,gamma))

                 this.s=this.s+(k1[0]+2.0*k2[0]+2.0*k3[0]+k4[0])/6.0
                 this.i=this.i+(k1[1]+2.0*k2[1]+2.0*k3[1]+k4[1])/6.0
                 this.r=this.r+(k1[2]+2.0*k2[2]+2.0*k3[2]+k4[2])/6.0

                 k1.splice(0)
                 k2.splice(0)
                 k3.splice(0)
                 k4.splice(0)

                Tarray.push(this.t)
                Sarray.push(this.s)
                Iarray.push(this.i)
                Rarray.push(this.r)
            }

            this.Infected.data = Iarray;
            this.Susceptible.data = Sarray;
            this.Recovered.data = Rarray;
            this.labels = Tarray;
        }
    },
    router
})