import Cookies from 'js-cookie'

export const state = () => ({
  brokers: {
    list: [
      {
        name: 'none',
        link: ''
      },
      {
        name: 'Rohbinhood',
        link: 'https://robinhood.com/stocks/{tiker}'
      },
      {
        name: 'TD-Ameritrade',
        link:
          'https://invest.ameritrade.com/grid/p/site#r=jPage/https://research.ameritrade.com/grid/wwws/research/stocks/summary?symbol={tiker}'
      },
      {
        name: 'Webull',
        link: 'https://app.webull.com/trade?source=seo-google-quote'
      },
      {
        name: 'E-Trade',
        link:
          'https://www.etrade.wallst.com/v1/stocks/snapshot/snapshot.asp?symbol={tiker}'
      }
    ],
    set: {
      name: 'none',
      link: '',
      index: 0
    }
  },
  settings: {
    quick_link: false
  }
})

// getters
export const getters = {
  getSetBroker: (state) => {
    return state.brokers.set
  }
}

export const actions = {}

export const mutations = {
  setBroker(state, data) {
    state.brokers.set.name = data.name
    state.brokers.set.link = data.link
    state.brokers.set.index = data.index
  },

  saveBroker(state) {
    Cookies.set('broker', JSON.stringify(state.brokers.set), {
      sameSite: 'None',
      secure: true
    })
  },

  getSavedBroker: (state) => {
    if (Cookies.get('broker')) {
      state.brokers.set = JSON.parse(Cookies.get('broker'))
      return 1
    }
    Cookies.set('broker', JSON.stringify(state.brokers.set), {
      sameSite: 'None',
      secure: true
    })
    return 0
  },

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
