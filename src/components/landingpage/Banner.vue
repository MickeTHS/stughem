<template>
  <div class="hero landingpage-hero" id="home">
    <v-parallax :src="site.frontend_opts.backgroundImageURL" height="800">
      <v-row
      align="center"
      justify="center"
    >
    <div class="container">
      <div class="box">
        <h1>
          <i class="material-icons edit" v-if="allowEdit" @click="$emit('updateHeading')" :style="{background: site.frontend_opts.theme.primary}">edit</i>
          {{ site.frontend_opts.heading }}
        </h1>
        <p>
          <i class="material-icons edit" v-if="allowEdit" @click="$emit('updateSubHeading')" :style="{background: site.frontend_opts.theme.primary}">edit</i>
          {{ site.frontend_opts.sub_heading }}
        </p>
        <router-link to="/book" tag="a" class="btn" :style="{background: site.frontend_opts.theme.primary}">Boka nu</router-link>
        <p>
          <button class="btn-edit" v-if="allowEdit" @click="$emit('addToBackgroundImage')">Ändra bakgrundsbild</button>
        </p>
      </div>
    </div>
      </v-row>
    </v-parallax>
    
  </div>
</template>

<script>
export default {
  props: ['site', 'allowEdit', 'theme'],
};
</script>

<style lang="scss">
@import "@/assets/scss/_variables.scss";
.hero {
  &.landingpage-hero {
    background: transparent;
    width: 100%;
  }
  .container {
    height: 100vh;
    max-height: 800px;
    display: flex;
    align-content: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    padding-top: 54px;
    position: relative;
    z-index: 1;
    .box {
      background-color: rgba(0, 0, 0, 0.5);
      padding: 60px 40px;
      max-width: 720px;
      margin: 0 auto;

      h1 {
        color: #fff;
        font-size: 50px;
        position: relative;
      }

      p {
        color: #fff;
        line-height: 1.8;
        margin-top: 16px;
        position: relative;
      }

      .btn {
        font-size: 14px;
        font-weight: 700;
        display: block;
        width: 140px;
        margin: 20px auto 0;
        background-color: $theme1;
      }

      .btn-edit {
        font-size: 14px;
        font-weight: 700;
        display: block;
        width: 300px;
        margin: 20px auto 0;
        background-color: gray;
      }
    }
  }

}
@media (max-width: 576px) {
  .hero {
    .container {
      padding: 0 !important;
      .box {
        padding: 20px;
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        h1 {
          font-size: 40px;
        }
      }
    }
  }
}
</style>

