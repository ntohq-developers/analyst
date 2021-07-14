import Cookies from 'js-cookie'

export const state = () => ({
  options: {
    quick_link: false
  }
})

export const mutations = {
  setQuickLink(state, data) {
    state.options.quick_link = data
  },

  saveQuickLink(state) {
    Cookies.set('quickLink', state.options.quick_link, {
      sameSite: 'None',
      secure: true
    })
  },

  getSavedQuickLink: (state) => {
    // eslint-disable-next-line
    console.debug(Cookies.get('quickLink'))
    if (Cookies.get('quickLink')) {
      state.options.quick_link = Cookies.get('quickLink') === 'true'
      return 1
    }
    Cookies.set('quickLink', state.options.quick_link, {
      sameSite: 'None',
      secure: true
    })
    return 0
  }
}
