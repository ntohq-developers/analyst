<!--
   Authors: Wesley Ford (ntohq) 
            Sergix
   Date: 03/07/2021
 -->

<template>
  <section class="section">
    <div>
      <div class="tile is-ancestor">
        <div class="tile is-parent is-vertical">
          <b-field
            class="tile is-child"
            style="max-height: 50px"
            label="Ticker"
          >
            <b-input
              v-model="tickerInput"
              type="text"
              style="max-width: 200px"
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
        <div style="margin-bottom: 15px; flex: 3">
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
                <b-icon icon="caret-down"></b-icon>
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
              style="margin-bottom: 2em"
              icon-left="link"
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
            <b-button style="margin-top: 1em" @click="fetchStockData"
              >Fetch Data</b-button
            >
          </div>
        </div>
      </div>
      <section style="margin-top: 5vh">
        <b-tabs position="is-centered">
          <b-tab-item label="Stats" icon="chart-pie">
            <h1 class="title is-6">
              <a @click="getAnalystReport"><u>Get Analysis</u></a>
            </h1>
            <div :style="{ 'margin-bottom': '75px', display: displayReport }">
              <h1 class="title has-text-centered">{{ analystReport.name }}</h1>
              <analystStats :content="report"></analystStats>
              <p><b>Sector:</b> {{ analystReport.sector }}</p>
              <p><b>Total Employees:</b> {{ analystReport.employees }}</p>
              <analystSummary :summary="analystReport.summary"></analystSummary>
            </div>
          </b-tab-item>
          <b-tab-item label="News" icon="newspaper" pack="far">
            <h1 class="title is-6"><u>Stock News</u></h1>
            <p>
              <b>Note:</b>
              <i
                >Generic news will be fetched if the chart ticker is not filled
                in.</i
              >
            </p>
            <aside class="section cards" style="padding-top: 0">
              <b-button
                style="margin-top: 2em; margin-bottom: 2em"
                icon-left="angle-right"
                pack="fas"
                @click="fetchNewsData"
                >Fetch</b-button
              >
              <section class="box tile" style="padding: 20px">
                <div style="max-height: 100vh; overflow-y: scroll">
                  <div
                    v-for="article in articles"
                    :key="article.title"
                    class="card"
                  >
                    <div class="card-image">
                      <figure class="image">
                        <img :src="article.urlImage" />
                      </figure>
                    </div>
                    <div class="card-content">
                      <div class="media">
                        <div class="media-content" style="overflow: hidden">
                          <p class="title is-4">{{ article.title }}</p>
                        </div>
                      </div>
                    </div>
                    <div class="card-footer">
                      <a :href="article.url" class="card-footer-item"
                        >Open article</a
                      >
                    </div>
                  </div>
                </div>
              </section>
            </aside>
          </b-tab-item>
          <b-tab-item label="ML" icon="project-diagram">
            <h1 class="title is-6"><u>Machine Learning Stats</u></h1>
          </b-tab-item>
        </b-tabs>
      </section>
    </div>
  </section>
</template>

<script>
import TestChart from '@/components/charts/ApexChart'
import { buildRequest } from '@/util/request.js'
import { switchcaseF } from '@/util/switchcase.js'
import { errorNotificationFactory } from '@/util/notification.js'
import analystSummary from '@/components/businessSummary'
import analystStats from '@/components/analystStats'

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
    analystSummary,
    analystStats
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
      chartTypes: { 'Line Chart': 'line', 'Candle Stick Chart': 'candlestick' },
      analystReport: {
        name: '',
        summary: '',
        employees: '',
        sector: ''
      },
      report: {},
      displayReport: 'none'
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
    },
    async getAnalystReport() {
      const query = buildRequest({
        url: `https://analyst.herokuapp.com/analyst-report/?`,
        ticker: this.tickerInput
      })

      const report = await this.$axios.$get(query)
      this.report = report
      this.analystReport.name = report.name
      this.analystReport.summary = report.BusinessSummary
      this.analystReport.employees = report.employees
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      this.analystReport.sector = report.sector
      if (this.displayReport !== '') {
        this.displayReport = ''
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

#more {
  display: none;
}

a.dropdown-item.is-active span,
.dropdown .dropdown-menu .has-link a.is-active span,
button.dropdown-item.is-active span {
  color: white;
}
</style>
