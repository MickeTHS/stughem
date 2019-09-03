<template>
  <section class="contact" id="contact" :style="{background: section.background}">
    <div class="container">
      <h2 :style="{color: section.text.heading}">{{ section.data[0].heading_text }}</h2>
      <div class="grid">
        <div class="col col-6 map-wrapper">
          <div class="map">
            <img :src="site.google_maps.static_link" alt="">
          </div>
        </div>
        <div class="col col-6 contact-info">
          <p :style="{color: section.text.body}">{{ section.data[0].body_text }}</p>
          <ul class="contact-info">
            <li :style="{color: section.text.body}">
              <i class="material-icons" :style="{color: site.frontend_opts.theme.primary}">location_on</i>
              {{ site.street }}
              {{ site.street_no }},
              {{ site.postal_code }}
              {{ site.postal_area }}
              {{ site.postal_code || site.postal_area ? ', ' : ''}}
              {{ site.city }}
            </li>
            <li :style="{color: section.text.body}">
              <i class="material-icons" :style="{color: site.frontend_opts.theme.primary}">phone_in_talk</i>
              {{ site.phone_numbers }}
            </li>
            <li :style="{color: section.text.body}">
              <i class="material-icons" :style="{color: site.frontend_opts.theme.primary}">message</i>
              {{ site.emails }}
            </li>
          </ul>
        </div>
        <div class="col col-12">
          <form action>
            <input type="text" placeholder="Ditt namn" />
            <input type="email" placeholder="Din Epost" />
            <input type="tel" placeholder="Ditt telefonnummer" />
            <input type="text" placeholder="Titel" />
            <textarea name="message" placeholder="Meddelanda"></textarea>
            <button class="btn" :style="{background: site.frontend_opts.theme.primary}">Skicka!</button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: ['site', 'theme', 'section']
};
</script>

<style lang="scss">
@import "@/assets/scss/_variables.scss";
.contact {
  .grid {
    flex-wrap: wrap;
    justify-content: flex-start;
    .col {
      &.col-12 {
        flex-basis: 100%;
      }
      &.col-6 {
        flex-basis: 50%;
        &.map-wrapper {
          display: flex;
          width: 50%;
         .map {
            overflow: hidden;
            display: flex;
            justify-content: center;
         }
        }
        &.contact-info {
          padding: 30px;
        }
      }
    }
  }
  form {
    width: 100%;
    max-width: 800px;
    input,
    textarea {
      border-radius: 4px;
      background-color: #fff;
      border: 1px solid #ddd;
      padding: 10px 20px;
      margin: 4px;
      outline: none;
      font-size: 14px;
      font-weight: 300;
      &::placeholder {
        color: #aaa;
      }
    }
    input {
      width: calc(50% - 10px);
    }
    textarea {
      height: 100px;
      resize: none;
      font-family: "Roboto", sans-serif;
      width: calc(100% - 10px);
    }
    button {
      background-color: $theme1;
      border-radius: 4px;
      margin: 10px 5px;
    }
  }
  .contact-info {
    .material-icons {
      color: $theme1;
      width: 30px;
      margin: 8px 0;
      font-size: 24px;
      vertical-align: middle;
    }
  }
}
@media (max-width: 900px) {
  .contact {
    .grid {
      display: block;
      .col.col-6 {
        width: 100%;
        flex-basis: 100%;
        padding: 10px !important;
        &.map-wrapper {
          width: 100%;
          .map {
            width: 100%;
          }
        }
      }
    }
  }
}
@media (max-width: 500px) {
  .contact {
    form {
      input,
      textarea {
        margin: 5px 0;
        width: 100%;
      }
    }
  }
}
</style>



