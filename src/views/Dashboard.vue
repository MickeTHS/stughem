<template>
  
    
  <main v-if="site">

      <Banner
        :site="site"
        :allowEdit="true"
        @updateHeading="updateHeading"
        @updateSubHeading="updateSubHeading"
        @addToBackgroundImage="addToBackgroundImage"
      />

    <div v-bind:key="section.id" v-for="section in site.frontend_opts.theme.sections">
      <LeftImageText  
        v-if="section.type === 'image_left' && section.enabled" 
        :site="site" 
        :section="section" 
        :allowEdit="true"
        @addImageToSection="addImageToSection"
        @editSectionHeader="editSectionHeader"
        @editSectionBody="editSectionBody"
        />
      <RightImageText 
        v-if="section.type === 'image_right' && section.enabled" 
        :site="site" 
        :section="section"
        :allowEdit="true" 
        @addImageToSection="addImageToSection"
        @editSectionHeader="editSectionHeader"
        @editSectionBody="editSectionBody"
        />
      <ImageTextColumns 
        v-if="section.type === 'column_image_text' && section.enabled" 
        :site="site" 
        :section="section"
        :allowEdit="true"
        @addSectionColumnImage="addSectionColumnImage"
        @updateSectionData="updateSectionData"
         />
        
      <About
        v-if="section.type === 'about' && section.enabled" 
        :site="site"
        :section="section"
        :allowEdit="true"
        @updateAbout="updateAbout"
      />
      
      <OpeningHours
        v-if="section.type === 'opening_hours' && section.enabled" 
        :allowEdit="true"
        :section="section"
        :site="site"
        @updateOpeningHours="updateOpeningHours"
      />
      
      
      <Gallery
        v-if="section.type === 'site_gallery' && section.enabled" 
        :site="site"
        :section="section"
        :allowEdit="true"
        @updateGalleryDescription="updateGalleryDescription"
        @addToGallery="addToGallery"
      />

      
      <Staff
        v-if="section.type === 'staff_list' && section.enabled" 
        :site="site"
        :section="section"
        :allowEdit="true"
        @addStaff="addStaff"
      />

      <Products
        v-if="section.type === 'pricing_list' && section.enabled" 
        :site="site"
        :section="section"
        :allowEdit="true"
        @addProducts="addProducts"
        @editBlock="editProducts"
        @deleteBlock="deleteProductsBlock"
      />

      <Contact 
        :allowEdit="true" 
        v-if="section.type === 'contact_form' && section.enabled" 
        :section="section" 
        :site="site"
        @updateAddress="editAddress" />
      
    </div>
    
    
    <Footer :site="site" :allowEdit="true" @updateSocialLinks="updateSocialLinks" />
    <div class="dialog" :class="dialog.open ? 'open': ''">
      <div class="card">
        <header>
          <h2>{{ dialog.title }}</h2>
        </header>
        <div class="content">
          {{ site.target }}
          <textarea
            v-if="dialog.target === 'heading'"
            v-model="heading"
            placeholder="Banner heading.."
          ></textarea>
          <textarea
            v-if="dialog.target === 'subHeading'"
            v-model="sub_heading"
            placeholder="Banner Subheading.."
          ></textarea>
          <textarea v-if="dialog.target === 'about'" v-model="about" placeholder="About us text.."></textarea>
          <textarea v-if="dialog.target === 'section_heading'" v-model="currentSection.heading_text" placeholder="Header text..."></textarea>
          <textarea v-if="dialog.target === 'section_body'" v-model="currentSection.body_text" placeholder="Body text.."></textarea>
          <textarea
            v-if="dialog.target === 'galleryDescription'"
            v-model="gallery_description"
            placeholder="Gallery section description.."
          ></textarea>
          <ul v-if="dialog.target === 'openingHours'">
            <li>
              <div></div>
              <div>AM</div>
              <div>PM</div>
            </li>
            <li v-for="(item, index) in site.opening_hours" :key="index">
              <div>{{item.day}}</div>
              <div>
                <input type="time" v-model="opening_hours[index].hours[0]" />
                <input type="time" v-model="opening_hours[index].hours[1]" />
              </div>
              <div>
                <input type="time" v-model="opening_hours[index].hours[2]" />
                <input type="time" v-model="opening_hours[index].hours[3]" />
              </div>
            </li>
          </ul>
          <div v-if="dialog.target === 'addProducts'">
            <div class="form-control">
              <label for="block-title">Block Title</label>
              <input type="text" id="block-title" placeholder="Enter Block Title" v-model="block.title" required />
            </div>
            <div class="form-control">
              <label for="product-title">Product Title</label>
              <input type="text" id="product-title" placeholder="Enter Product Title" v-model="product.title" required />
            </div>
            <div class="form-control">
              <label for="product-price">Product Price</label>
              <input type="number" id="product-price" placeholder="Product Price" v-model="product.price" required />
            </div>
            <button class="btn" @click="addProduct">Add</button>
            <ul>
              <li
                v-for="(product, index) in block.services"
                :key="index"
              >{{ product.title }} - {{ product.price }}</li>
            </ul>
          </div>
          <div v-if="dialog.target === 'editProducts'">
            <h3>{{ block.title }} Services</h3>
            <div class="form-control products-form-control" v-for="(servce, index) in block.services" :key="index">
              <input type="text" placeholder="Enter Block Title" v-model="block.services[index].title" required />
              <input type="Number" placeholder="Enter Block Title" v-model="block.services[index].price" required />
            </div>
          </div>
          <div v-if="dialog.target === 'editAddress'">
            <div class="form-control">
              <label for="phone">Gata</label>
              <input type="text" id="street" v-model="site.contact.street" placeholder="Gata" />
            </div>
            <div class="form-control">
              <label for="phone">Gatunummer</label>
              <input type="text" id="street_no" v-model="site.contact.street_no" placeholder="Nr." />
            </div>
            <div class="form-control">
              <label for="phone">Postkod</label>
              <input type="text" id="postal_code" v-model="site.contact.postal_code" placeholder="Postkod" />
            </div>
            <div class="form-control">
              <label for="phone">Postort</label>
              <input type="text" id="postal_address" v-model="site.contact.postal_address" placeholder="Postort" />
            </div>
            <div class="form-control">
              <label for="email">Epost</label>
              <input type="text" id="email" v-model="site.contact.email" placeholder="Kontakt E-post" />
            </div>
            <div class="form-control">
              <label for="phone">Tel</label>
              <input type="text" id="phone" v-model="site.contact.phone" placeholder="Kontakt Telefon" />
            </div>
          </div>
          <div v-if="dialog.target === 'addStaff'">
            <div class="form-control">
              <label for="firstname">Förnamn:</label>
              <input
                type="text"
                id="firstname"
                v-model="staff.firstname"
                placeholder="Staff First Name"
              />
            </div>
            <div class="form-control">
              <label for="lastname">Efternamn:</label>
              <input
                type="text"
                id="lastname"
                v-model="staff.lastname"
                placeholder="Staff Last Name"
              />
            </div>
            <div class="form-control">
              <label for="staffTitle">Titel:</label>
              <input
                type="text"
                id="staffTitle"
                v-model="staff.title"
                placeholder="e.g Receptionist"
              />
            </div>
            <div class="form-control">
              <label for="email">Epost</label>
              <input type="text" id="email" v-model="staff.email" placeholder="Staff Email" />
            </div>
            <div class="form-control">
              <label for="phone">Tel</label>
              <input type="text" id="phone" v-model="staff.phone" placeholder="Staff Phone" />
            </div>
            <div class="form-control">
              <label for="logo">Bild</label>
              <input type="file" id="logo" @change="onFilesSelected" />
            </div>
          </div>
          <div v-if="dialog.target === 'addToGallery'">
            <div class="form-control">
              <label for="gallery">Välj bild</label>
              <input type="file" id="gallery" @change="onFilesSelected" multiple>
            </div>
          </div>
          <div v-if="dialog.target === 'addToBackgroundImage'">
            <div class="form-control">
              <label for="backgroundImage">Välj bild</label>
              <input type="file" id="backgroundImage" @change="onFilesSelected">
            </div>
          </div>
          <div v-if="dialog.target === 'addToSection'">
            <div class="form-control">
              <label for="sectionImage">Välj bild</label>
              <input type="file" id="sectionImage" @change="onFilesSelected">
            </div>
          </div>
          <div v-if="dialog.target === 'addSectionColumnImage'">
            <div class="form-control">
              <label for="sectionImage">Välj bild</label>
              <input type="file" id="sectionImage" @change="onFilesSelected">
            </div>
          </div>
          
          

          <div v-if="dialog.target === 'updateSocialLinks'">
            <div class="form-control">
              <label for="facebook">Facebook</label>
              <input type="text" id="facebook" v-model="social[0].url">
            </div>
            <div class="form-control">
              <label for="twitter">Twitter</label>
              <input type="text" id="twitter" v-model="social[1].url">
            </div>
            <div class="form-control">
              <label for="instagram">Instagram</label>
              <input type="text" id="instaram" v-model="social[2].url">
            </div>
            <div class="form-control">
              <label for="linkedin">LinkedIn</label>
              <input type="text" id="linkedin" v-model="social[3].url">
            </div>
          </div>
        </div>
        <footer>
          <button
            v-if="dialog.target !== 'openingHours' 
              && dialog.target !== 'addProducts'
              && dialog.target !== 'editProducts'
              && dialog.target !== 'addStaff'
              && dialog.target !== 'addToGallery'
              && dialog.target !== 'addToBackgroundImage'
              && dialog.target !== 'addToSection'
              && dialog.target !== 'addSectionColumnImage'
              && dialog.target !== 'updateSocialLinks'
              && dialog.target !== 'section_heading'
              && dialog.target !== 'section_body'
              && dialog.target !== 'editAddress'"
            class="btn"
            @click="saveFrontendOpts"
          >Spara</button>
          <button v-if="dialog.target === 'openingHours'" class="btn" @click="saveOpeningHours">Spara</button>
          <button v-if="dialog.target === 'addProducts' || dialog.target === 'editProducts'" class="btn" @click="saveProducts">Spara</button>
          <button v-if="dialog.target === 'addStaff'" class="btn" @click="saveStaff">Spara</button>
          <button v-if="dialog.target === 'addToGallery'" class="btn" @click="saveToGallery">Spara</button>
          <button v-if="dialog.target === 'addToBackgroundImage'" class="btn" @click="saveBackgroundImage">Spara</button>
          <button v-if="dialog.target === 'addToSection'" class="btn" @click="saveSectionImage">Spara</button>
          <button v-if="dialog.target === 'updateSocialLinks'" class="btn" @click="saveSocialLinks">Spara</button>
          <button v-if="dialog.target === 'section_heading'" class="btn" @click="saveSectionHeadingText">Spara</button>
          <button v-if="dialog.target === 'section_body'" class="btn" @click="saveSectionBodyText">Spara</button>
          <button v-if="dialog.target === 'addSectionColumnImage'" class="btn" @click="saveSectionColumnImage">Spara</button>
          <button v-if="dialog.target === 'editAddress'" class="btn" @click="saveAddress">Spara</button>
          <button class="btn btn-error" @click="dialog.open = false">Stäng</button>
        </footer>
      </div>
    </div>
  </main>
  
