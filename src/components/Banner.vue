
<template>
  <div>
    <FrontpageGallery />
    <div class="hero">
      <div class="container">
        <div class="box">
          <h1>Behöver du en hemsida åt din stuga?</h1>
          <h2>På StugHem kan du skapa en enkel och snygg sida på bara några minuter</h2>
          <h2>Du får även tillgång till bokningsfunktioner, editeringsverktyg, utskick och mycket mer</h2>
          <router-link to="/signup" tag="a" class="btn">Skapa sida</router-link>
          <h2>Är du nyfiken på hur en sida ser ut?</h2>
          <a class="btn" href="http://semesteridre.se" target="_blank">
            Se Exempel
          </a>
          
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import FrontpageGallery from './FrontpageGallery';

export default {
  components: { FrontpageGallery }
  
}
</script>
<style lang="scss" scoped>
.hero {
  background-size: cover;

  .container {
    
    position: absolute;
    top: 100px;
    align-content: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    padding-top: 54px !important;
    

    .box {
      background-color: rgba(0, 0, 0, 0.7);
      padding: 60px 40px;
      max-width: 720px;
      margin: 0 auto;

      h1 {
        font-size: 32px;
      }

      h2 {
        color: white;
        font-size: 20px;
        margin-top: 20px;
      }

      .btn {
        font-size: 14px;
        font-weight: 700;
        display: inline-block;
        min-width: 140px;
        margin: 20px auto 0;
        background-color: #bfd354;
        white-space: nowrap;
      }
    }
  }

  h1 {
    color: #fff;
    font-size: 50px;
  }
}
@media (max-width: 576px) {
  .hero {
    .container {
      padding: 0;
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

