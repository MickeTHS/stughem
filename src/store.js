import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

import axios from '@/axios'
import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    static_urls: {
      local: process.env.VUE_APP_LOCAL_DOMAIN,
      api: process.env.VUE_APP_API_HTTP,
      content: process.env.VUE_APP_CONTENT_URL,
      upload: process.env.VUE_APP_FILEUPLOAD
    },
    token: null,
    userId: null,
    site: null,
    publicSite: null,
    snackbar: {
      open: false,
      message: null,
      success: false,
    }
  },
  mutations: {
    authUser(state, userData) {
      state.token = userData.token
      state.userId = userData.userId
    },
    clearAuth(state) {
      state.token = null
      state.userId = null
    },
    updateSite(state, site) {
      state.site = site
    },
    updatePublicSite(state, site) {
      state.publicSite = site
    },
    showSnackbar(state, snackbar) {
      state.snackbar = snackbar
    }
  },
  actions: {
    async updateAddress({ commit, dispatch, state }, payload) {
      const config = { headers: {'x-access-token': state.token} }

      const res = await axios.put('/site/address', payload, config);
    },
    async signup({commit}, authData) {
      try {
        const res = await axios.post('/user/create', authData)
        const token = res.data.token
        const userId = res.data.id

        commit('authUser', {token, userId})

        localStorage.setItem('token', token)
        localStorage.setItem('userId', userId)
        router.push('/wizard')
      } catch (e) {
        const message = e.response.data.message || e.response.data.reason || 'ERROR!'
        const snackbar = {
          open: true,
          message: message,
          success: false
        }
        commit('showSnackbar', snackbar)
      }
    },
    async login({commit, dispatch}, authData) {
      try {
        const res = await axios.post('/user/login', authData)
        console.log('user: ', res.data)
        const token = res.data.token
        const userId = res.data.id
        const siteId = res.data.currentSite

        commit('authUser', {token, userId})

        localStorage.setItem('token', token)
        localStorage.setItem('userId', userId)
        if (res.data.currentSite === 'none') return router.push('/wizard')
        await dispatch('getSite', siteId)
        router.push('/admin')
      } catch (e) {
        const message = e.response.data.message || 'ERROR!'
        const snackbar = {
          open: true,
          message: message,
          success: false
        }
        commit('showSnackbar', snackbar)
      }
    },
    autoLogin({commit}) {
      const token = localStorage.getItem('token')
      const userId = localStorage.getItem('userId')

      if (!token) return
      commit('authUser', {token, userId})
    },
    logout({commit}) {
      commit('clearAuth')

      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      localStorage.removeItem('site')

      router.replace('/login')
    },
    async getUser({commit, state}) {
      const data = {
        user_id: state.userId,
        headers: {'x-access-token': state.token}
      }
      const user = await axios.get('/user', data)
    },
    async deleteSection({commit, dispatch, state}, section_id) {
      const config = { headers: {'x-access-token': state.token} }
      const res = await axios.delete('/site/deletesection?section_id='+section_id, config)
    },
    async moveSectionUp({commit, dispatch, state}, payload) {
      const config = { headers: {'x-access-token': state.token} }
      const res = await axios.put('/site/movesection', { section_id: payload, dir: 'up' }, config)
    },
    async moveSectionDown({commit, dispatch, state}, payload) {
      const config = { headers: {'x-access-token': state.token} }
      const res = await axios.put('/site/movesection', { section_id: payload, dir: 'down' }, config)
    },
    async updateSectionHeadingText({commit, dispatch, state}, payload) {
      const config = { headers: {'x-access-token': state.token} }
      const res = await axios.put('/site/updateSectionHeading', payload, config)
    }, 
    async updateSectionBodyText({commit, dispatch, state}, payload) {
      const config = { headers: {'x-access-token': state.token} }
      const res = await axios.put('/site/updateSectionBody', payload, config)
    },
    async createSite({commit, dispatch, state}, payload) {
      const config = { headers: {'x-access-token': state.token} }
      const res = await axios.post('/site', payload.site, config)

      console.log(res)

      const createdSite = res.data.site
      const siteId = createdSite.site_id

      const updatedSite = await axios.put('/site', {
        lookup_latlng: true,
        site_id: siteId
      }, config)
      console.log('site: ', updatedSite.data.site)
      localStorage.setItem('site', JSON.stringify(updatedSite.data.site))
      commit('updateSite', updatedSite)
      dispatch('getSite', siteId)
    },
    async addLogo({commit, dispatch, state}, payload) {
      const config = {
        headers: {
          'x-access-token': state.token,
          'Content-Type': 'multipart/form-data'
        }
      }
      try {
        const res = await Axios.post(process.env.VUE_APP_FILEUPLOAD, payload, config)
        console.log(res)
        const logo = res.data.files[0]
        const frontendOpts = state.site.frontend_opts
        frontendOpts.logo = logo
        console.log('fopts', frontendOpts)
        await dispatch('updateSite', {frontend_opts: frontendOpts})
        dispatch('getSite', state.site.site_id)

      } catch (e) {
        console.log('ERROR!!')
        console.log(e.reason)
      }
    },
    async updateLogo({commit, dispatch, state}, payload) {
      const config = {
        headers: {
          'x-access-token': state.token,
          'Content-Type': 'multipart/form-data'
        }
      }
      try {
        const res = await axios.put('/site', payload, config)
        console.log(res)
      } catch (e) {
        console.log('ERROR!!')
        console.log(e.reason)
      }
    },
    async addToGallery({commit, dispatch, state}, fd) {
      const config = {
        headers: {
          'x-access-token': state.token,
          'Content-Type': 'multipart/form-data'
        }
      }
      try {
        const res = await Axios.post(process.env.VUE_APP_FILEUPLOAD, fd, config)
        const message = 'Images uploaded successfully'
        const snackbar = {
          open: true,
          message: message,
          success: true
        }
        commit('showSnackbar', snackbar)
        dispatch('getSite', state.site.site_id)
      } catch (e) {
        console.log('ERROR!!')
        console.log(e.reason)
      }
    },
    async updateSectionData({ commit, dispatch, state}, payload) {
      const config = {
        headers: {
          'x-access-token': state.token
        }
      }
      try {
        const res = await Axios.put(process.env.VUE_APP_API_HTTP + '/site/updateSectionData', payload, config)
        const message = 'Section updated successfully'
        const snackbar = {
          open: true,
          message: message,
          success: true
        }
        commit('showSnackbar', snackbar)
        dispatch('getSite', state.site.site_id)
      } catch (e) {
        console.log('ERROR!!')
        console.log(e.reason)
      }
    },
    async addSectionColumnImage({commit, dispatch, state}, fd) {
      const config = {
        headers: {
          'x-access-token': state.token,
          'Content-Type': 'multipart/form-data'
        }
      }
      try {
        const res = await Axios.post( process.env.VUE_APP_FILEUPLOAD, fd, config)
        const message = 'Image uploaded successfully'
        const snackbar = {
          open: true,
          message: message,
          success: true
        }
        commit('showSnackbar', snackbar)
        dispatch('getSite', state.site.site_id)
      } catch (e) {
        console.log('ERROR!!')
        console.log(e.reason)
      }
    },
    async addToSectionImage({commit, dispatch, state}, fd) {
      const config = {
        headers: {
          'x-access-token': state.token,
          'Content-Type': 'multipart/form-data'
        }
      }
      try {
        const res = await Axios.post(process.env.VUE_APP_FILEUPLOAD, fd, config)
        const message = 'Image uploaded successfully'
        const snackbar = {
          open: true,
          message: message,
          success: true
        }
        commit('showSnackbar', snackbar)
        dispatch('getSite', state.site.site_id)
      } catch (e) {
        console.log('ERROR!!')
        console.log(e.reason)
      }
    },
    async addToBackgroundImage({commit, dispatch, state}, fd) {
      const config = {
        headers: {
          'x-access-token': state.token,
          'Content-Type': 'multipart/form-data'
        }
      }
      try {
        const res = await Axios.post(process.env.VUE_APP_FILEUPLOAD, fd, config)
        const message = 'Image uploaded successfully'
        const snackbar = {
          open: true,
          message: message,
          success: true
        }
        commit('showSnackbar', snackbar)
        dispatch('getSite', state.site.site_id)
      } catch (e) {
        console.log('ERROR!!')
        console.log(e.reason)
      }
    },
    async addSection({commit, state}, type) {
      const config = { headers: {'x-access-token': state.token} }
      const obj = { site_id: state.site.site_id, type: type };

      console.log('site sending add section: ', obj)
      return await axios.post('/site/addsection', obj, config)
    },
    async updateSite({commit, state}, site) {
      const config = { headers: {'x-access-token': state.token} }
      site.site_id = state.site.site_id
      console.log('site to update: ', site)
      return await axios.put('/site', site, config)
    },
    async getSitePublic({state, commit}, id) {
      const res = await axios.get(`/site/publicextended?site_id=${id}`)
      const site = res.data.site
      commit('updatePublicSite', site)
    },
    async getSite({commit, dispatch, state}, id) {
      if (!id) id = state.site.site_id
      const res = await axios.get(`/site/extended?site_id=${id}`)
      const site = res.data.site
      site.staff = res.data.staff

      console.log({site})

      localStorage.setItem('site', JSON.stringify(site))
      commit('updateSite', site)
      //router.push('/admin')
    },
    async autoLoadSite({commit, state}) {
      try {
        const site = JSON.parse(localStorage.getItem('site'))
        if (!site) return
        commit('updateSite', site)
      } catch (e) {
        localStorage.clear()
      }
    },
    async addStaff({commit, state}, payload) {
      const config = {
        headers: {
          'x-access-token': state.token
        }
      }
      try {
        const res = await axios.post('/site/staff', payload.staff, config)
        console.log(res)
        // const galleryId = res.data.user.gallery_id
        const staffId = res.data.user.user_id
        const filesUploadConfig = {
          headers: {
            'x-access-token': state.token,
            'Content-Type': 'multipart/form-data'
          }
        }
        // payload.fd.append('gallery_id', galleryId)
        payload.fd.append('staff_id', staffId)
        const uploadRes = await Axios.post(process.env.VUE_APP_FILEUPLOAD, payload.fd, filesUploadConfig)
        console.log(uploadRes)
      } catch (e) {
        console.log('ERROR!!')
        console.log(e)
      }
    },
    
    async deleteStaff({commit, state}, userId){
      const config = { headers: {'x-access-token': state.token} }
      const res = await axios.delete(`/user?user_id=${userId}`, config)
      console.log('Delete Res: ', res)
      // try {
      //   const res = await axios.delete(`/user?user_id=${userId}`, config)
      //   console.log('Delete Res: ', res)
      // } catch(e){
      //   console.log(e)
      // }
    },
    showSnackbar({commit}, snackbar) {
      commit('showSnackbar', snackbar)
    },
    updateStaff({commit, state}, id) {
      const staff = state.site.staff.filter(member => member.id !== id)
      commit('updateStaff', staff)
    }
  },
  getters: {
    userId(state) {
      return state.userId
    },
    site(state) {
      return state.site
    },
    publicSite(state) {
      return state.publicSite
    },
    isAuth(state) {
      return state.token !== null
    },
    snackbar(state) {
      return state.snackbar
    }
  }
})