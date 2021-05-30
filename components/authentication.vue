<template>


                    <div class="container-fluid">

                    <div class="jumbotron p-2">
                        <h1>MSALを利用した認証</h1>
                            <h3>AzureのMSAL認証のテスト</h3>

                    </div>


                        <div class="row">
            
                            <div class="col-12 col-md-12">
                                <div class="col-12">
                                    <div class="row">
                                        <div class="col">
                                            <h2>test</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
            
                        </div>
            
                        <v-footer padless>
                           <v-col
                            cols="12"
                            >
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
        title: 'authentication.vue',
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