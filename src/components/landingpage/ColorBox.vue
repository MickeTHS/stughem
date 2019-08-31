<template>
  <div class="colorbox">
    <div class="colorbox-toggle" @click="dialog.open = true" :style="{background: site.frontend_opts.theme.primary}">
      <i class="material-icons settings">settings</i>
    </div>
    <div class="dialog" :class="dialog.open ? 'open': ''">
      <header :style="{background: site.frontend_opts.theme.primary}">
        <div class="container">
          <h2>Update Theme</h2>
          <div class="controls">
            <button class="btn" @click="updateTheme">Save</button>
            <button class="btn" @click="dialog.open = false">Close</button>
          </div>
        </div>
      </header>
      <div class="content">
        <div class="theme-preview">
          <ul class="custom">
            <li v-bind:key="section.id" v-for="section in sections">
            <h3>{{section.text.heading_text}}</h3>
              <div class="input-group">
              <label class="switch">
                <input type="checkbox" />
                <span class="slider"></span>
              </label>
              </div>
              Background:
              <input type="color" v-model="section.background" />
              Heading:
              <input type="color" v-model="section.text.heading" />
              Body:
              <input type="color" v-model="section.text.body" />
            </li>
          </ul>
          <h3>Add new section</h3>
          <ul>
            <li><img src="/img/section_type_image_left.jpg"></li>
            <li><img src="/img/section_type_image_right.jpg"></li>
            <li><img src="/img/section_type_column_image_text.jpg"></li>
          </ul>
          <h3>Themes:</h3>
          <ul class="themes">
            <li
              v-for="(theme, index) in themes"
              :key="index"
              :style="{background: theme.color}"
              @click="currentTheme = index + 1"
            ></li>
          </ul>
          <img :src="'/img/theme' + currentTheme +'.jpg'" alt />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['site', 'theme'],
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
          text: {
            heading: '#777777',
            body: '#777777'
          },
          enabled: true
        },
        {
          id: 'aab',
          name: 'Opening Hours Section',
          type: 'opening_hours',
          background: '#ffffff', 
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
      notifications: false,
      sound: true,
      widgets: false
    };
  },
  methods: {
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
  .colorbox-toggle {
    position: fixed;
    top: calc(50% - 44px);
    left: 0;
    background-color: #8bc34a;
    height: 32px;
    width: 32px;
    z-index: 3;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    cursor: pointer;
    .settings {
      font-size: 16px;
    }
  }
  .dialog {
    background-color: #fff;
    display: none;
    &.open {
      display: block;
    }
    header {
      padding: 10px 0;
      background-color: #8bc34a;
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
        width: 50%;
      }
    }
    input[type="color"]{
      margin-right: 24px;
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

