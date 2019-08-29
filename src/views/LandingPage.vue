<template>
  <main v-if="site">
    <Banner :site="site" :allowEdit="false"/>
    <About :site="site" :allowEdit="false" />
    <OpeningHours :site="site" :allowEdit="false" />
    <Gallery :site="site" :allowEdit="false" />
    <Staff :site="site" />
    <Products :site="site" :allowEdit="false"/>
    <Contact :site="site"/>
    <Footer :site="site" :allowEdit="false"/>
  </main>
</template>

<script>
import { landingPage } from '@/utils/landingPage.js'
export default {
  mixins: [landingPage],
  computed: {
    site(){
      return this.$store.getters.publicSite
    }
  },
  created(){
    const siteId = this.$route.params.siteId
    this.$store.dispatch('getSitePublic', siteId)
  },
}
</script>