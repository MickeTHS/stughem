<template>
  <main class="wizard">
    <div class="container">
      <div class="box">
        <h1>Steg {{ currentStep }}/{{ totalSteps }}</h1>
        <form action>
          <div class="step" v-if="currentStep === 1">
            <label for>Ange ett namn på din stuga</label>
            <div class="input-group">
              <input type="text" v-model="site.name" placeholder="Exempel: Norrskenet, Nilssons Stuga" />
              <button class="btn btn-circle" @click.prevent="nextStep">
                <i class="material-icons arrow">arrow_forward</i>
              </button>
            </div>
            
          </div>
          <div class="step" v-if="currentStep === 2">
            <label for>Vad är ditt personnummer?</label>
            <div class="input-group">
              <input type="text" v-model="site.org_number" placeholder="Ditt personnr" />
              <button class="btn btn-circle" @click.prevent="nextStep">
                <i class="material-icons arrow">arrow_forward</i>
              </button>
            </div>
          </div>
          <div class="step" v-if="currentStep === 3">
            <label>Vart ligger stugan?</label>
            <div class="grid">
              <div class="col">
                <input
                  type="text"
                  v-model="site.street"
                  placeholder="Gatuadress"
                  autocomplete="nope"
                />
              </div>
              <div class="col">
                <input
                  type="text"
                  v-model="site.street_no"
                  placeholder="Nummer"
                  autocomplete="nope"
                />
              </div>
              <div class="col">
                <input
                  type="text"
                  v-model="site.postal_code"
                  placeholder="Postkod"
                  autocomplete="nope"
                />
              </div>
              <div class="col">
                <input
                  type="text"
                  v-model="site.postal_address"
                  placeholder="Postort"
                  autocomplete="nope"
                />
              </div>
              <div class="col">
                <input type="text" v-model="site.city" placeholder="Stad" autocomplete="nope" />
              </div>
            </div>
            <button class="btn" @click.prevent="nextStep">
              Nästa
              <i class="material-icons arrow">arrow_forward</i>
            </button>
          </div>
          <div class="step" v-if="currentStep === 4">
            <label for>E-post synlig för dina gäster</label>
            <input
              type="email"
              v-model="site.emails"
              placeholder="T.ex kontakt@mindoman.se"
              autocomplete="nope"
            />
            <label for>Telefon synlig för dina gäster</label>
            <input
              type="tel"
              v-model="site.phone_numbers"
              placeholder="T.ex +4673 000 00 00"
              autocomplete="nope"
            />
            <button class="btn" @click.prevent="nextStep">
              Nästa
              <i class="material-icons arrow">arrow_forward</i>
            </button>
          </div>
          <div class="step" v-if="currentStep === 5">
            <label for>Välj funktioner</label>
            <div class="input-group">
              <label class="switch">
                <input type="checkbox" v-model="site.features.online_booking" />
                <span class="slider"></span>
              </label>
              <p>Gäster kan boka via hemsidan</p>
            </div>
            <div class="input-group">
              <label class="switch">
                <input type="checkbox" v-model="site.features.sms_alert" />
                <span class="slider"></span>
              </label>
              <p>Gör SMS informationutskick till gäster</p>
            </div>
            <div class="input-group">
              <label class="switch">
                <input type="checkbox" v-model="site.features.customer_reviews" />
                <span class="slider"></span>
              </label>
              <p>Gästrecensioner</p>
            </div>
            <button class="btn" @click.prevent="nextStep">
              Nästa
              <i class="material-icons arrow">arrow_forward</i>
            </button>
          </div>
          <div class="step" v-if="currentStep === 6">
            <label for="theme">Färgtema:</label>
            <div class="theme" id="theme">
              <label
                class="theme-item"
                :class="site.frontend_opts.theme === index + 1 ? 'active': ''"
                v-for="(theme, index) in 6"
                :key="index"
              >
                <input
                  type="radio"
                  name="theme"
                  :value="index + 1"
                  v-model="site.frontend_opts.theme.primary"
                />
              </label>
            </div>
            <label for="logo">Logotyp:</label>
            <input type="file" ref="logo" name="logo" placeholder="Logo" @change="handleLogoFile"/>
            <!-- 
              this need to be adjusted
              to work with formData
            -->
            <button class="btn" @click.prevent="nextStep">
              Fortsätt
              <i class="material-icons arrow">arrow_forward</i>
            </button>
          </div>
          <div class="step" v-if="currentStep === 7">
            <div class="input-group">
              <label class="switch">
                <input type="checkbox" v-model="site.frontend_opts.hasDomain" />
                <span class="slider"></span>
              </label>
              <p>Har din stuga en domän idag?</p>
            </div>
            <div class="input-group" v-if="!site.frontend_opts.hasDomain">
              <label class="switch">
                <input type="checkbox" v-model="site.frontend_opts.createDomain" />
                <span class="slider"></span>
              </label>
              <p>Vill du skapa en domän?</p>
            </div>
            <div class="form-control" v-if="site.frontend_opts.hasDomain">
              <label for>Vad är webbsidans adress?</label>
              <input
                type="text"
                v-model="site.frontend_opts.existingDomain"
                placeholder="T.ex https://www.awesomesite.com/"
              />
            </div>
            <div
              class="form-control"
              v-if="site.frontend_opts.createDomain && !site.frontend_opts.hasDomain"
            >
              <label for>Skriv in önskad domän</label>
              <input
                type="text"
                v-model="site.frontend_opts.desiredDomain"
                placeholder="T.ex awesomesite.com"
              />
            </div>
            <button class="btn" @click.prevent="submit">
              Skapa sida
              <i class="material-icons arrow">arrow_forward</i>
            </button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<script>
