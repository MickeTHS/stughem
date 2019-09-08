<template>
  <section class="about" id="about" :style="{background: section.background}">
    <v-container>
        <v-layout v-if="allowEdit" row wrap style="margin-bottom: 10px;">
          <v-btn color="primary" @click="addColumn">Lägg till ny kolumn</v-btn>
          <v-btn color="primary" @click="updateColumnSection">Spara ändringar</v-btn>
        </v-layout>
        <v-layout row wrap>
            <v-flex 
                v-bind:key="index" v-for="(data, index) in section.data"
                v-bind="{[`xs${12 / section.data.length}`]: true}"
                >
                <v-card style="margin-right: 10px;">
                    <v-btn v-if="allowEdit" color="primary" @click="currentColumnImageEdit = index">Ladda upp bild</v-btn>
                    <v-img
                    :src="data.image_url == null ? process.env.VUE_APP_CONTENT_URL + '/data/sunset.jpg' : data.image_url"
                    height="200px"
                    ></v-img>

                    <v-card-title>
                    <div v-if="allowEdit"><input :style="{color: section.text.heading_color}" class="edit-heading" type="text" v-model="data.heading_text" /></div>
                    <div v-if="!allowEdit" :style="{color: section.text.heading_color}">{{ data.heading_text }}</div>
                    </v-card-title>

                    <v-card-actions>

                    <div class="flex-grow-1"></div>
                    </v-card-actions>

                    <v-expand-transition>
                      <v-card-text>
                    <span class="grey--text subtitle-1">
                      <textarea v-if="allowEdit" :style="{color: section.text.body_color}" v-model="data.body_text"></textarea>
                      <p :style="{color: section.text.body_color}" v-if="!allowEdit">{{ data.body_text }}</p>
                    </span>
                    </v-card-text>
                    </v-expand-transition>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
  </section>
</template>

<script>
export default {
  props: ['allowEdit', 'site', 'section'],
  data() {
    return {
      currentColumnImageEdit: -1
    }
  },
  watch: {
    currentColumnImageEdit: function (newcolumn, oldcolumn) {
      this.$emit('addSectionColumnImage', this.section, newcolumn);
    }
  },
  methods: {
      addColumn() {
        this.section.data.push({ image_src: null, heading_text: 'Ny rubrik', body_text: 'Fyll i beskrivning här' });
        var payload = {
          site_id: this.site.site_id,
          section_id: this.section.id,
          data: this.section.data
        }

        this.$emit('updateSectionData', payload);
      },
      updateColumnSection() {
        var payload = {
          site_id: this.site.site_id,
          section_id: this.section.id,
          data: this.section.data
        }

        this.$emit('updateSectionData', payload);
      }
  }
}
</script>

<style scoped>

.edit-heading {
  border: 1px solid #dedede;;
  padding: 8px;
  font-size: 18px;
  font-weight: bold;
  border-radius: 0px;
}

textarea {
  width: 95%;
  border: 1px solid #dedede;
  padding: 8px;
}

</style>

