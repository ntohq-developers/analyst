<template>
  <section class="section">
    <div>
      <div class="tile is-ancestor">
        <div class="tile is-parent is-vertical">
          <b-field
            class="tile is-child"
            style="max-height:50px;"
            label="Ticker"
          >
            <b-input
              v-model="tickerInput"
              type="text"
              style="max-width: 200px;"
              @input="debounceInput"
            ></b-input>
          </b-field>
          <ul class="tile is-child">
            <li
              v-for="ticker in searchResults"
              :key="ticker.symbol"
              @click="
                tickerInput = ticker.symbol
                companyName = ticker.name
                fetchSearchData()
              "
            >
              <b-tooltip :label="ticker.name" position="is-right" animated>
                {{ ticker.symbol }}
              </b-tooltip>
            </li>
          </ul>
        </div>
        <div style="margin-bottom: 15px; flex: 3;">
          <TestChart
            :cc-type="chartTypes[currentStyle]"
            :chart-name="chartLabel"
            :tiker-name="tickerInput"
            :company-name="companyName"
            :labels="labels"
            :input-data="data"
          ></TestChart>
          <div>
            <b-dropdown
              v-model="currentStyle"
              :scrollable="true"
              aria-role="list"
              mobile-modal="true"
            >
              <button slot="trigger" class="button is-primary" type="button">
                <template>
                  <span>{{ currentStyle }}</span>
                </template>
                <b-icon icon="menu-down"></b-icon>
              </button>
              <b-dropdown-item
                v-for="(value, name) in chartTypes"
                :key="name"
                :value="name"
                aria-role="listitem"
              >
                <span>{{ name }}</span>
              </b-dropdown-item>
            </b-dropdown>
          </div>
        </div>
        <div class="tile is-parent">
          <div class="tile is-child is-vertical">
            <b-button
              style="margin-bottom: 2em;"
              type="is-primary"
              @click="quickLink"
              >Quick Link</b-button
            >
            <b-field label="Period">
              <b-select v-model="period">
                <option value="max">Max</option>
                <option value="10y">Ten years</option>
                <option value="5y">Five years</option>
                <option value="2y">Two years</option>
                <option value="1y">One year</option>
                <option value="6mo">Six months</option>
                <option value="3mo">Three months</option>
                <option value="1mo">One month</option>
                <option value="1wk">One week</option>
                <option value="5d">Five days</option>
                <option value="1d">One day</option>
              </b-select>
            </b-field>
            <b-field label="Interval">
              <b-select v-model="interval">
                <option value="3mo">Three months</option>
                <option value="1mo">One month</option>
                <option value="1wk">One week</option>
                <option value="5d">Five days</option>
                <option value="1d">One day</option>
                <option value="1h">One hour</option>
                <option value="30m">Thirty minutes</option>
                <option value="15m">Fifteen minutes</option>
                <option value="5m">Five minutes</option>
                <option value="2m">Two minutes</option>
                <option value="1m">One minutes</option>
              </b-select>
            </b-field>
            <b-button style="margin-top: 1em;" @click="fetchStockData"
              >Fetch Data</b-button
            >
          </div>
        </div>
      </div>
      <report>
        <aside class="section cards">
          <b-button
            style="margin-top: 2em; margin-bottom: 2em;"
            @click="fetchNewsData"
            >Fetch News</b-button
          >
          <div v-for="article in articles" :key="article.title" class="card">
            <div class="card-image">
              <figure class="image">
                <img :src="article.urlImage" />
              </figure>
            </div>
            <div class="card-content">
              <div class="media">
                <div class="media-content">
                  <p class="title is-4">{{ article.title }}</p>
                </div>
              </div>
            </div>
            <div class="card-footer">
              <a :href="article.url" class="card-footer-item">Open article</a>
            </div>
          </div>
        </aside>
      </report>
    </div>
  </section>
</template>

<script>
import TestChart from '@/components/charts/ApexChart'
import { buildRequest } from '@/util/request.js'
import { switchcaseF } from '@/util/switchcase.js'
import { errorNotificationFactory } from '@/util/notification.js'
import report from '~/components/analystReport'

const _ = require('lodash')
const unknownErrorNotification = errorNotificationFactory(
  `Unknown error! Refresh the page and try again.`
)
const serverErrorNotification = errorNotificationFactory(
  'Internal server error!'
)
const quickLinkBrokers = {
  Robinhood: 'https://robinhood.com/stocks/{tiker}',
  'TD-Ameritrade':
    'https://invest.ameritrade.com/grid/p/site#r=jPage/https://research.ameritrade.com/grid/wwws/research/stocks/summary?symbol={tiker}',
  Webull: 'https://app.webull.com/trade?source=seo-google-quote',
  eTrade:
    'https://www.etrade.wallst.com/v1/stocks/snapshot/snapshot.asp?symbol={tiker}'
}

export default {
  name: 'HomePage',
  components: {
    TestChart,
    report
  },
  data() {
    return {
      labels: [],
      data: [],
      tickerInput: '',
      chartLabel: '',
      searchResults: [],
      period: '',
      interval: '',
      articles: [],
      currentStyle: 'Line Chart',
      chartTypes: { 'Line Chart': 'line', 'Candle Stick Chart': 'candlestick' }
    }
  },
  methods: {
    debounceInput: _.debounce(function() {
      this.fetchSearchData()
    }, 500),
    async fetchStockData() {
      const query = buildRequest({
        url: `https://analyst.herokuapp.com/stockQuery/?`,
        ticker: this.tickerInput,
        period: this.period,
        interval: this.interval
      })
      const data = await this.$axios.$get(query)
      this.chartLabel = this.tickerInput
      this.labels = Object.keys(data)
      this.data = Object.values(data)
    },

    async fetchSearchData() {
      const query = buildRequest({
        url: `https://analyst.herokuapp.com/searchQuery/?`,
        ticker: this.tickerInput
      })

      try {
        this.searchResults = (await this.$axios.$get(query)).ticker_data
      } catch (error) {
        switchcaseF({
          500: serverErrorNotification
        })(unknownErrorNotification)(error.response.status)
      }
    },

    async fetchNewsData() {
      const query = buildRequest({
        url: `https://analyst.herokuapp.com/newsQuery/?`,
        ticker: this.companyName
      })

      try {
        const articles = await this.$axios.$get(query)
        this.articles = articles.articles
      } catch (error) {
        switchcaseF({
          500: serverErrorNotification
        })(unknownErrorNotification)(error.response.status)
      }
    },

    quickLink() {
      if (
        localStorage.user_broker &&
        localStorage.quick_link &&
        localStorage.quick_link === 'true'
      ) {
        let brokerUrl = quickLinkBrokers[localStorage.user_broker]
        if (brokerUrl !== undefined || brokerUrl !== null || brokerUrl !== '') {
          if (this.tickerInput !== undefined || this.tickerInput !== '') {
            brokerUrl = brokerUrl.replace('{tiker}', this.tickerInput)
            window.open(brokerUrl, '_blank')
          }
        }
      } else if (localStorage.user_broker && !localStorage.quick_link) {
        alert('Turn on quick link')
      } else if (
        (!localStorage.user_broker && !localStorage.quick_link) ||
        localStorage.user_broker
      ) {
        alert('setup')
      }
    }
  }
}
</script>

<style lang="css" scoped>
/* .cards {
  max-width: 22em;
}

.card {
  margin-top: 2em;
}

.chart {
  height: 22em;
} */
a.dropdown-item.is-active span,
.dropdown .dropdown-menu .has-link a.is-active span,
button.dropdown-item.is-active span {
  color: white;
}
</style>
