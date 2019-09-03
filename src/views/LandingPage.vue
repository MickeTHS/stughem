<template>
  <main v-if="site">
    <Banner
        :site="site"
        :allowEdit="false"
      />

    <div v-bind:key="section.id" v-for="section in site.frontend_opts.theme.sections">
      <LeftImageText  
        v-if="section.type === 'image_left' && section.enabled" 
        :site="site" 
        :section="section" 
        :allowEdit="false"
        />

      <RightImageText 
        v-if="section.type === 'image_right' && section.enabled" 
        :site="site" 
        :section="section"
        :allowEdit="false" 
        />

      <ImageTextColumns 
        v-if="section.type === 'column_image_text' && section.enabled" 
        :site="site" 
        :section="section"
        :allowEdit="false"
         />
        
      <About
        v-if="section.type === 'about' && section.enabled" 
        :site="site"
        :section="section"
        :allowEdit="false"
      />
      
      <OpeningHours
        v-if="section.type === 'opening_hours' && section.enabled" 
        :allowEdit="false"
        :section="section"
        :site="site"
      />
      
      <Gallery
        v-if="section.type === 'site_gallery' && section.enabled" 
        :site="site"
        :section="section"
        :allowEdit="false"
      />

      <Staff
        v-if="section.type === 'staff_list' && section.enabled" 
        :site="site"
        :section="section"
        :allowEdit="false"
      />

      <Products
        v-if="section.type === 'pricing_list' && section.enabled" 
        :site="site"
        :section="section"
        :allowEdit="false"
      />

      <Contact v-if="section.type === 'contact_form' && section.enabled" :section="section" :site="site" />
      
    </div>
    
    <Footer :site="site" :allowEdit="false" />

  </main>
</template>

<script>
import { landingPage } from '@/utils/landingPage.js'
import LeftImageText from "@/components/landingpage/LeftImageText";
import RightImageText from "@/components/landingpage/RightImageText";
import ImageTextColumns from "@/components/landingpage/ImageTextColumns";

export default {
  mixins: [landingPage],
  components: {
    LeftImageText, RightImageText, ImageTextColumns
  },
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