</template>

<script>
import { landingPage } from "@/utils/landingPage.js"
import ColorBox from "@/components/landingpage/ColorBox"
import LeftImageText from "@/components/landingpage/LeftImageText";
import RightImageText from "@/components/landingpage/RightImageText";
import ImageTextColumns from "@/components/landingpage/ImageTextColumns";



export default {
  mixins: [landingPage],
  data() {
    return {
      showAddComponent: true,
      dialog: {
        open: false,
        title: null,
        target: null,
        id: null
      },
      heading: null,
      sub_heading: null,
      about: null,
      currentSection: null,
      gallery_description: null,
      opening_hours: [],
      product: {
        title: null,
        price: null
      },
      block: {
        id: null,
        title: null,
        services: []
      },
      selectedFiles: null,
      staff: {
        firstname: null,
        lastname: null,
        title: null,
        email: null,
        phone: null,
        image: null
      },
      social: [
        { name: "facebook", url: "https://facebook.com/"},
        { name: "twitter",  url: "https://twitter.com/"},
        { name: "instagram", url: "https://instagram.com/"},
        { name: "linkedin", url: "https://linkedin.com/"}
      ],
      contact: {
        street: '',
        street_no: '',
        postal_code: '',
        postal_address: '',
        city: '',
        phone: '',
        emial: ''
      }
    }
  },
  components: {
    ColorBox, LeftImageText, RightImageText, ImageTextColumns
  },
  methods: {
    onFilesSelected(event) {
      this.selectedFiles = event.target.files
    },
    updateHeading() {
      this.dialog.title = "Update Heading"
      this.dialog.target = "heading"
      this.dialog.open = true
    },
    updateSubHeading() {
      this.dialog.title = "Update Sub Heading"
      this.dialog.target = "subHeading"
      this.dialog.open = true
    },
    updateAbout() {
      this.dialog.title = "Update About Us"
      this.dialog.target = "about"
      this.dialog.open = true
    },
    updateGalleryDescription() {
      this.dialog.title = "Update Gallery Description"
      this.dialog.target = "galleryDescription"
      this.dialog.open = true
    },
    updateOpeningHours() {
      this.dialog.title = "Update Opening Hours"
      this.dialog.target = "openingHours"
      this.dialog.open = true
    },
    addProducts() {
      this.dialog.title = "Add Products Block"
      this.dialog.target = "addProducts"
      this.dialog.open = true
    },
    editAddress() {
      this.dialog.title = "Update address"
      this.dialog.target = "editAddress"
      this.dialog.open = true
    },
    editProducts(id) {
      this.dialog.title = "Edit Products Block"
      this.dialog.target = "editProducts"
      this.block = this.site.products.filter(block => block.id === id)[0]
      console.log('block: ', this.block)
      this.dialog.open = true
    },
    addProduct() {
      const product = {
        title: this.product.title,
        price: this.product.price
      }
      if (!this.product.title || !this.product.title) {
        const snackbar = {
          open: true,
          success: false,
          message: 'Please provide product name and price!'
        }
        return this.$store.dispatch('showSnackbar', snackbar)
      }
      this.block.services.push(product)
    },
    addStaff() {
      this.dialog.title = "Add Staff"
      this.dialog.target = "addStaff"
      this.dialog.open = true
    },
    saveStaff() {
      const staff = {
        site_id: this.site.site_id,
        firstname: this.staff.firstname,
        lastname: this.staff.lastname,
        title: this.staff.title,
        email: this.staff.email,
        phone: this.staff.phone,
      }
      const fd = new FormData()
      fd.append('image', this.selectedFiles[0])
      fd.append('file_source', 'staff');
      const payload = {staff, fd}
      this.$store.dispatch('addStaff', payload)
    },
    editSectionHeader: function(section) {
      console.log('dashboard:');
      console.log(section);
      this.dialog.title = "Update Header";
      this.dialog.target = "section_heading";
      this.dialog.id = section.id;
      this.currentSection = { heading_text: section.data[0].heading_text, section_id: section.id };
      

      console.log(this.currentSection);

      this.dialog.open = true;
    },
    editSectionBody: function(section) {
      this.dialog.title = "Update Text"
      this.dialog.target = "section_body"
      this.dialog.id = section.id;
      this.currentSection = { body_text: section.data[0].body_text, section_id: section.id };
      
      console.log(this.currentSection);

      this.dialog.open = true
    },
    addSectionColumnImage: function(section, columnIndex) {
      this.dialog.title = 'Add Column Section Image';
      this.dialog.target = 'addSectionColumnImage';
      this.dialog.open = true;
      this.dialog.id = section.id;
      this.dialog.column_index = columnIndex;
    },
    addImageToSection: function(section) {
      this.dialog.title = 'Add Section Image';
      this.dialog.target = 'addToSection';
      this.dialog.open = true;
      this.dialog.id = section.id;
    },
    addToGallery() {
      this.dialog.title = "Add Gallery Images"
      this.dialog.target = "addToGallery"
      this.dialog.open = true
    },
    addToBackgroundImage() {
      this.dialog.title = "Add Background Image"
      this.dialog.target = "addToBackgroundImage"
      this.dialog.open = true
    },
    saveToGallery() {
      if(!this.selectedFiles) return
      const filesSelectedCount = this.selectedFiles.length
      const fd = new FormData()
      fd.append('gallery_id', this.site.gallery.gallery_id)
      fd.append('file_source', 'gallery')
      for(let i = 0; i < filesSelectedCount; i++){
        fd.append('gallery[]', this.selectedFiles[i])
      }
      this.$store.dispatch('addToGallery', fd)
    },
    saveSectionColumnImage() {
      if(!this.selectedFiles) return
      
      const fd = new FormData()
      fd.append('file_source', 'section_column_image');
      fd.append('image', this.selectedFiles[0]);
      fd.append('section_id', this.dialog.id);
      fd.append('column_index', this.dialog.column_index);
      
      console.log('section_id: ' + this.dialog.id);
      
      this.$store.dispatch('addSectionColumnImage', fd)
    },
    saveAddress() {
      var payload = {
        site_id: this.site.site_id,
        contact: {
          street: this.site.contact.street,
          street_no: this.site.contact.street_no,
          postal_address: this.site.contact.postal_address,
          postal_code: this.site.contact.postal_code,
          email: this.site.contact.email,
          phone: this.site.contact.phone
        }
      };
      this.$store.dispatch('updateAddress', payload);
    },
    saveSectionImage() {
      if(!this.selectedFiles) return
      
      const fd = new FormData()
      fd.append('file_source', 'section_image');
      fd.append('image', this.selectedFiles[0]);
      fd.append('section_id', this.dialog.id);

      console.log('section_id: ' + this.dialog.id);
      
      this.$store.dispatch('addToSectionImage', fd)
    },
    saveBackgroundImage() {
      if(!this.selectedFiles) return
      
      const fd = new FormData()
      fd.append('file_source', 'background_image');
      fd.append('image', this.selectedFiles[0]);
      
      this.$store.dispatch('addToBackgroundImage', fd)
    },
    updateSocialLinks() {
      this.dialog.title = "Update Social Links"
      this.dialog.target = "updateSocialLinks"
      this.dialog.open = true
    },
    async saveSocialLinks(){
      const site = {
        social: this.social
      }
      try {
        const res = await this.$store.dispatch("updateSite", site)
        const snackbar = {
          open: true,
          message: 'Informations Updated Successfully!',
          success: true
        }
        this.$store.dispatch('showSnackbar', snackbar)
        await this.$store.dispatch("getSite")
        this.dialog.open = false
      } catch (e) {
        console.log(e)
      }
    },
    async updateSectionData(payload) {
      console.log('payload')
      console.log(payload)
      await this.$store.dispatch('updateSectionData', payload);
    },
    async saveSectionHeadingText() {
        await this.$store.dispatch('updateSectionHeadingText', { section_id: this.currentSection.section_id, index: 0, site_id: this.site.site_id, text: this.currentSection.heading_text });
    },
    async saveSectionBodyText() {
        await this.$store.dispatch('updateSectionBodyText', { section_id: this.currentSection.section_id, index: 0, site_id: this.site.site_id, text: this.currentSection.body_text } );
    },
    async saveFrontendOpts() {
      const site = {
        frontend_opts: {
          heading: this.heading
            ? this.heading
            : this.site.frontend_opts.heading,
          sub_heading: this.sub_heading
            ? this.sub_heading
            : this.site.frontend_opts.sub_heading,
          about: this.about ? this.about : this.site.frontend_opts.about,
          gallery_description: this.gallery_description
            ? this.gallery_description
            : this.site.frontend_opts.gallery_description,
          theme: this.site.frontend_opts.theme,
          logo: this.site.frontend_opts.logo,
          hasDomain: this.site.frontend_opts.hasDomain,
          createDomain: this.site.frontend_opts.createDomain,
          existingDomain: this.site.frontend_opts.existingDomain,
          desiredDomain: this.site.frontend_opts.desiredDomain
        }
      }
      try {
        const res = await this.$store.dispatch("updateSite", site)
        const snackbar = {
          open: true,
          message: 'Informations Updated Successfully!',
          success: true
        }
        this.$store.dispatch('showSnackbar', snackbar)
        await this.$store.dispatch("getSite")
        this.dialog.open = false
      } catch (e) {
        console.log(e)
      }
    },
    async saveOpeningHours() {
      const site = {
        opening_hours: this.opening_hours
      }
      try {
        const res = await this.$store.dispatch("updateSite", site)
        console.log(res)
        this.$store.dispatch("getSite") 
      } catch (e) {
        console.log(e) 
      }
    },
    async saveProducts() {

      let products = this.site.products || []
      const blockId = this.block.id

      if(this.dialog.target === 'addProducts'){
        console.log('ADD >>')
        this.block.id = this.site.products.length + 1, // the backend should later generate unique id
        products.push(this.block)
      } else if (this.dialog.target === 'editProducts'){
        console.log('EDIT >>')
        const blockIndex = products.findIndex(block => block.id === blockId)
        products[blockIndex] = this.block
      } else {
        console.log('ERROR >>')
      }
      console.log(products)
      const site = { products }
      try {
        await this.$store.dispatch("updateSite", site)
        await this.$store.dispatch("getSite") 
        this.product.title = null
        this.product.price = null
        this.block.id = null
        this.block.title = null
        this.block.services = []
        this.dialog.open = false
      } catch (e) {
        console.log(e) 
      }
    },
    async deleteProductsBlock(id) {
      const products = this.site.products.filter(product => product.id !== id)
      const site = { products }
      try {
        await this.$store.dispatch("updateSite", site)
        await this.$store.dispatch("getSite") 
      } catch (e) {
        console.log(e) 
      }
    },
  },
  computed: {
    site() {
      return this.$store.getters.site  
    },
    gallery(){
      return this.$store.getters.gallery
    }
  },
  watch: {
    site() {
      this.heading = this.site.frontend_opts.heading 
      this.sub_heading = this.site.frontend_opts.sub_heading 
      this.about = this.site.frontend_opts.about 
      this.gallery_description = this.site.frontend_opts.gallery_description 
      this.opening_hours = this.site.opening_hours 
      this.social = this.site.social
      this.contact = this.site.contact
    }
  },
  mounted() {
    this.$store.dispatch("getUser") 
    this.$store.dispatch("getSite") 
  }
};
</script>

