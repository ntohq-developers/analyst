export const state = () => ({
  broker: {
    link: '',
    name: ''
  },
  brokerLinks: {
    Robinhood: 'https://robinhood.com/stocks/{tiker}',
    'TD-Ameritrade':
      'https://invest.ameritrade.com/grid/p/site#r=jPage/https://research.ameritrade.com/grid/wwws/research/stocks/summary?symbol={tiker}',
    Webull: 'https://app.webull.com/trade?source=seo-google-quote',
    eTrade:
      'https://www.etrade.wallst.com/v1/stocks/snapshot/snapshot.asp?symbol={tiker}'
  },
  brokerOptions: [
    {
      val: '-',
      key: 'none'
    },
    {
      val: 'E-Trade',
      key: 'eTrade'
    },
    {
      val: 'TD Ameritrade',
      key: 'TD-Ameritrade'
    },
    {
      val: 'Robinhood',
      key: 'Robinhood'
    },
    {
      val: 'Webull',
      key: 'Webull'
    }
  ]
})

export const mutations = {
  setBroker(state, value) {
    state.broker.name = value
    state.broker.link = state.brokerLinks[state.broker.name]
  }
}

export const actions = {
  setBroker({ commit }, value) {
    commit('setBroker', value)
  },

  setBrokerLink({ commit }, value) {
    commit('setBrokerLink', value)
  }
}

export const modules = {}

export const getters = {
  getBroker(state) {
    return state.broker.name
  },

  getBrokerList(state) {
    return state.brokerLinks
  },

  getBrokerOptions(state) {
    return state.brokerOptions
  },

  getBrokerLink(state) {
    return state.broker.link
  }
}
