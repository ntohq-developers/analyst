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
    // eslint-disable-next-line
    console.debug(JSON.stringify(state.brokers.set))
  },

  getSavedBroker: (state) => {
    if (Cookies.get('broker')) {
      state.brokers.set = JSON.parse(Cookies.get('broker'))
      // eslint-disable-next-line
      console.debug(state.brokers.set)
      return 1
    }
    Cookies.set('broker', JSON.stringify(state.brokers.set), {
      sameSite: 'None',
      secure: true
    })
    // eslint-disable-next-line
    console.debug(JSON.stringify(state.brokers.set))
    return 0
  }
}
