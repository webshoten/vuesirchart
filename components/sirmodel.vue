<template>


                    <div class="container-fluid">

                    <div class="jumbotron p-2">
                        <h1>SIRモデルのシミュレーション</h1>
                            <p>4次のルンゲクッタ法を用いたSIRモデルのシミュレーション</p>
                    </div>


                        <div class="row">
            
                            <div class="col-12 col-md-8">
                                <div class="col-12">
                                    <div class="row">
                                        <div class="col">
                                            <h2>SIR model chart</h2>
                                        </div>
                                    </div>
                                    <div>

                                        <div class="chart-container">
                                        <canvas id="charts"></canvas>
                                        </div>
                                    </div>
                                </div>
                            </div>
            
            
                            <div class="col-12 col-md-4">
            
                                <h2>Params</h2>


                                <label for="contactPerDay">接触者数:</label>
                                <div class="row">
                                    <div  class="col-12 col-md-3">
                                        <input type="number" class="form-control" v-model.number="contactPerDay">
                                    </div>
                                    <div  class="col-12 col-md-9">
                                        <input type="range" class="form-control" min="0" max="100"  v-model.number="contactPerDay">
                                    </div>
                                </div>    


                                <label for="infection">感染率:</label>
                                <div class="row">
                                    <div  class="col-12 col-md-3">
                                        <input type="number" class="form-control" v-model.number="infection">
                                    </div>
                                    <div  class="col-12 col-md-9">
                                        <input type="range" class="form-control" min="0.01" max="0.10" step="0.01" v-model.number="infection">
                                    </div>
                                </div>    

                                <label for="recoverdate">回復までの日数:</label>
                                <div class="row">
                                    <div  class="col-12 col-md-3">
                                        <input type="number" class="form-control" v-model.number="recoverdate">
                                    </div>
                                    <div  class="col-12 col-md-9">
                                        <input type="range" class="form-control" min="1" max="50"  v-model.number="recoverdate">
                                    </div>
                                </div>    


                                <label for="firstInfected">初期感染者数:</label>
                                <div class="row">
                                    <div  class="col-12 col-md-3">
                                        <input type="number" id="firstInfected" class="form-control" v-model.number="firstInfected">
                                    </div>
                                    <div  class="col-12 col-md-9">
                                        <input type="range" class="form-control" min="0" max="20"  v-model.number="firstInfected">
                                    </div>
                                </div>    


                                <div class="row">
                                    <div  class="col-12 col-md-3">
                                        $$\beta = $$ 
                                    </div>

                                    <div  class="col-12 col-md-9 d-flex align-items-center">
                                    {{Math.round((this.infection*this.contactPerDay/this.NN ) * 1000000 ) / 1000000 }}
                                    </div>
                                </div>    


                                <div class="row">
                                    <div  class="col-12 col-md-3">
                                        $$\gamma = $$ 
                                    </div>

                                    <div  class="col-12 col-md-9 d-flex align-items-center">
                                    {{Math.round((1.0/this.recoverdate) * 1000000) / 1000000}}
                                    </div>
                                </div>   

                                <div class="row">
                                    <div  class="col-12 col-md-3">
                                        $$R_0 = $$ 
                                    </div>

                                    <div  class="col-12 col-md-9 d-flex align-items-center">
                                    {{  (10000 - this.firstInfected)*( this.infection*this.contactPerDay/this.NN )/(1.0/this.recoverdate)     }}
                                    </div>
                                </div> 


                            </div>
            
                        </div>
            
                        <div class="jumbotron p-2">
                            <ol>
                                <li>人口を1万人とする</li>
                                <li>SIRモデルにおける感染率 ※接触者数、感染率は、1日1人あたり$$\beta = \frac{(接触者数) \times (感染率)}{人口}$$ </li>
                                <li>SIRモデルにおける回復率$$\gamma = \frac{1}{(回復までの日数)}$$ </li>
                                <li>基本再生産数$$R_0 = \frac{S(0)\beta}{\gamma}$$ </li>
                            </ol>
                        </div>
        
                        <v-footer padless>
                           <v-col
                            cols="12"
                            >
                             <h6>[参考1]:基本的なモデル https://wagtail.cds.tohoku.ac.jp/coda/python/p-6-application-sup-ode-sir-model.html</h6>
                             <h6>[参考2]:基本再生産数 https://www.naika.or.jp/jsim_wp/wp-content/uploads/2020/11/nichinaishi-109-11-article_4.pdf</h6>
                             <h6>[参考3]:ルンゲクッタ法 http://pc-physics.com/rk1.html</h6>
                             <h6>[参考4]:SIRモデル https://ja.wikipedia.org/wiki/SIR%E3%83%A2%E3%83%87%E3%83%AB </h6>
                            </v-col>
                            <v-col
                            class="text-center"
                            cols="12"
                            >
                            {{ new Date().getFullYear() }} — <strong>SDS hiro</strong>
                            </v-col>
                        </v-footer>


                    </div>         
</template>
<script>
module.exports = {
  data: function() {
    return {
        title: 'sirmodel.vue',
    
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
        infection:0.02,
        gamma:0.07,
        dt:1,   
        tmax:120, 
    }
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
        return [this.labels,this.Susceptible,this.Infected,this.Recovered,this.infection,this.gamma,this.firstInfected,this.contactPerDay,this.recoverdate];
        }
       },
    mounted() {
         MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
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
                    maintainAspectRatio: false,
                    elements: { 
                        point: { radius: 0 } 
                    },
                    scales: {                         
                        xAxes: [                          
                            {
                                scaleLabel: {                
                                    display: window.screen.width > 414,              
                                    labelString: 'Days',   
                                    fontColor: "black",           
                                    fontSize: 16               
                                },
                            }
                        ],
                        yAxes: [                         
                            {
                                scaleLabel: {               
                                    display: window.screen.width > 414,             
                                    labelString: 'Population', 
                                    fontColor: "black",         
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

            beta = this.infection*this.contactPerDay/this.NN

            this.gamma = 1.0/this.recoverdate
            this.gamma = Math.round(this.gamma * 1000000) / 1000000
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

}
</script>

<style scoped>
h1 {
    color: black;
}

@media (min-width: 960px){
.chart-container{
    position: relative;
    height:70vh
}
}

@media (max-width: 960px){
.chart-container{
    position: relative;
    height:50vh
}
}


</style>