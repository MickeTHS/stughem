<template>
  <main v-if="site">

    <ColorBox :site="site"/>
  </main>
</template>

<script>
import ColorBox from "@/components/landingpage/ColorBox"

export default {
  data() {
    return {
      showAddComponent: true      
    }
  },
  components: {
    ColorBox
  },
  methods: {
    async saveFrontendOpts() {
      const site = {
        frontend_opts: {
          heading: this.heading
            ? this.heading
            : this.site.frontend_opts.heading,
          sub_heading: this.sub_heading
            ? this.sub_heading
            : this.site.frontend_opts.sub_heading,
          about: this.about ? this.about : this.site.frontend_opts.about,
          gallery_description: this.gallery_description
            ? this.gallery_description
            : this.site.frontend_opts.gallery_description,
          theme: this.site.frontend_opts.theme,
          logo: this.site.frontend_opts.logo,
          hasDomain: this.site.frontend_opts.hasDomain,
          createDomain: this.site.frontend_opts.createDomain,
          existingDomain: this.site.frontend_opts.existingDomain,
          desiredDomain: this.site.frontend_opts.desiredDomain
        }
      }
      try {
        const res = await this.$store.dispatch("updateSite", site)
        const snackbar = {
          open: true,
          message: 'Informations Updated Successfully!',
          success: true
        }
        this.$store.dispatch('showSnackbar', snackbar)
        await this.$store.dispatch("getSite")
        this.dialog.open = false
      } catch (e) {
        console.log(e)
      }
    },
  },
  computed: {
    site() {
      return this.$store.getters.site  
    },
    gallery(){
      return this.$store.getters.gallery
    }
  },
  watch: {
    site() {
      this.heading = this.site.frontend_opts.heading 
      this.sub_heading = this.site.frontend_opts.sub_heading 
      this.about = this.site.frontend_opts.about 
      this.gallery_description = this.site.frontend_opts.gallery_description 
      this.opening_hours = this.site.opening_hours 
      this.social = this.site.social
    }
  },
  mounted() {
    this.$store.dispatch("getUser") 
    this.$store.dispatch("getSite") 
  }
};
</script>

<style lang="scss">
.dialog {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100vw;
  background: rgba(0, 0, 0, 0.7);
  display: none;
  justify-content: center;
  align-items: center;
  z-index: 100;
  &.open {
    display: flex;
  }
  .card {
    background-color: #fff;
    width: 570px;
    max-width: 100%;
    min-height: 220px;
    margin: 20px;
    header {
      padding: 16px 32px;
      border-bottom: 1px solid #f1f2f3;
      h2 {
        color: #8bc34a;
        font-size: 15px;
        text-transform: uppercase;
        letter-spacing: 0.25px;
      }
    }
    .content {
      padding: 24px 32px 10px 32px;
      h3 {
        color: #777;
        text-transform: uppercase;
        font-size: 14px;
        letter-spacing: .5px;
        margin-bottom: 16px;
      }
      textarea {
        border: 1px solid #eee;
        border-radius: 4px;
        padding: 14px 20px;
        width: 100%;
        height: 150px;
        resize: none;
        outline: none;
      }
      input[type="text"],
      input[type="number"] {
        border: 1px solid #e6e6e6;
        background-color: #fff;
        color: #666;
        padding: 10px 20px;
        margin-right: 10px;
        margin-bottom: 10px;
        border-radius: 25px;
        width: calc(100% - 12px);
        &::placeholder {
          color: #aaa;
          font-weight: 300;
        }
      }
      ul {
        li {
          display: flex;
          margin: 8px 0;
          position: relative;
          cursor: pointer;
          border-bottom: 1px solid #f5f5f5;
          cursor: pointer;
          &:hover {
            .material-icons.edit {
              opacity: 1;
            }
          }
          div {
            background-color: #fafafa;
            padding: 10px;
            &:first-child {
              flex-basis: 20%;
            }
            &:not(:first-child) {
              display: flex;
              justify-content: center;
              flex-basis: 40%;
            }
          }
          input[type="time"] {
            width: 92px;
            font-size: 14px;
          }
        }
      }
    }
    footer {
      padding: 0 32px 24px 32px;
      background-color: #fff;
    }
    button {
      padding: 10px 20px;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 1px;
      background-color: #8bc34a;
      border-radius: 25px;
      margin-right: 10px;
      &.btn-error {
        background-color: #f44336;
      }
    }
  }
  .form-control {
    display: inline-block;
    min-width: 250px;
    max-width: 100%;
    &.products-form-control {
      input {
        width: calc(50% - 10px) !important;
        margin-right: 10px !important;
      }
    }
    &:not(:last-child) {
      margin-bottom: 10px;
    }
    label {
      display: block;
      text-transform: uppercase;
      font-size: 12px;
      font-weight: 500;
      letter-spacing: 0.25px;
      margin-bottom: 6px;
      color: #bbb;
    }
  }
}
</style>