import sampleData from '@/data/sample.json'
export default {
  data() {
    return {
      totalSteps: 7,
      currentStep: 1,
      file: null,
      site: {
        user_id: null,
        name: null,
        org_number: null,
        street: null,
        street_no: null,
        postal_code: null,
        postal_address: null,
        city: null,
        google_maps: null,
        phone_numbers: null,
        emails: null,
        frontend_opts: {
          theme: {
            primary: 1,
            sections: [
            {
              background: '#ffffff', 
              text: {
                heading: '#777777',
                body: '#777777'
              }
            },
            {
              background: '#ffffff', 
              text: {
                heading: '#777777',
                body: '#777777'
              }
            },
            {
              background: '#ffffff', 
              text: {
                heading: '#777777',
                body: '#777777'
              }
            },
            {
              background: '#ffffff', 
              text: {
                heading: '#777777',
                body: '#777777'
              }
            },
            {
              background: '#ffffff', 
              text: {
                heading: '#777777',
                body: '#777777'
              }
            },
            {
              background: '#ffffff', 
              text: {
                heading: '#777777',
                body: '#777777'
              }
            },
          ]
          },
          logo: null,
          heading: null,
          sub_heading: null,
          about: null,
          gallery_description: null,
          hasDomain: false,
          createDomain: false,
          existingDomain: null,
          desiredDomain: null
        },
        opening_hours: [],
        products: [],
        // gallery: [],
        staff: [],
        features: {
          online_booking: false,
          sms_alert: false,
          email_alert: false,
          customer_reviews: false
        }
      }
    };
  },
  methods: {
    nextStep() {
      this.currentStep++;
    },
    handleLogoFile(){
      this.file = this.$refs.logo.files[0]
    },
    submit() {
      const sample = sampleData[0]
      this.site.user_id = this.userId
      this.site.opening_hours = sample.opening_hours
      this.site.social = sample.social
      // this.site.gallery = sample.gallery
      this.site.products = sample.products
      this.site.staff = sample.staff
      this.site.frontend_opts.heading = `Välkommen till ${this.site.name}`
      this.site.frontend_opts.sub_heading = sample.frontend_opts.sub_heading
      this.site.frontend_opts.about = sample.frontend_opts.about
      this.site.frontend_opts.gallery_description = sample.frontend_opts.gallery_description
      // const logo = new FormData()
      const payload = {
        site: this.site
        // logo: logo
      }
      this.$store.dispatch("createSite", payload)
    }
  },
  computed: {
    userId(){
      return this.$store.getters.userId
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/scss/_variables.scss";
.wizard {
  background-color: $primaryColor;
  margin: 0;

  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;

    .box {
      h1 {
        text-align: center;
        margin-bottom: 28px;
      }

      h1,
      h2,
      h3 {
        color: #fff;
      }

      form {
        width: 500px;

        .step {
          &:nth-child(3),
          &:nth-child(5),
          &:last-child {
            .btn {
              background-color: rgba(255, 255, 255, 0.15);
            }
          }

          &:last-child {
            .input-group {
              display: flex;
              align-items: center;
              margin-bottom: 15px;
              .switch {
                margin: 0;
              }
              p {
                color: #fff;
                margin-left: 16px;
                margin-bottom: 0;
              }
            }
          }

          .grid {
            display: flex;
            flex-wrap: wrap;
            .col {
              flex-basis: 50%;
              padding-right: 10px;
              &:nth-child(2),
              &:nth-child(3) {
                flex-basis: 25%;
              }
            }
          }

          .theme {
            background-color: #fff;
            padding: 10px;
            line-height: 0;
            .theme-item {
              display: inline-block;
              height: 25px;
              width: 25px;
              margin: 5px;
              cursor: pointer;
              input {
                display: none;
              }
              &.active {
                transform: translateY(-4px);
                box-shadow: 0 5px 5px rgba(105, 105, 105, 0.2);
              }
              &:not(:last-child) {
                margin-right: 10px;
              }
              &:first-child {
                background-color: #8bc34a;
              }
              &:nth-child(2) {
                background-color: #4caf50;
              }
              &:nth-child(3) {
                background-color: #2196f3;
              }
              &:nth-child(4) {
                background-color: #673ab7;
              }
              &:nth-child(5) {
                background-color: #9c27b0;
              }
              &:last-child {
                background-color: #f44336;
              }
            }
          }

          label {
            display: block;
            color: #fff;
            margin: 12px;
          }

          input {
            border: 1px solid gray;
            border-radius: 0px;
            background-color: white;
            display: block;
            margin: 8px 0 16px;
            width: 100%;
            color: black;
            &::placeholder {
              color: gray;
            }
            &.invalid {
              background-color: rgba(244, 67, 54, 0.3);
            }
          }

          .input-group {
            width: 100%;
            position: relative;
            height: 44px;
            margin-top: 16px;

            .btn {
              background-color: rgba(255, 255, 255, 0.15);
            }

            .btn-circle {
              background-color: #fff;
              color: $primaryColor;
              height: 30px;
              width: 30px;
              position: absolute;
              right: 7px;
              top: 3px;
              border-radius: 50%;
              padding: 0;
              display: flex;
              justify-content: center;
              align-items: center;

              .arrow {
                font-size: 16px;
              }
            }
          }
        }
      }
    }
  }
}

.switch {
  position: relative;
  display: inline-block;
  width: 38px;
  height: 22px;

  input {
    opacity: 0;
    &:checked + .slider {
      // background: rgba(141, 141, 141, 0.3);
      background-color: #3bb340;
    }
    &:checked + .slider:before {
      -webkit-transform: translateX(16px);
      transform: translateX(16px);
    }
  }
  & + span {
    position: relative;
    bottom: 3px;
    position: relative;
    bottom: 5px;
    margin-left: 10px;
  }
  .slider {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    // background: rgba(0, 0, 0, 0.1);
    background-color: rgba(99, 99, 99, 0.17);
    border-radius: 30px;

    &:before {
      content: "";
      position: absolute;
      height: 16px;
      width: 16px;
      left: 3px;
      top: 3px;
      background: #fff;
      border-radius: 50%;
      -webkit-transition: 0.4s;
      transition: 0.4s;
    }
  }
}

@media (max-width: 576px) {
  .wizard {
    .container {
      .box {
        width: 100%;

        form {
          width: 100%;
          .input-group {
            width: 100%;
          }
          .step {
            .grid {
              .col {
                flex-basis: 100%;
                &:nth-child(2),
                &:nth-child(3) {
                  flex-basis: 50%;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>

