<template>


                    <div class="container-fluid">

                    <div class="jumbotron p-2">
                        <h1>SEIRモデルのシミュレーション</h1>
                            <h3>以下の常微分方程式[参考3]についての4次のルンゲクッタ法を用いたシミュレーション</h3>

                            <ul>
                                <li>$$\frac{dS(t)}{dt} = -\beta S(t) I(t) $$ </li>
                                <li>$$\frac{dE(t)}{dt} =  \beta S(t) I(t) - \epsilon E(t) $$ </li>
                                <li>$$\frac{dI(t)}{dt} =  \epsilon E(t) - \gamma I(t) $$ </li>
                                <li>$$\frac{dR(t)}{dt} =  \gamma I(t) $$ </li>
                            </ul>

                            <h3>パラメータと変数の定義[参考2]は以下</h3>
                            <ol>
                                <li>人口を1万人とする</li>
                                <li>本SEIRモデルにおける感染率 ※接触者数、感染率は、1日1人あたり$$\beta = \frac{(接触者数) \times (感染率)}{人口}$$ </li>
                                <li>本SEIRモデルにおける回復率$$\gamma = \frac{1}{(回復までの日数)}$$ </li>
                                <li>潜伏期間の逆数$$\epsilon = \frac{1}{(潜伏期間)}$$ </li>
                                <li>基本再生産数$$R_0 = \frac{S(0)\beta}{\gamma}$$ </li>
                            </ol>

                    </div>


                        <div class="row">
            
                            <div class="col-12 col-md-8">
                                <div class="col-12">
                                    <div class="row">
                                        <div class="col">
                                            <h2>SEIR model chart</h2>
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


                                <label for="contactPerDay">接触者数(1人1日あたり):</label>
                                <div class="row">
                                    <!-- <div  class="col-12 col-md-3">
                                        <input type="number" class="form-control" v-model.number="contactPerDay">
                                    </div> -->
                                    <div  class="col-12 col-md-12">
                                        <!-- <input type="range" class="form-control" min="0" max="50"  v-model.number="contactPerDay"> -->
                                        <v-slider max="50" min="0" 
                                          thumb-label="always"
                                          thumb-size="20"
                                        v-model.number="contactPerDay">
                                    </div>
                                </div>    


                                <label for="infection">感染率(1人1日あたり):</label>
                                <div class="row">
                                    <!-- <div  class="col-12 col-md-3">
                                        <input type="number" class="form-control" v-model.number="infection">
                                    </div> -->
                                    <div  class="col-12 col-md-12">
                                        <!-- <input type="range" class="form-control" min="0.01" max="0.50" step="0.01" v-model.number="infection"> -->
                                        <v-slider  min="0.01" max="0.50" step="0.01" 
                                        thumb-label="always"
                                        thumb-size="25"
                                        v-model.number="infection">
                                    </div>
                                </div>    


                                <label for="infection">潜伏期間:</label>
                                <div class="row">
                                    <!-- <div  class="col-12 col-md-3">
                                        <input type="number" class="form-control" v-model.number="incubationReriod">
                                    </div> -->
                                    <div  class="col-12 col-md-12">
                                        <!-- <input type="range" class="form-control" min="0" max="20" v-model.number="incubationReriod"> -->
                                        <v-slider  max="20" min="0" 
                                          thumb-label="always"
                                          thumb-size="20"
                                        v-model.number="incubationReriod">
                                    </div>
                                </div>    


                                <label for="recoverdate">回復までの日数:</label>
                                <div class="row">
                                    <!-- <div  class="col-12 col-md-3">
                                        <input type="number" class="form-control" v-model.number="recoverdate">
                                    </div> -->
                                    <div  class="col-12 col-md-12">
                                        <!-- <input type="range" class="form-control" min="1" max="50"  v-model.number="recoverdate"> -->
                                        <v-slider  min="1" max="50" 
                                        thumb-label="always"
                                        thumb-size="20"
                                         v-model.number="recoverdate">
                                    </div>
                                </div>    


                                <label for="firstInfected">初期感染者数:</label>
                                <div class="row">
                                    <!-- <div  class="col-12 col-md-3">
                                        <input type="number" id="firstInfected" class="form-control" v-model.number="firstInfected">
                                    </div> -->
                                    <div  class="col-12 col-md-12">
                                        <!-- <input type="range" class="form-control" min="0" max="20"  v-model.number="firstInfected"> -->
                                        <v-slider  min="0" max="20" 
                                        thumb-label="always"
                                        thumb-size="20"
                                         v-model.number="firstInfected">
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
                                        $$\epsilon = $$ 
                                    </div>

                                    <div  class="col-12 col-md-9 d-flex align-items-center">
                                    {{Math.round((1.0/this.incubationReriod) * 1000000) / 1000000}}
                                    </div>
                                </div>  


                                <div class="row">
                                    <div  class="col-12 col-md-3">
                                        $$R_0 = $$ 
                                    </div>

                                    <div  class="col-12 col-md-9 d-flex align-items-center">
                                    {{    Math.round( (10000 - this.firstInfected)*( this.infection*this.contactPerDay/this.NN )/(1.0/this.recoverdate)  * 1000000) / 1000000      }}
                                    </div>
                                </div> 


                            </div>
            
                        </div>
            
                        <!-- <div class="jumbotron p-2">
                            <ol>
                                <li>人口を1万人とする</li>
                                <li>SEIRモデルにおける感染率 ※接触者数、感染率は、1日1人あたり$$\beta = \frac{(接触者数) \times (感染率)}{人口}$$ </li>
                                <li>SEIRモデルにおける回復率$$\gamma = \frac{1}{(回復までの日数)}$$ </li>
                                <li>基本再生産数$$R_0 = \frac{S(0)\beta}{\gamma}$$ </li>
                            </ol>
                        </div> -->
        
                        <v-footer padless>
                           <v-col
                            cols="12"
                            >
                             <h6>[参考1]:https://iopscience.iop.org/article/10.1088/1742-6596/1040/1/012021/pdf</h6>
                             <h6>[参考2]:https://wagtail.cds.tohoku.ac.jp/coda/python/p-6-application-sup-ode-sir-model.html</h6>
                             <h6>[参考3]:https://www.naika.or.jp/jsim_wp/wp-content/uploads/2020/11/nichinaishi-109-11-article_4.pdf</h6>
                             <h6>[参考4]:ルンゲクッタ法 http://pc-physics.com/rk1.html</h6>
                             <h6>[参考5]:SEIRモデルとは https://ja.wikipedia.org/wiki/SEIR%E3%83%A2%E3%83%87%E3%83%AB </h6>

                            </v-col>
                            <v-col
                            class="text-center"
                            cols="12"
                            >
                            {{ new Date().getFullYear() }} — <strong>SDNC hiro</strong>
                            </v-col>
                        </v-footer>


                    </div>         
