<template>
  <section class="about" id="about" :style="{background: section.background}">
    <div class="container">
      <h2 :style="{color: section.text.heading}">{{ section.data[0].heading_text }} </h2>
      <div class="grid">
        <div class="col" :style="{background: 'url(' + site.frontend_opts.backgroundImageURL + ')'}"></div>
        <div class="col">
          <i class="material-icons edit" v-if="allowEdit" @click="$emit('updateAbout')" :style="{background: site.frontend_opts.theme.primary}">edit</i>
          <p :style="{color: section.text.body_color}">{{ site.frontend_opts.about }}</p>
        </div>
        
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: ['allowEdit', 'site', 'section']
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

