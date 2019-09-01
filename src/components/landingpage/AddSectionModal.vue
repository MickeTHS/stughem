<template>
  <v-dialog v-model="open" width="500">
    <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          Privacy Policy
        </v-card-title>
        <div>
        <v-item-group>
    <v-container>
      <v-row>
        <v-col
          v-for="n in 3"
          :key="n"
          cols="12"
          md="4"
        >
          <v-item v-slot:default="{ active, toggle }">
            <v-card
              :color="active ? 'primary' : ''"
              class="d-flex align-center"
              dark
              height="200"
              @click="toggle"
            >
              <v-scroll-y-transition>
                <div
                  v-if="active"
                  class="display-3 flex-grow-1 text-center"
                >
                  Active
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
            @click="open = false"
          >
            I accept
          </v-btn>
        </v-card-actions>
      </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: ['value', 'addSectionDialog'],
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