<template>
  <v-dialog v-model="open">
    <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          KLICKA TYPEN DU VILL LÄGGA TILL
        </v-card-title>
        <div>
        <v-item-group>
    <v-container>
      <v-row>
        <v-col
          v-for="(section) in section_types"
          v-bind:key="section.id"
          cols="12"
          :md="getNumColumns()"
        >
          <v-item>
            <v-card
              :color="section.active ? 'primary' : ''"
              class="d-flex align-center"
              
              height="140"
              :img="section.img"
              @click="updateToggle(section.id)"
              
            >
            
              <v-scroll-y-transition>
                <div
                  v-if="section.active"
                  class="display-3 flex-grow-1 text-center"
                >
                  Vald
                </div>
              </v-scroll-y-transition>
            </v-card>
          </v-item>
        </v-col>
      </v-row>
    </v-container>
  </v-item-group>
        </div>
        <v-divider></v-divider>

        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn
            color="primary"
            text
            :disabled="!enabled_button"
            @click="confirmAddNewSection()"
          >
            Fortsätt
          </v-btn>
        </v-card-actions>
      </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: ['value', 'addSectionDialog'],
  data() {
    return {
      enabled_button: false,
      section_types: [
        { 
          id: 0,
          img: 'img/section_type_image_left.jpg',
          type: 'image_left',
          active: false,
        },
        { 
          id: 1,
          img: 'img/section_type_image_right.jpg',
          type: 'image_right',
          active: false,
        },
        { 
          id: 2,
          img: 'img/section_type_column_image_text.jpg',
          type: 'column_image_text',
          active: false,
        }
      ]
    }
  },
  methods: {
    getNumColumns() { return 12 / this.section_types.length; },
    confirmAddNewSection() {
      for (var i = 0; i < this.section_types.length; ++i) {
        if (this.section_types[i].active) {
          this.$emit('selected-type',  this.section_types[i].type);
          break;
        }
      }
    },
    updateToggle(id) {
      console.log(id);
      for (var n = 0; n < this.section_types.length; ++n) {
        this.section_types[n].active = false;
      }

      this.section_types[id].active = true;
      this.enabled_button = true;
    }
  },
  computed: {
      open: {
          get() {
              return this.addSectionDialog;
          },
          set(val) {
              this.$emit('cancelDialog', val)
          }
      },
    modal: {
      get(){
        return this.value
      },
      set(value){
        this.$emit('input', value)
      }
    }
  }
}
</script>