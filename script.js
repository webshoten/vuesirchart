Vue.config.devtools = true;
new Vue({
    el: '#app',
    data: {
        labels:[1,2,3,4,5,6],
        Susceptible:{
            title:'Susceptible',
            data: [100, -50, 200, 150, 200, 400]
        },
        Infected:{
            title:'Infected',
            data: [150, -20, 100, 130, 220, 420]
        },
        Recovered:{
            title:'Recovered',
            data: [110, -22, 60, 120, 220, 420]
        },                 
        firstInfected:10,
        contactPerDay:10,
        NN:10000,
        s:10000-10,
        i:1,
        r:0,
        beta:0.2/10000,
        gamma:0.07,
        dt:1,   
        tmax:200, 
    },
    watch: {
        MathObject: {
            handler:function (newValue,oldValue) {

                if(newValue[5] != oldValue[5] || newValue[4] != oldValue[4]){
                    this.Infected.data.splice(0)
                    this.Susceptible.data.splice(0)
                    this.Recovered.data.splice(0)
                    this.randData()
                }
               this.canvas.data.datasets[0].data = this.Infected.data;
               this.canvas.data.datasets[1].data = this.Susceptible.data;
               this.canvas.data.datasets[2].data = this.Recovered.data;
               this.canvas.data.labels = this.labels
               this.canvas.update();
            },
            deep: true,
        }
    },
    computed: {
        MathObject() {
        return [this.labels,this.Susceptible,this.Infected,this.Recovered,this.beta,this.gamma];
        }
       },
    mounted() {
        this.chart();
    },
    methods: {
        chart() {
            var vm = this;
            var ctx = document.getElementById("charts");
            vm.canvas = new Chart(ctx, {
                type: 'line',   //vm.graphSelected,
                data: {
                    labels: vm.labels, // Array(vm.datasets.length).fill(''),
                    datasets: [{
                        label: vm.Susceptible.title, // 'グラフx',
                        fill: false,
                        borderColor: '#20B2AA',
                        data: vm.Susceptible.data //vm.datasets
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
        randData() {

            beta = this.beta
            gamma = this.gamma

            k1 = []
            k2 = []
            k3 = []
            k4 = []
            Tarray = []
            Sarray = []
            Iarray = []
            Rarray = []
            this.s = 10000-20
            this.i = 1
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
    }
})