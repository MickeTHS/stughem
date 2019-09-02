<template>
  <div class="colorbox">
    <AddSectionModal :addSectionDialog="addSectionDialog" @cancelDialog="closeAddSectionDialog" @selected-type="selectedType" />
    
      <header :style="{background: site.frontend_opts.theme.primary}">
        <div class="container">
          <h2>Update Theme And Sections Layout</h2>
          <div class="controls">
            <button class="btn" @click="updateTheme">Save</button>
          </div>
        </div>
      </header>
      <div class="content">
  <v-container>
    <v-layout row wrap>
      <div class="theme-preview">
          
          <h3>Add new section</h3>
          <button class="btn" @click="addSectionDialog = true">Add</button>
          
          <h3>Select button and icon color:</h3>
          <ul class="themes">
            <li
              v-for="(theme, index) in themes"
              :key="index"
              :style="{background: theme.color}"
              @click="currentTheme = index + 1"
            ></li>
          </ul>
          
        </div>
    </v-layout>
    <v-layout row wrap v-bind:key="section.id" v-for="section in sections">

      <EditSectionBox @moveSectionUp="moveSectionUp" @moveSectionDown="moveSectionDown" :section="section" :site="site" />

    </v-layout>
 
  </v-container>
        
      </div>
    </div>
  
</template>

<script>
import AddSectionModal from './AddSectionModal';
import EditSectionBox from './EditSectionBox';

export default {
  props: ['site', 'theme'],
  components: { AddSectionModal, EditSectionBox },
  data() {
    return {
      themes: [
        { id: 1, color: "#8bc34a" },
        { id: 2, color: "#4caf50" },
        { id: 3, color: "#2196f3" },
        { id: 4, color: "#673ab7" },
        { id: 5, color: "#9c27b0" },
        { id: 6, color: "#f44336" }
      ],
      currentTheme: 1,
      sections: [
        {
          id: 'aaa',
          name: 'About Section',
          type: 'heading_text',
          background: '#ffffff', 
          data: [ { image_url: null, heading_text: '', body_text: ''} ],
          text: {
            heading: '#777777',
            body: '#777777'
          },
          enabled: false
        },
        {
          id: 'aab',
          name: 'Opening Hours Section',
          type: 'opening_hours',
          background: '#ffffff', 
          data: [ { image_url: null, heading_text: '', body_text: ''} ],
          text: {
            heading: '#777777',
            body: '#777777'
          },
          enabled: true
        },
        {
          id: 'aac',
          name: 'Our Gallery Section',
          type: 'gallery',
          background: '#ffffff', 
          data: [ { image_url: null, heading_text: '', body_text: ''} ],
          text: {
            heading: '#777777',
            body: '#777777'
          },
          enabled: true
        },
        {
          id: 'aad',
          name: 'Staff Section',
          type: 'staff_list',
          background: '#ffffff', 
          data: [ { image_url: null, heading_text: '', body_text: ''} ],
          text: {
            heading: '#777777',
            body: '#777777'
          },
          enabled: true
        },
        {
          id: 'aae',
          name: 'Pricing Section',
          type: 'pricing_list',
          background: '#ffffff', 
          data: [ { image_url: null, heading_text: '', body_text: ''} ],
          text: {
            heading: '#777777',
            body: '#777777'
          },
          enabled: true
        },
        {
          id: 'aaf',
          name: 'Contact Section',
          type: 'contact_form',
          background: '#ffffff', 
          data: [ { image_url: null, heading_text: '', body_text: ''} ],
          text: {
            heading: '#777777',
            body: '#777777'
          },
          enabled: true
        },
      ],
      dialog: {
        open: false
      },
      addSectionDialog: false,
      notifications: false,
      sound: true,
      widgets: false
    };
  },
  methods: {
    async moveSectionUp(section_id) {
      await this.$store.dispatch('moveSectionUp', section_id);
      await this.$store.dispatch("getSite");
    },
    async moveSectionDown(section_id) {
      await this.$store.dispatch('moveSectionDown', section_id);
      await this.$store.dispatch("getSite");
    },
    closeAddSectionDialog() {
      this.addSectionDialog = false;
    },
    addNewSectionModal() {
      this.addSectionDialog = true;
    },
    async updateTheme() {
      const theme = this.themes[this.currentTheme - 1].color
      const site = {
        frontend_opts: {
          theme: {
            primary: theme,
            sections: this.sections
          },
          heading: this.site.frontend_opts.heading,
          sub_heading: this.site.frontend_opts.sub_heading,
          about: this.site.frontend_opts.about,
          gallery_description: this.site.frontend_opts.gallery_description,
          logo: this.site.frontend_opts.logo,
          hasDomain: this.site.frontend_opts.hasDomain,
          createDomain: this.site.frontend_opts.createDomain,
          existingDomain: this.site.frontend_opts.existingDomain,
          desiredDomain: this.site.frontend_opts.desiredDomain,
          backgroundImageURL: this.site.frontend_opts.backgroundImageURL
        }
      };
      await this.$store.dispatch("updateSite", site);
      await this.$store.dispatch("getSite");
      this.dialog.open = false
    },
    async selectedType(type) {
      console.log('we got ' + type);
      
      await this.$store.dispatch("addSection", type);
      await this.$store.dispatch("getSite");
      this.addSectionDialog = false;
    }
  },
  mounted() {
    this.sections = this.site.frontend_opts.theme.sections;
    console.log(this.sections);
  }
};
</script>

<style lang="scss">
@import "@/assets/scss/_variables.scss";
.colorbox {
  input[type="color"]{
      margin-right: 24px;
      border: 1px solid black;
    }

    header {
      padding: 10px 0;
      background-color: #8bc34a;
      margin-top: 60px;
      .container {
        padding: 16px 32px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      h2 {
        color: #fff;
        text-transform: uppercase;
        font-size: 15px;
        letter-spacing: 1px;
      }
      .btn {
        background-color: rgba(255, 255, 255, 0.2);
        padding: 10px 20px;
        text-transform: uppercase;
        font-size: 12px;
        font-weight: bold;
        letter-spacing: 1px;
        margin-left: 10px;
      }
    }
  
  .themes {
    margin-bottom: 20px;
    li {
      width: 20px;
      height: 20px;
      display: inline-block;
      cursor: pointer;
      &:not(:last-child) {
        margin-right: 5px;
      }
    }
  }
  .theme-preview {
    padding: 20px 60px;
    .custom {
      li {
        display: inline-block;
        width: 40%;
        margin-right: 20px;
        padding-bottom: 20px;
        border-bottom: 2px solid gray;
      }
    }
    input[type="color"]{
      margin-right: 24px;
      border: 1px solid black;
    }
    h3 {
      text-transform: uppercase;
      font-size: 14px;
      margin-bottom: 8px;
      margin-top: 20px;
      color: #777;
    }
    p {
      font-weight: 400;
      color: #607d8b;
      margin: 20px 0;
    }
    img {
      width: 420px;
      max-width: 100%;
    }
    li {
      line-height: 1.8;
      
    }
  }
}
</style>

