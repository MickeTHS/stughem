<template>
  <section class="about" id="about" :style="{background: section.background}">
    <v-container>
        <v-layout row wrap>
            <v-flex 
                v-bind:key="image_url" v-for="image_url in section.image_urls"
                v-bind="{[`xs${section.image_urls.length / 12}`]: true}"
                
                >
                <v-card
                    class="mx-auto"
                >
                    <v-img
                    :src="image_url"
                    height="200px"
                    ></v-img>

                    <v-card-title>
                    <div>Top western road trips</div>
                    <span class="grey--text subtitle-1">1,000 miles of wonder</span>
                    </v-card-title>

                    <v-card-actions>
                    <v-btn text>Share</v-btn>

                    <v-btn
                        text
                        color="purple"
                    >
                        Explore
                    </v-btn>

                    <div class="flex-grow-1"></div>

                    <v-btn
                        icon
                        @click="show = !show"
                    >
                        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                    </v-btn>
                    </v-card-actions>

                    <v-expand-transition>
                    <div v-show="show">
                        <v-card-text>
                        I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
                        </v-card-text>
                    </div>
                    </v-expand-transition>
                </v-card>

                
                <v-img
                    src="http://wowslider.com/sliders/demo-93/data1/images/sunset.jpg"
                    lazy-src="https://picsum.photos/id/11/10/6"
                    class="grey lighten-2"
                    aspect-ratio="2"
                ></v-img>
                <i class="material-icons add" v-if="allowEdit" :section="section" @click="addImageToSection" :style="{background: site.frontend_opts.theme.primary}">add</i>
            </v-flex>
            <v-flex xs6>
                <v-card height="100%">
                    <v-card-title :style="{color: section.text.heading_color}">{{ section.text.heading_text }}</v-card-title>
                    <v-card-text :style="{color: section.text.body_color}">{{ section.text.body_text }} {{ section.text.body_color }}</v-card-text>
                    
                </v-card>
                
            </v-flex>
        </v-layout>
    </v-container>
  </section>
</template>

<script>
export default {
  props: ['allowEdit', 'site', 'section'],
  methods: {
      addImageToSection() {
          this.$emit('addImageToSection', this.section);
      }
  }
}
</script>

<style lang="scss">
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