<style lang="scss">
.dialog {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100vw;
  background: rgba(0, 0, 0, 0.7);
  display: none;
  justify-content: center;
  align-items: center;
  z-index: 100;
  &.open {
    display: flex;
  }
  .card {
    background-color: #fff;
    width: 570px;
    max-width: 100%;
    min-height: 220px;
    margin: 20px;
    header {
      padding: 16px 32px;
      border-bottom: 1px solid #f1f2f3;
      h2 {
        color: #8bc34a;
        font-size: 15px;
        text-transform: uppercase;
        letter-spacing: 0.25px;
      }
    }
    .content {
      padding: 24px 32px 10px 32px;
      h3 {
        color: #777;
        text-transform: uppercase;
        font-size: 14px;
        letter-spacing: .5px;
        margin-bottom: 16px;
      }
      textarea {
        border: 1px solid #eee;
        border-radius: 4px;
        padding: 14px 20px;
        width: 100%;
        height: 150px;
        resize: none;
        outline: none;
      }
      input[type="text"],
      input[type="number"] {
        border: 1px solid #e6e6e6;
        background-color: #fff;
        color: #666;
        padding: 10px 20px;
        margin-right: 10px;
        margin-bottom: 10px;
        border-radius: 25px;
        width: calc(100% - 12px);
        &::placeholder {
          color: #aaa;
          font-weight: 300;
        }
      }
      ul {
        li {
          display: flex;
          margin: 8px 0;
          position: relative;
          cursor: pointer;
          border-bottom: 1px solid #f5f5f5;
          cursor: pointer;
          &:hover {
            .material-icons.edit {
              opacity: 1;
            }
          }
          div {
            background-color: #fafafa;
            padding: 10px;
            &:first-child {
              flex-basis: 20%;
            }
            &:not(:first-child) {
              display: flex;
              justify-content: center;
              flex-basis: 40%;
            }
          }
          input[type="time"] {
            width: 92px;
            font-size: 14px;
          }
        }
      }
    }
    footer {
      padding: 0 32px 24px 32px;
      background-color: #fff;
    }
    button {
      padding: 10px 20px;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 1px;
      background-color: #8bc34a;
      border-radius: 25px;
      margin-right: 10px;
      &.btn-error {
        background-color: #f44336;
      }
    }
  }
  .form-control {
    display: inline-block;
    min-width: 250px;
    max-width: 100%;
    &.products-form-control {
      input {
        width: calc(50% - 10px) !important;
        margin-right: 10px !important;
      }
    }
    &:not(:last-child) {
      margin-bottom: 10px;
    }
    label {
      display: block;
      text-transform: uppercase;
      font-size: 12px;
      font-weight: 500;
      letter-spacing: 0.25px;
      margin-bottom: 6px;
      color: #bbb;
    }
  }
}
</style>


