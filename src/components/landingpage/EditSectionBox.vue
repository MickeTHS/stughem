<template>
    <v-card
    class="mx-auto"
    min-width="800px"
    style="margin-bottom: 10px;"
    outlined
  >
    <v-list-item three-line>
      <v-list-item-content>
        <div class="overline mb-4">{{ section.type }}</div>
        <v-list-item-title class="headline mb-1">
          <v-text-field
                label="Section Name"
                :value="heading_text"
              ></v-text-field>
        </v-list-item-title>

        </v-list-item-content>
        <v-list-item-avatar
          tile
          size="80"
          color="grey"
        ></v-list-item-avatar>
      </v-list-item>
        <v-card-text>
          <v-container>
            <v-layout row wrap>
              <v-flex xs4>
                
                <p>Enabled:</p>
              </v-flex>
              <v-flex xs2>
                <div class="input-group">
                  <label class="switch">
                    <input type="checkbox" v-model="section.enabled"/>
                    <span class="slider"></span>
                  </label>
                </div>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs4>
                <p>Background Color:</p>
              </v-flex>
              <v-flex xs2>
                <input type="color" v-model="section.background" />
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs4>
                <p>Title Color:</p>
              </v-flex>
              <v-flex xs2>
                <input type="color" v-model="section.text.heading_color" />
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs4>
                <p>Text Color:</p>
              </v-flex>
              <v-flex xs2>
                <input type="color" v-model="section.text.body_color" />
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
      <v-card-actions>
        <v-btn text @click="moveSectionUp">MOVE UP</v-btn>
        <v-btn text @click="moveSectionDown">MOVE DOWN</v-btn>
        <v-btn text color="error">DELETE</v-btn>
      </v-card-actions>
    </v-card>
    <!-- end card -->
</template>

<script>
export default {
    props: ['site','section'],
    methods: {
        moveSectionUp() {
            console.log('move: ' + this.section.id);
            this.$emit('moveSectionUp', this.section.id);
        },
        moveSectionDown() {
            console.log('move: ' + this.section.id);
            this.$emit('moveSectionDown', this.section.id);
        },
    },
    data() {
        return { heading_text: '' }
    },
    created() {
        if (this.section.data === undefined) {
            console.log('undefined');
            console.log(this.section);
        }
        else {
            this.heading_text = this.section.data[0].heading_text;
        }
        
    }
    
}
</script>