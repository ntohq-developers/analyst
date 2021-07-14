import Cookies from 'js-cookie'

export const state = () => ({
  options: {
    quick_link: false
  }
})

export const mutations = {
  setQuickLink(state, data) {
    state.settings.quick_link = data
  },

  saveQuickLink(state) {
    Cookies.set('quickLink', state.settings.quick_link, {
      sameSite: 'None',
      secure: true
    })
  },

  getSavedQuickLink: (state) => {
    if (Cookies.get('quickLink')) {
      state.settings.quick_link = Cookies.get('quickLink') === 'true'
      return 1
    }
    Cookies.set('quickLink', state.settings.quick_link, {
      sameSite: 'None',
      secure: true
    })
    return 0
  }
}
