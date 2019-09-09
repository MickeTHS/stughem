<template>
  <section class="about" id="about" :style="{background: section.background}">
    <v-container>
        <v-layout row wrap>
            <v-flex xs6>
                <v-img
                    :src="section.data[0].image_url == null ? static_urls.local + '/img/sunset.jpg' : section.data[0].image_url"
                    lazy-src="https://picsum.photos/id/11/10/6"
                    class="grey lighten-2"
                    aspect-ratio="2"
                ></v-img>
                <i class="material-icons add add-photo" v-if="allowEdit" :section="section" @click="addImageToSection" :style="{background: site.frontend_opts.theme.primary}">add</i>
            </v-flex>
            <v-flex xs6>
                <v-card height="100%">
                    <v-card-title class="section-header" :style="{color: section.text.heading_color}">{{ section.data[0].heading_text }}<i v-if="allowEdit" class="material-icons edit add-header" :section="section" @click="editSectionHeader" :style="{background: site.frontend_opts.theme.primary}">edit</i></v-card-title>
                    <v-card-text class="section-body" :style="{color: section.text.body_color}"><pre>{{ section.data[0].body_text }}<i v-if="allowEdit" class="material-icons edit add-text" :section="section" @click="editSectionBody" :style="{background: site.frontend_opts.theme.primary}">edit</i></pre></v-card-text>
                </v-card>
                
            </v-flex>
        </v-layout>
    </v-container>
  </section>
</template>

<script>
export default {
  props: ['allowEdit', 'site', 'section'],
  computed: {
    static_urls() {
      return this.$store.state.static_urls;
    }
  },
  methods: {
      addImageToSection() {
          this.$emit('addImageToSection', this.section);
      },
      editSectionHeader() {
          this.$emit('editSectionHeader', this.section);
      },
      editSectionBody() {
          this.$emit('editSectionBody', this.section);
      }
  }
}
</script>

<style lang="scss">
.add-photo {
    position: absolute;
    left: 10px;
    top: 10px;
}

.about {
  overflow: hidden;
  .grid {
    display: flex;
    justify-content: flex-end;
    position: relative;
    max-width: 1000px;
    margin: 0 auto;
    .col {
      &:first-child {
        position: absolute;
        left: 0;
        top: -3%;
        height: 106%;
        width: 60%;
        background-size: cover !important;
      }
      &:last-child {
        float: right;
        z-index: 2;
        position: relative;
        background: rgba(249, 249, 249, 0.95);
        box-shadow: 0 0 10px rgba(66, 66, 66, 0.1);
        padding: 40px;
        width: 60%;
        flex-grow: 0;
        p {
          line-height: 1.8;
          width: 100%;
          &:last-child {
            margin-bottom: 0;
          }
        }
      }
    }
  }
}
@media (max-width: 900px) {
  .about {
    .grid {
      .col {
        &:last-child {
          width: 80%;
        }
      }
    }
  }
}
@media (max-width: 600px) {
  .about {
    .grid {
      .col {
        &:first-child {
          display: none;
        }
        &:last-child {
          width: 100%;
          box-shadow: none;
        }
      }
    }
  }
}
@media (max-width: 400px) {
  .about {
    .grid {
      .col {
        &:last-child {
          padding: 0;
          background-color: #fff;
          text-align: justify;
        }
      }
    }
  }
}
</style>