</template>
<script>
module.exports = {
  data: function() {
    return {
        title: 'seirmodel.vue',
    
        labels:[1,2,3,4,5,6],
        Susceptible:{
            title:'感受性保持者(Susceptible)',
            data: [0, 0, 0, 0, 0, 0]
        },
        Exposed:{
            title:'潜伏者(Exposed)',
            data: [0, 0, 0, 0, 0, 0]
        },
        Infected:{
            title:'発症者(Infected)',
            data: [0, 0, 0, 0, 0, 0]
        },
        Recovered:{
            title:'免疫保持者(Recovered)',
            data: [0, 0, 0, 0, 0, 0]
        },         
        firstInfected:1,
        contactPerDay:5,
        recoverdate:10,
        NN:10000,
        s:10000-1,
        e:1,
        i:0,
        r:0,
        incubationReriod:5,
        infection:0.1,
        gamma:0.07,
        epsilon:0.2,
        dt:1,   
        tmax:120, 
    }
  },
      watch: {
        MathObject: {
            handler:function (newValue,oldValue) {

                if(newValue[11] != oldValue[11] || 
                   newValue[10] != oldValue[10] || 
                   newValue[9] != oldValue[9] || 
                   newValue[8] != oldValue[8] || 
                   newValue[7] != oldValue[7] || 
                   newValue[6] != oldValue[6] || 
                   newValue[5] != oldValue[5] || 
                   newValue[4] != oldValue[4]){
                    this.Susceptible.data.splice(0)
                    this.Exposed.data.splice(0)
                    this.Infected.data.splice(0)
                    this.Recovered.data.splice(0)
                    this.SEIR()
                }
               this.canvas.data.datasets[0].data = this.Susceptible.data;
               this.canvas.data.datasets[1].data = this.Exposed.data;
               this.canvas.data.datasets[2].data = this.Infected.data;
               this.canvas.data.datasets[3].data = this.Recovered.data;
               this.canvas.data.labels = this.labels
               this.canvas.update();
            },
            deep: true,
        }
    },
    computed: {
        MathObject() {
        return [this.labels,
                this.Susceptible,
                this.Infected,
                this.Recovered,
                this.infection,
                this.gamma,
                this.firstInfected,
                this.contactPerDay,
                this.recoverdate,
                this.epsilon,
                this.Exposed,
                this.incubationReriod
                ];
        }
       },
    mounted() {
         MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
        this.SEIR();
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
                        label: vm.Exposed.title, 
                        fill: false,
                        borderColor: '#ffc107',
                        data: vm.Exposed.data 
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
        f1(t,s,e,i,r,beta,gamma,epsilon){
            return -1*beta*s*i ;
        },
        f2(t,s,e,i,r,beta,gamma,epsilon){
            return beta*s*i -  epsilon*e;
        },
        f3(t,s,e,i,r,beta,gamma,epsilon){
            return epsilon*e - gamma*i;
        },
        f4(t,s,e,i,r,beta,gamma,epsilon){
            return gamma*i ;
        },
        SEIR() {

            beta = this.infection*this.contactPerDay/this.NN

            gamma = Math.round( (1.0/this.recoverdate) * 1000000) / 1000000

            epsilon = Math.round(  (1.0/this.incubationReriod)  * 1000000) / 1000000   

            k1 = []
            k2 = []
            k3 = []
            k4 = []
            Tarray = []
            Sarray = []
            Earray = []
            Iarray = []
            Rarray = []

            this.s = this.NN-this.firstInfected
            this.e = this.firstInfected
            this.i = 0
            this.r = 0
            
            for(this.t=0;this.t<this.tmax;this.t+=this.dt) {
                 k1.push(this.dt*this.f1(this.t,this.s,this.e,this.i,this.r,beta,gamma,epsilon))
                 k1.push(this.dt*this.f2(this.t,this.s,this.e,this.i,this.r,beta,gamma,epsilon))
                 k1.push(this.dt*this.f3(this.t,this.s,this.e,this.i,this.r,beta,gamma,epsilon))
                 k1.push(this.dt*this.f4(this.t,this.s,this.e,this.i,this.r,beta,gamma,epsilon))
                 
                 k2.push(this.dt*this.f1(this.t+this.dt/2.0,this.s+k1[0]/2.0,this.e+k1[1]/2.0,this.i+k1[2]/2.0,this.r+k1[3]/2.0,beta,gamma,epsilon))
                 k2.push(this.dt*this.f2(this.t+this.dt/2.0,this.s+k1[0]/2.0,this.e+k1[1]/2.0,this.i+k1[2]/2.0,this.r+k1[3]/2.0,beta,gamma,epsilon))
                 k2.push(this.dt*this.f3(this.t+this.dt/2.0,this.s+k1[0]/2.0,this.e+k1[1]/2.0,this.i+k1[2]/2.0,this.r+k1[3]/2.0,beta,gamma,epsilon))
                 k2.push(this.dt*this.f4(this.t+this.dt/2.0,this.s+k1[0]/2.0,this.e+k1[1]/2.0,this.i+k1[2]/2.0,this.r+k1[3]/2.0,beta,gamma,epsilon))

                 k3.push(this.dt*this.f1(this.t+this.dt/2.0,this.s+k2[0]/2.0,this.e+k2[1]/2.0,this.i+k2[2]/2.0,this.r+k2[3]/2.0,beta,gamma,epsilon))
                 k3.push(this.dt*this.f2(this.t+this.dt/2.0,this.s+k2[0]/2.0,this.e+k2[1]/2.0,this.i+k2[2]/2.0,this.r+k2[3]/2.0,beta,gamma,epsilon))
                 k3.push(this.dt*this.f3(this.t+this.dt/2.0,this.s+k2[0]/2.0,this.e+k2[1]/2.0,this.i+k2[2]/2.0,this.r+k2[3]/2.0,beta,gamma,epsilon))
                 k3.push(this.dt*this.f4(this.t+this.dt/2.0,this.s+k2[0]/2.0,this.e+k2[1]/2.0,this.i+k2[2]/2.0,this.r+k2[3]/2.0,beta,gamma,epsilon))

                 k4.push(this.dt*this.f1(this.t+this.dt,this.s+k3[0],this.e+k3[1],this.i+k3[2],this.r+k3[3],beta,gamma,epsilon))
                 k4.push(this.dt*this.f2(this.t+this.dt,this.s+k3[0],this.e+k3[1],this.i+k3[2],this.r+k3[3],beta,gamma,epsilon))
                 k4.push(this.dt*this.f3(this.t+this.dt,this.s+k3[0],this.e+k3[1],this.i+k3[2],this.r+k3[3],beta,gamma,epsilon))
                 k4.push(this.dt*this.f4(this.t+this.dt,this.s+k3[0],this.e+k3[1],this.i+k3[2],this.r+k3[3],beta,gamma,epsilon))

                 this.s=this.s+(k1[0]+2.0*k2[0]+2.0*k3[0]+k4[0])/6.0
                 this.e=this.e+(k1[1]+2.0*k2[1]+2.0*k3[1]+k4[1])/6.0
                 this.i=this.i+(k1[2]+2.0*k2[2]+2.0*k3[2]+k4[2])/6.0
                 this.r=this.r+(k1[3]+2.0*k2[3]+2.0*k3[3]+k4[3])/6.0

                 k1.splice(0)
                 k2.splice(0)
                 k3.splice(0)
                 k4.splice(0)

                Tarray.push(this.t)
                Sarray.push(this.s)
                Earray.push(this.e)
                Iarray.push(this.i)
                Rarray.push(this.r)
            }

            this.Susceptible.data = Sarray;
            this.Exposed.data = Earray;
            this.Infected.data = Iarray;
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