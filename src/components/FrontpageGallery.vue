<template>
  <v-row>
    <v-col cols="12">
      <v-card>
        <v-container fluid>
          <v-row>
            <v-col
              v-for="n in 12"
              :key="n"
              class="d-flex child-flex"
              cols="4"
            >
              <v-card flat tile class="d-flex">
                <v-img
                  :src="`${image_urls[n]}`"
                  :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
                  aspect-ratio="1"
                  class="grey lighten-2"
                  gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
                >
                  <template v-slot:placeholder>
                    <v-row
                      class="fill-height ma-0"
                      align="center"
                      justify="center"
                    >
                      <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
    data() {
      return {
        image_urls: [
          'https://www.riverridgerentals.com/sites/default/files/styles/450x350/public/snippets/timber_creek_retreat-004-47-exterior_front-mls_size.jpg?itok=Jx-tDT25',
          'https://res.cloudinary.com/whistler/image/upload/w_500,c_scale,dpr_3.0,q_auto/v1/s3/images/header/skiing-whistler-blackcomb.jpg',
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYbVicjEC0cjJzVSa0ABm1PsUCEObjeixnlyPqiK0x42opdwly',
          'https://www.traveller.com.au/content/dam/images/h/1/c/o/6/z/image.gallery.galleryLandscape.620x414.h1co7e.png/1553230897840.jpg',
          'https://cdn.katahdincedarloghomes.com/uploads/0133-1024x683.jpg',
          'https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/snowy-pines-kathy-whipple-wong.jpg',
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMe_EvbCR-k5JZ37Sn-Xa0o7vqvKmFH0Gjnowr5fqtLOoKsg1Y',
          'https://i0.wp.com/www.traveltyrol.com/wp-content/uploads/2018/01/Restaurant-Schlick-2000-1.jpg?resize=1024%2C768&ssl=1',
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdVpLTf2Vg9kGWSUSEBe8SmYYT3aFKsaNXGT5c3wd4coyUTFkk',
          'https://www.smhi.se/polopoly_fs/1.95643.1505138854!/image/norrsken1.jpg_gen/derivatives/Original_542px/image/norrsken1.jpg',
          'https://media-cdn.tripadvisor.com/media/photo-s/07/be/70/a9/the-grille.jpg',
          'https://media.mnn.com/assets/images/2018/02/LitUpCabinCoveredBySnowLaplandFinland.jpg.653x0_q80_crop-smart.jpg',
          'https://s3.amazonaws.com/static-loghome/media/LHL_0404_JKL_08_2268_2018-01-04_14-40.jpg',
          'https://www.stoten.se/globalassets/bilder/toppbilder/skidakning/toppbild_skidakning_alvan_1920x800.jpg',
        ]
      }
    }
}
</script>

<style scoped>

</style>