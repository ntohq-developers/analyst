<template>
  <section class="section">
    <div class="tile is-ancestor">
      <div class="tile is-parent is-vertical">
        <b-field class="tile is-child" style="max-height:50px;" label="Ticker">
          <b-input
            v-model="tickerInput"
            type="text"
            @input="fetchSearchData"
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
            <b-tooltip :label="ticker.name" position="is-left" animated>
              {{ ticker.symbol }}
            </b-tooltip>
          </li>
        </ul>
      </div>
      <points-chart
        :input-data="data"
        :labels="labels"
        :chart-name="chartLabel"
        class="chart section"
        style="max-width: 3fr;"
      ></points-chart>
      <div class="tile is-parent">
        <div class="tile is-child is-vertical">
          <b-button @click="fetchStockData">Fetch Data</b-button>
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
        </div>
      </div>
      <div class="tile cards">
        <b-button @click="fetchNewsData" style="">Fetch News</b-button>
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
      </div>
    </div>
  </section>
</template>

<script>
import PointsChart from '@/components/charts/PointsChart'
import { buildRequest } from '@/util/request.js'
import { switchcaseF } from '@/util/switchcase.js'
import { errorNotificationFactory } from '@/util/notification.js'

const unknownErrorNotification = errorNotificationFactory(
  `Unknown error! Refresh the page and try again.`
)
const serverErrorNotification = errorNotificationFactory(
  'Internal server error!'
)

export default {
  name: 'HomePage',
  components: {
    PointsChart
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
      articles: []
    }
  },
  methods: {
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
      this.data = Object.values(data).map((timestamp) => timestamp[0])
    },

    async fetchSearchData() {
      const query = buildRequest({
        url: `https://analyst.herokuapp.com/searchQuery/?`,
        ticker: this.tickerInput
      })
      
      try {
        this.searchResults = (await this.$axios.$get(query))['ticker_data']
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
    }
  }
}
</script>

<style lang="css" scoped>
.cards {
  max-width: 22em;
}

.card {
  margin-top: 2em;
}

.chart {
  height: 22em;
}
</style>
