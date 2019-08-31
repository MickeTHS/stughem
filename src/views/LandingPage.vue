<template>
  <main v-if="site">
    <Banner :site="site" :allowEdit="false"/>

    <div v-bind:key="section.id" v-for="section in site.frontend_opts.theme.sections">

      <div v-if="section.type === 'heading_text'">
        <About :site="site" :allowEdit="false" />
      </div>
      <div v-else-if="section.type === 'opening_hours'">
        <OpeningHours :site="site" :allowEdit="false" />
      </div>
      <div v-else-if="section.type === 'gallery'">
        <Gallery :site="site" :allowEdit="false" />
      </div>
      <div v-else-if="section.type === 'staff_list'">
        <Staff :site="site" />
      </div>
      <div v-else-if="section.type === 'pricing_list'">
        <Products :site="site" :allowEdit="false"/>
      </div>
      <div v-else-if="section.type === 'contact_form'">
        <Contact :site="site"/>
      </div>
    </div>
    
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