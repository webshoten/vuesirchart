<template>
  <div class="container">
    <div class="row">
        <div class="col-sm-12">
          <h2>置き場</h2>
        </div>
        <div class="col-sm-6">

          <v-card
            class="mx-auto"
            max-width="344"
          >
            <v-img
              src="../img/sirmodel.png"
              height="200px"
            ></v-img>

            <v-card-title>
              SIRモデルのシミュレーション
            </v-card-title>

            <v-card-subtitle>
              4次のルンゲクッタ法を用いたSIRモデルのシミュレーション
            </v-card-subtitle>

            <v-card-actions>
              <v-btn
                color="orange lighten-2"
                text
                to="/sirmodel"
              >
                サイト内リンク
              </v-btn>

              <v-spacer></v-spacer>

              <v-btn
                icon
                @click="show = !show"
              >
                <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
              </v-btn>
            </v-card-actions>

            <v-expand-transition>
              <div v-show="show">
                <v-divider></v-divider>

                <v-card-text>
                  感染症数理モデルであるSIRモデルを用いたCOVID-19感染拡大予測は、国内外で盛んに行われている。
                  SIRモデルだけでは正確に実態を追うことができないとし、SEIRモデルや、機械学習と組み合わせた予測などいくつも研究論文存在するが、
                  今回は、あくまで視覚的に直感的に、感染症拡大に影響を与える原因を定性的に理解する事ができればいいな
                  と思い、作成するに至った。
                </v-card-text>
              </div>
            </v-expand-transition>
          </v-card>




        </div>
        <div class="col-sm-6"></div>
    </div>
</div>
</template>

<script>
module.exports = {
  data: function() {
    return {
      title: 'about.vue',
      show: false,
    }
  }
}
</script>

<style scoped>
h1 {
    color: red;
}
</style>